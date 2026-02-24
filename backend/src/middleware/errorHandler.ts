import type { NextFunction, Request, Response } from "express";

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: "Not Found" });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const message = err instanceof Error ? err.message : "Internal Server Error";
  const statusCode = res.statusCode >= 400 ? res.statusCode : 500;

  res.status(statusCode).json({ message });
}
