'use client';

import { useGetHomeCatalog } from '@/entities/category/model/useGetHomeCatalog';

export default function InitLoad() {
  useGetHomeCatalog();
  return null;
}
