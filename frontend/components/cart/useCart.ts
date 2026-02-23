"use client";

import { useMemo, useSyncExternalStore } from "react";

import {
  addToCart,
  getCartCount,
  readCart,
  removeFromCart,
  subscribeToCart,
  updateQuantity,
} from "./cartStore";

const EMPTY_SERVER_SNAPSHOT: never[] = [];

export function useCartLines() {
  return useSyncExternalStore(subscribeToCart, readCart, () => EMPTY_SERVER_SNAPSHOT);
}

export function useCartCount() {
  const lines = useCartLines();
  return useMemo(() => getCartCount(lines), [lines]);
}

export const cartActions = {
  addToCart,
  updateQuantity,
  removeFromCart,
};
