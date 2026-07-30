import { toHex } from '@/lib/hex'

describe('toHex', () => {
  it('pads to two digits', () => {
    expect(toHex(0)).toBe('0x00')
    expect(toHex(3)).toBe('0x03')
  })

  // The bug this replaced: `0x0${index + 1}` produced 0x010 for the tenth
  // entry, which reads as sixteen.
  it('crosses ten without gaining a digit', () => {
    expect(toHex(9)).toBe('0x09')
    expect(toHex(10)).toBe('0x0A')
    expect(toHex(15)).toBe('0x0F')
  })

  it('keeps letters uppercase, matching the authored markers in frontmatter', () => {
    expect(toHex(11)).toBe('0x0B')
  })

  it('grows past two digits rather than truncating', () => {
    expect(toHex(255)).toBe('0xFF')
    expect(toHex(256)).toBe('0x100')
  })
})
