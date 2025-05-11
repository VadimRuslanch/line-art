'use client';
import { useCart } from '@/app/features/cart/hooks/useCart';

export default function CartInitializer() {
  useCart();
  return null;
}
