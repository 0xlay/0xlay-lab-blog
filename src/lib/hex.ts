/**
 * Hex markers are the quiet section numbering the brand uses everywhere: 0x00,
 * 0x01, and so on. Most are authored by hand, in post frontmatter or beside a
 * literal `<SectionLabel>`. This is for the lists that number themselves.
 *
 * Two digits minimum, so a list stays aligned as it crosses ten and the tenth
 * entry reads 0x0A rather than the 0x010 that string concatenation produces.
 */
export function toHex(index: number): string {
  return `0x${index.toString(16).toUpperCase().padStart(2, '0')}`
}
