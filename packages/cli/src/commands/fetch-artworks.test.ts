import { execa } from 'execa'
import fs from 'fs-extra'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchArtworks } from './fetch-artworks'

vi.mock('fs-extra', () => ({
  default: {
    pathExists: vi.fn(),
    ensureDir: vi.fn(),
    copy: vi.fn().mockResolvedValue(undefined),
    remove: vi.fn().mockResolvedValue(undefined),
  },
}))

vi.mock('execa', () => ({
  execa: vi.fn(),
}))

vi.mock('ora', () => ({
  default: () => ({
    start: vi.fn().mockReturnThis(),
    succeed: vi.fn(),
    fail: vi.fn(),
    warn: vi.fn(),
  }),
}))

describe('CLI Command: fetch-artworks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  it('should completely simulate sparse cloning of the official DSFR repository and copy artworks', async () => {
    vi.mocked(fs.pathExists as any).mockResolvedValue(false)

    await fetchArtworks()

    // Ensure public dir was created since it didn't exist
    expect(fs.ensureDir).toHaveBeenCalled()
    // 2 git commands: clone and sparse-checkout set
    expect(execa).toHaveBeenCalledTimes(2)
    // Confirm the clone targeted the right repo
    expect(vi.mocked(execa).mock.calls[0][1]).toContain(
      'https://github.com/GouvernementFR/dsfr.git'
    )
    // Ensure files were supposedly copied
    expect(fs.copy).toHaveBeenCalled()
    // Cleanup must be called
    expect(fs.remove).toHaveBeenCalled()
  })

  it('should aggressively catch errors and fail the spinner if git or fs throw', async () => {
    vi.mocked(execa).mockRejectedValue(new Error('Git network failure'))

    await expect(fetchArtworks()).rejects.toThrow('Git network failure')
    expect(fs.copy).not.toHaveBeenCalled()
    // Cleanup must still run even on failure
    expect(fs.remove).toHaveBeenCalled()
  })
})
