'use client';
import { useCart } from '@/entities/cart/model/useCart';

export default function CartInitializer() {
  useCart();
  return null;
}
