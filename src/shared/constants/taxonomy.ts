// shared/constants/taxonomy.ts
export const ATTR_KEYS = [
  'backlights',
  'color',
  'glubina',
  'shadowGap',
  'width',
] as const;
export type AttrKey = (typeof ATTR_KEYS)[number];

export const TAXONOMY_BY_KEY = {
  categories: 'PRODUCT_CAT',
  backlights: 'PA_BACKLIGHTS',
  color: 'PA_COLOR',
  glubina: 'PA_GLUBINA',
  shadowGap: 'PA_SHADOW_GAP',
  width: 'PA_WIDTH',
} as const;
