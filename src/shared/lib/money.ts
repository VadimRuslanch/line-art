/**
 * Parses mixed-format monetary strings into plain numbers.
 * Accepts inputs with non-breaking spaces and both comma/dot separators.
 */
export function parseMoney(input: unknown): number {
  if (typeof input === 'number' && Number.isFinite(input)) return input;
  if (typeof input !== 'string') return 0;

  let normalized = input
    .normalize('NFKC')
    .replace(/&nbsp;|&#160;|&#xA0;/gi, ' ')
    .replace(/[\s\u00A0\u202F]/g, '')
    .replace(/[^\d.,-]/g, '');

  if (!normalized) return 0;

  const lastComma = normalized.lastIndexOf(',');
  const lastDot = normalized.lastIndexOf('.');

  if (lastComma > -1 && lastDot > -1) {
    const decimalIsComma = lastComma > lastDot;
    const thousand = decimalIsComma ? '.' : ',';
    normalized = normalized.replace(new RegExp('\\' + thousand, 'g'), '');
    if (decimalIsComma) normalized = normalized.replace(/,/g, '.');
  } else if (lastComma > -1) {
    const digitsAfter = normalized.length - lastComma - 1;
    if (digitsAfter > 0 && digitsAfter <= 2) {
      normalized = normalized.replace(/\./g, '');
      normalized = normalized.replace(/,/g, '.');
    } else {
      normalized = normalized.replace(/,/g, '');
    }
  } else if (lastDot > -1) {
    const digitsAfter = normalized.length - lastDot - 1;
    if (digitsAfter > 0 && digitsAfter <= 2) {
      normalized = normalized.replace(/,/g, '');
    } else {
      normalized = normalized.replace(/\./g, '');
    }
  }

  normalized = normalized.replace(/(?!^)-/g, '');

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}
