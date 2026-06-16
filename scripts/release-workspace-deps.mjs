#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const dependencyFields = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
]

const mode = process.argv[2]

if (!['restore', 'resolve'].includes(mode)) {
  console.error('Usage: node scripts/release-workspace-deps.mjs <restore|resolve>')
  process.exit(1)
}

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const workspaceFile = join(rootDir, 'pnpm-workspace.yaml')
const cacheFile = join(rootDir, 'node_modules', '.cache', 'dsfrkit-release-workspace-deps.json')

const readJson = (filePath) => JSON.parse(readFileSync(filePath, 'utf8'))

const writeJson = (filePath, value) => {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

const getWorkspacePatterns = () => {
  const lines = readFileSync(workspaceFile, 'utf8').split('\n')
  const patterns = []
  let inPackages = false

  for (const line of lines) {
    if (/^packages:\s*$/.test(line)) {
      inPackages = true
      continue
    }

    if (inPackages && /^\S/.test(line)) {
      break
    }

    const match = inPackages ? line.match(/^\s+-\s+(.+)\s*$/) : null
    if (match) {
      patterns.push(match[1].replace(/^['"]|['"]$/g, ''))
    }
  }

  return patterns
}

const expandWorkspacePattern = (pattern) => {
  if (!pattern.endsWith('/*')) {
    const manifestPath = join(rootDir, pattern, 'package.json')
    return existsSync(manifestPath) ? [manifestPath] : []
  }

  const baseDir = join(rootDir, pattern.slice(0, -2))
  if (!existsSync(baseDir)) return []

  return readdirSync(baseDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join(baseDir, entry.name, 'package.json'))
    .filter((manifestPath) => existsSync(manifestPath))
}

const getWorkspaceManifestPaths = () =>
  [...new Set(getWorkspacePatterns().flatMap(expandWorkspacePattern))].sort()

const manifestPaths = getWorkspaceManifestPaths()
const manifests = manifestPaths.map((path) => ({ path, data: readJson(path) }))
const localPackages = new Map(
  manifests
    .filter(({ data }) => typeof data.name === 'string' && typeof data.version === 'string')
    .map(({ data }) => [data.name, data])
)

const loadSnapshot = () => {
  if (!existsSync(cacheFile)) return {}
  return readJson(cacheFile)
}

const saveSnapshot = (snapshot) => {
  mkdirSync(dirname(cacheFile), { recursive: true })
  writeJson(cacheFile, snapshot)
}

const dependencyKey = (manifestPath, field, packageName) =>
  `${relative(rootDir, manifestPath)}#${field}#${packageName}`

const resolveWorkspaceRange = (range, version) => {
  const requestedRange = range.slice('workspace:'.length)

  if (!requestedRange || requestedRange === '*') return version
  if (requestedRange === '^' || requestedRange === '~') return `${requestedRange}${version}`

  return requestedRange
}

const snapshot = loadSnapshot()
const changedFiles = new Set()

for (const { path: manifestPath, data: manifest } of manifests) {
  let changed = false

  for (const field of dependencyFields) {
    const dependencies = manifest[field]
    if (!dependencies) continue

    for (const [packageName, currentRange] of Object.entries(dependencies)) {
      if (packageName === manifest.name || !localPackages.has(packageName)) continue
      if (typeof currentRange !== 'string') continue

      const key = dependencyKey(manifestPath, field, packageName)

      if (mode === 'restore') {
        if (!currentRange.startsWith('workspace:')) {
          snapshot[key] = currentRange
          dependencies[packageName] = 'workspace:*'
          changed = true
        }
        continue
      }

      if (currentRange.startsWith('workspace:')) {
        dependencies[packageName] =
          snapshot[key] ?? resolveWorkspaceRange(currentRange, localPackages.get(packageName).version)
        changed = true
      }
    }
  }

  if (changed) {
    writeJson(manifestPath, manifest)
    changedFiles.add(relative(rootDir, manifestPath))
  }
}

if (mode === 'restore') {
  saveSnapshot(snapshot)
}

const action = mode === 'restore' ? 'Restored workspace ranges in' : 'Resolved workspace ranges in'
console.log(
  changedFiles.size > 0
    ? `${action} ${changedFiles.size} package manifest(s): ${[...changedFiles].join(', ')}`
    : `${action} 0 package manifests`
)
