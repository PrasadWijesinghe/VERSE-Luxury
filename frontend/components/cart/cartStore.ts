export type CartLine = {
  productId: number;
  quantity: number;
};

const CART_STORAGE_KEY = "verse_cart_v1";
const CART_EVENT = "verse-cart";

const EMPTY_CART: CartLine[] = [];

let cachedRaw: string | null = null;
let cachedLines: CartLine[] = EMPTY_CART;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function emitCartChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CART_EVENT));
}

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return EMPTY_CART;
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);

    if (raw === cachedRaw) return cachedLines;

    if (!raw) {
      cachedRaw = null;
      cachedLines = EMPTY_CART;
      return cachedLines;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      cachedRaw = raw;
      cachedLines = EMPTY_CART;
      return cachedLines;
    }

    const lines: CartLine[] = [];
    for (const item of parsed) {
      if (
        isRecord(item) &&
        Number.isFinite(Number(item.productId)) &&
        Number.isFinite(Number(item.quantity))
      ) {
        const productId = Number(item.productId);
        const quantity = Math.max(1, Math.min(99, Number(item.quantity)));
        lines.push({ productId, quantity });
      }
    }

    cachedRaw = raw;
    cachedLines = lines;
    return cachedLines;
  } catch {
    cachedRaw = null;
    cachedLines = EMPTY_CART;
    return cachedLines;
  }
}

function writeCart(lines: CartLine[]) {
  if (typeof window === "undefined") return;
  try {
    const raw = JSON.stringify(lines);
    window.localStorage.setItem(CART_STORAGE_KEY, raw);
    cachedRaw = raw;
    cachedLines = lines;
  } catch {
    // ignore
  }
}

export function setCart(lines: CartLine[]) {
  const cleaned = lines
    .filter((l) => Number.isFinite(l.productId) && Number.isFinite(l.quantity))
    .map((l) => ({
      productId: Number(l.productId),
      quantity: Math.max(1, Math.min(99, Number(l.quantity))),
    }));

  writeCart(cleaned);
  emitCartChange();
}

export function addToCart(productId: number, quantity: number) {
  if (!Number.isFinite(productId)) return;

  const addQty = Math.max(1, Math.min(99, Number(quantity || 1)));
  const lines = [...readCart()];
  const idx = lines.findIndex((l) => l.productId === productId);

  if (idx >= 0) {
    const nextQty = Math.max(1, Math.min(99, lines[idx].quantity + addQty));
    lines[idx] = { ...lines[idx], quantity: nextQty };
  } else {
    lines.push({ productId, quantity: addQty });
  }

  setCart(lines);
}

export function updateQuantity(productId: number, quantity: number) {
  if (!Number.isFinite(productId)) return;
  const nextQty = Math.max(0, Math.min(99, Number(quantity)));

  const lines = readCart();
  const next = lines
    .map((l) => {
      if (l.productId !== productId) return l;
      return { ...l, quantity: nextQty };
    })
    .filter((l) => l.quantity > 0);

  setCart(next);
}

export function removeFromCart(productId: number) {
  if (!Number.isFinite(productId)) return;
  const lines = readCart().filter((l) => l.productId !== productId);
  setCart(lines);
}

export function getCartCount(lines: CartLine[]) {
  return lines.reduce((sum, l) => sum + (Number.isFinite(l.quantity) ? l.quantity : 0), 0);
}

export function subscribeToCart(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const onChange = () => callback();
  window.addEventListener(CART_EVENT, onChange);
  window.addEventListener("storage", onChange);

  return () => {
    window.removeEventListener(CART_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
