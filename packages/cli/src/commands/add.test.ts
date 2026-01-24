import fs from 'fs-extra'
import prompts from 'prompts'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { add } from './add'

// Mocks
vi.mock('fs-extra', () => ({
  default: {
    pathExists: vi.fn(),
    ensureDir: vi.fn(),
    writeFile: vi.fn(),
  },
}))

vi.mock('prompts', () => ({
  default: vi.fn(),
}))

vi.mock('ora', () => ({
  default: () => ({
    start: vi.fn().mockReturnThis(),
    succeed: vi.fn(),
    fail: vi.fn(),
    warn: vi.fn(),
    text: '',
  }),
}))

describe('CLI Command: add', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Silence console logs and errors for pure test runner output
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    // Prevent the CLI from exiting the whole Vitest process but throw to stop execution
    vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('exit')
    }) as any)
    vi.spyOn(process, 'cwd').mockReturnValue('/mock/cwd')
  })

  it('should interactively prompt user if no components are provided as arguments', async () => {
    vi.mocked(prompts).mockResolvedValue({ components: ['button'] })
    vi.mocked(fs.pathExists as any).mockResolvedValue(true)

    await add([])

    expect(prompts).toHaveBeenCalled()
    expect(fs.writeFile).toHaveBeenCalled()
    // It should specifically attempt to write the Button template CVA
    const writeCalls = vi.mocked(fs.writeFile).mock.calls
    expect(
      writeCalls.some(
        (call) => typeof call[1] === 'string' && call[1].includes('buttonVariants = cva(')
      )
    ).toBe(true)
  })

  it('should skip prompt and write components directly if strictly provided via arguments', async () => {
    vi.mocked(fs.pathExists as any).mockResolvedValue(true)

    await add(['alert'])

    expect(prompts).not.toHaveBeenCalled()
    expect(fs.writeFile).toHaveBeenCalled()
    // It should isolate and only write the Alert template
    const writeCalls = vi.mocked(fs.writeFile).mock.calls
    expect(
      writeCalls.some(
        (call) => typeof call[1] === 'string' && call[1].includes('alertVariants = cva(')
      )
    ).toBe(true)
  })

  it('should elegantly exit process when passing a completely invalid component name', async () => {
    await expect(add(['this-component-does-not-exist'])).rejects.toThrow('exit')

    expect(process.exit).toHaveBeenCalledWith(1)
    expect(fs.writeFile).not.toHaveBeenCalled()
  })

  it('should gracefully exit if the interactive prompt is aborted without selection', async () => {
    vi.mocked(prompts).mockResolvedValue({ components: [] })

    await expect(add([])).rejects.toThrow('exit')

    expect(process.exit).toHaveBeenCalledWith(0)
    expect(fs.writeFile).not.toHaveBeenCalled()
  })

  it('should fallback and silently create default /src/components/ui path if target directory is absolutely nowhere to be found', async () => {
    vi.mocked(fs.pathExists as any).mockResolvedValue(false)
    vi.mocked(prompts).mockResolvedValue({ components: ['badge'] })

    await add(['button'])
    expect(fs.ensureDir).toHaveBeenCalled()
    const ensureDirCalls = vi.mocked(fs.ensureDir).mock.calls
    // Verify it attempts to reconstruct the standard Next/React topology path
    expect(ensureDirCalls[0][0]).toContain('src/components/ui')
  })
})
