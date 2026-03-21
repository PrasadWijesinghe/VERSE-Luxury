import type { Request, Response } from "express";
import { Order } from "../models/Order";

type OrderItem = {
  productId: number;
  name: string;
  price: number;
  currency: string;
  quantity: number;
};

type ShippingAddress = {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isPositiveNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v) && v > 0;
}

function validateAddress(raw: unknown): ShippingAddress | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  if (!isNonEmptyString(r.fullName)) return null;
  if (!isNonEmptyString(r.line1)) return null;
  if (!isNonEmptyString(r.city)) return null;
  if (!isNonEmptyString(r.postalCode)) return null;
  if (!isNonEmptyString(r.country)) return null;

  const addr: ShippingAddress = {
    fullName: (r.fullName as string).trim(),
    line1: (r.line1 as string).trim(),
    city: (r.city as string).trim(),
    postalCode: (r.postalCode as string).trim(),
    country: (r.country as string).trim(),
  };
  if (isNonEmptyString(r.line2)) addr.line2 = (r.line2 as string).trim();
  if (isNonEmptyString(r.state)) addr.state = (r.state as string).trim();
  if (isNonEmptyString(r.phone)) addr.phone = (r.phone as string).trim();

  return addr;
}

function validateItems(raw: unknown): OrderItem[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const items: OrderItem[] = [];
  for (const it of raw) {
    if (!it || typeof it !== "object") return null;
    const r = it as Record<string, unknown>;

    if (!isPositiveNumber(r.productId) && !Number.isFinite(Number(r.productId))) return null;
    if (!isNonEmptyString(r.name)) return null;
    if (!isPositiveNumber(Number(r.price))) return null;
    if (!isNonEmptyString(r.currency)) return null;
    if (!isPositiveNumber(Number(r.quantity))) return null;

    items.push({
      productId: Number(r.productId),
      name: (r.name as string).trim(),
      price: Number(r.price),
      currency: (r.currency as string).trim(),
      quantity: Math.round(Number(r.quantity)),
    });
  }

  return items;
}

export async function placeOrder(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const body = req.body as Record<string, unknown> | undefined;

  const items = validateItems(body?.items);
  if (!items) {
    return res.status(400).json({ message: "Invalid or empty items" });
  }
  const firstItem = items[0];
  if (!firstItem) {
    return res.status(400).json({ message: "Invalid or empty items" });
  }

  const shippingAddress = validateAddress(body?.shippingAddress);
  if (!shippingAddress) {
    return res.status(400).json({ message: "Invalid shipping address — fullName, line1, city, postalCode, country are required" });
  }

  const currency = firstItem.currency;
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const order = await Order.create({
    userId,
    items,
    shippingAddress,
    total,
    currency,
    status: "confirmed",
  });

  return res.status(201).json({ order });
}

export async function getMyOrders(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();

  return res.json({ orders });
}
