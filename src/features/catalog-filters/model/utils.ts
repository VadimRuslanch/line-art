import type { GetPriceExtremesQuery } from '@/shared/api/gql/graphql';

type MinNodes =
  | NonNullable<GetPriceExtremesQuery['min']>['nodes']
  | null
  | undefined;

type MaxNodes =
  | NonNullable<GetPriceExtremesQuery['max']>['nodes']
  | null
  | undefined;

type AnyMinNode = NonNullable<NonNullable<MinNodes>>[number];
type AnyMaxNode = NonNullable<NonNullable<MaxNodes>>[number];

const hasPrice = (
  n: AnyMinNode | AnyMaxNode | null | undefined,
): n is Extract<
  AnyMinNode | AnyMaxNode,
  { __typename: 'SimpleProduct' | 'VariableProduct' }
> =>
  !!n &&
  (n.__typename === 'SimpleProduct' || n.__typename === 'VariableProduct');

export const pickExtremes = (minNodes?: MinNodes, maxNodes?: MaxNodes) => {
  const minNode = minNodes?.[0];
  const maxNode = maxNodes?.[0];

  const minRaw = hasPrice(minNode) ? (minNode.price ?? 0) : 0;
  const maxRaw = hasPrice(maxNode) ? (maxNode.price ?? 0) : 0;

  const min = parseMoney(minRaw);
  const max = parseMoney(maxRaw);
  return { min, max };
};

export function parseMoney(input: unknown): number {
  if (typeof input === 'number' && Number.isFinite(input)) return input;
  if (typeof input !== 'string') return 0;

  let s = input
    .normalize('NFKC')
    .replace(/&nbsp;|&#160;|&#xA0;/gi, ' ')
    // все виды пробелов/узких неразрывных пробелов
    .replace(/[\s\u00A0\u202F]/g, '')
    // оставляем только цифры, знаки разделителей и минус
    .replace(/[^\d.,-]/g, '');

  // если осталась только пустота — 0
  if (!s) return 0;

  const lastComma = s.lastIndexOf(',');
  const lastDot = s.lastIndexOf('.');

  if (lastComma > -1 && lastDot > -1) {
    // Есть и точка, и запятая — последний разделитель считаем десятичным
    const decIsComma = lastComma > lastDot;
    const thousand = decIsComma ? '.' : ',';
    s = s.replace(new RegExp('\\' + thousand, 'g'), ''); // убрать тысячные
    if (decIsComma) s = s.replace(/,/g, '.'); // заменить десятичный на точку
  } else if (lastComma > -1) {
    // Только запятая
    const digitsAfter = s.length - lastComma - 1;
    if (digitsAfter > 0 && digitsAfter <= 2) {
      // вероятно десятичная часть
      s = s.replace(/\./g, '');
      s = s.replace(/,/g, '.');
    } else {
      // запятые как тысячные
      s = s.replace(/,/g, '');
    }
  } else if (lastDot > -1) {
    // Только точка
    const digitsAfter = s.length - lastDot - 1;
    if (digitsAfter > 0 && digitsAfter <= 2) {
      // десятичная
      s = s.replace(/,/g, '');
    } else {
      // тысячные
      s = s.replace(/\./g, '');
    }
  }

  s = s.replace(/(?!^)-/g, '');

  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}
