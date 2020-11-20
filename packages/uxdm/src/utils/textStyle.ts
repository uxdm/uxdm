/**
 * @internal
 */
export const SYSTEM_FONTS = [
  /* * Apple * */
  '-apple-system',
  'system-ui',
  'BlinkMacSystemFont',
  /* * Microsoft * */
  'Segoe UI',
  /* * Android * */
  'Roboto',
];

/**
 *  输入: -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif
 *  输出: PingFang SC
 *  @internal
 */
export function getFirstFont(fonts: string, skipSystemFonts?: boolean) {
  let regularFont: string | null = null;
  let systemFont: string | null = null;

  fonts.split(',').forEach((font) => {
    font = font.trim().replace(/^["']+|["']+$/g, '');
    if (font === '') {
      return;
    }

    // See above for a note on OS-specific fonts
    if (!regularFont && (!skipSystemFonts || SYSTEM_FONTS.indexOf(font) < 0)) {
      regularFont = font;
    }
    if (!systemFont) {
      systemFont = font;
    }
  });

  if (regularFont) {
    return regularFont;
  }

  if (systemFont) {
    return systemFont;
  }

  return '-apple-system';
}
