import type { Request, Response } from "express";
import { User } from "../models/User";

type AddressPayload = {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone?: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeAddress(raw: unknown): AddressPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  const fullName = r.fullName;
  const line1 = r.line1;
  const line2 = r.line2;
  const city = r.city;
  const state = r.state;
  const postalCode = r.postalCode;
  const country = r.country;
  const phone = r.phone;

  if (!isNonEmptyString(fullName)) return null;
  if (!isNonEmptyString(line1)) return null;
  if (!isNonEmptyString(city)) return null;
  if (!isNonEmptyString(postalCode)) return null;
  if (!isNonEmptyString(country)) return null;

  const address: AddressPayload = {
    fullName: fullName.trim(),
    line1: line1.trim(),
    city: city.trim(),
    postalCode: postalCode.trim(),
    country: country.trim(),
  };

  if (isNonEmptyString(line2)) address.line2 = line2.trim();
  if (isNonEmptyString(state)) address.state = state.trim();
  if (isNonEmptyString(phone)) address.phone = phone.trim();

  return address;
}

export async function getMyAddress(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const user = await User.findById(userId).lean();
  if (!user) return res.status(404).json({ message: "User not found" });

  return res.json({ address: user.address ?? null });
}

export async function upsertMyAddress(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const address = normalizeAddress((req.body as Record<string, unknown> | undefined)?.address);
  if (!address) {
    return res.status(400).json({ message: "Invalid address" });
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: { address } },
    { new: true }
  ).lean();

  if (!user) return res.status(404).json({ message: "User not found" });

  return res.json({ address: user.address ?? null });
}
