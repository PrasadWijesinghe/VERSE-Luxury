import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
  sub?: string;
};

export function authRequired(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice("Bearer ".length) : null;

  if (!token) {
    return res.status(401).json({ message: "Missing Authorization Bearer token" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: "Server misconfigured: missing JWT_SECRET" });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    const userId = decoded.sub ? String(decoded.sub) : null;
    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
