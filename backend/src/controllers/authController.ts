import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

type PublicUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

function toPublicUser(user: { _id: unknown; firstName: string; lastName: string; email: string }): PublicUser {
  return {
    id: String(user._id),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
}

function signToken(userId: string): string | null {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;

  return jwt.sign({ sub: userId }, secret, { expiresIn: "7d" });
}

export async function register(req: Request, res: Response) {
  const { firstName, lastName, email, password, confirmPassword } = req.body ?? {};

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "firstName, lastName, email, password are required" });
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const normalizedEmail = String(email).toLowerCase().trim();

  const existingUser = await User.findOne({ email: normalizedEmail }).lean();
  if (existingUser) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName: String(firstName).trim(),
    lastName: String(lastName).trim(),
    email: normalizedEmail,
    passwordHash,
  });

  const token = signToken(String(user._id));

  return res.status(201).json({
    user: toPublicUser(user),
    token,
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const normalizedEmail = String(email).toLowerCase().trim();

  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const ok = await bcrypt.compare(String(password), user.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signToken(String(user._id));

  return res.json({
    user: toPublicUser(user),
    token,
  });
}
