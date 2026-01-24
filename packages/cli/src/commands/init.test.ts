import { execa } from 'execa'
import fs from 'fs-extra'
import prompts from 'prompts'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { init } from './init'

vi.mock('fs-extra', () => ({
  default: {
    pathExists: vi.fn(),
    ensureDir: vi.fn(),
    writeFile: vi.fn(),
    readJSON: vi.fn(),
  },
}))

vi.mock('execa', () => ({
  execa: vi.fn(),
}))

vi.mock('prompts', () => ({
  default: vi.fn(),
}))

vi.mock('./fetch-artworks', () => ({
  fetchArtworks: vi.fn(),
}))

vi.mock('ora', () => ({
  default: () => ({
    start: vi.fn().mockReturnThis(),
    succeed: vi.fn(),
    fail: vi.fn(),
    warn: vi.fn(),
  }),
}))

describe('CLI Command: init', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('exit')
    }) as any)
    vi.spyOn(process, 'cwd').mockReturnValue('/mock/cwd')
  })

  it('should completely configure the project (tailwind, utils) and install core deps', async () => {
    vi.mocked(prompts).mockResolvedValue({
      componentsPath: 'src/components/ui',
      installDeps: true,
      fetchArtworks: false,
      llmTools: [],
    })
    // package.json exists but no lockfile
    vi.mocked(fs.pathExists as any).mockImplementation(
      async (pathStr: string) => pathStr === 'package.json'
    )

    await init()

    // Components dir creation
    expect(fs.ensureDir).toHaveBeenCalledWith(expect.stringContaining('src/components/ui'))
    // Global utils.ts creation
    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('utils.ts'),
      expect.any(String)
    )
    // Tailwind writing
    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.stringContaining('tailwind.config.js'),
      expect.any(String)
    )
    // Dependecy injections via execa
    expect(execa).toHaveBeenCalledWith(
      'npm',
      expect.arrayContaining(['tailwindcss', '@dsfrkit/config'])
    )
    expect(execa).toHaveBeenCalledWith('npm', expect.arrayContaining(['@dsfrkit/tokens']))
  })

  it('should detect package managers automatically based on lockfiles', async () => {
    vi.mocked(prompts).mockResolvedValue({
      componentsPath: 'src/components/ui',
      installDeps: true,
    })
    // Simulate finding package.json + pnpm-lock.yaml
    vi.mocked(fs.pathExists as any).mockImplementation(
      async (pathStr: string) => pathStr === 'package.json' || pathStr === 'pnpm-lock.yaml'
    )

    await init()
    // It should invoke 'pnpm add -D'
    expect(execa).toHaveBeenCalledWith('pnpm', expect.arrayContaining(['add', '-D', 'tailwindcss']))
  })

  it('should deploy custom AI rules intelligently based on user prompts', async () => {
    vi.mocked(prompts).mockResolvedValue({
      componentsPath: 'ui',
      installDeps: false,
      llmTools: ['cursor', 'copilot'], // Prompt user inputs
    })
    // package.json exists
    vi.mocked(fs.pathExists as any).mockImplementation(
      async (pathStr: string) => pathStr === 'package.json'
    )

    await init()
    const writes = vi.mocked(fs.writeFile).mock.calls
    const writtenFiles = writes.map((w) => w[0] as string)

    expect(writtenFiles.some((f) => f.includes('.cursorrules'))).toBe(true)
    expect(writtenFiles.some((f) => f.includes('copilot-instructions.md'))).toBe(true)
  })

  it('should correctly abort if componentsPath is omitted or cancelled', async () => {
    vi.mocked(prompts).mockResolvedValue({ componentsPath: '' })
    await expect(init()).rejects.toThrow('exit')
    expect(process.exit).toHaveBeenCalledWith(0)
    expect(fs.ensureDir).not.toHaveBeenCalled()
  })
})
