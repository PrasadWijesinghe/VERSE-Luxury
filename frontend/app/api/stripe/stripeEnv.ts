import fs from "node:fs";
import path from "node:path";

function stripQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function readEnvLocalValue(key: string): string | null {
  try {
    let dir = process.cwd();
    let envPath: string | null = null;

    for (let i = 0; i < 8; i++) {
      const direct = path.join(dir, ".env.local");
      const monorepo = path.join(dir, "frontend", ".env.local");

      if (fs.existsSync(direct)) {
        envPath = direct;
        break;
      }
      if (fs.existsSync(monorepo)) {
        envPath = monorepo;
        break;
      }

      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }

    if (!envPath) return null;

    const raw = fs.readFileSync(envPath, "utf8");
    const lines = raw.split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const eq = trimmed.indexOf("=");
      if (eq <= 0) continue;

      const k = trimmed.slice(0, eq).trim();
      if (k !== key) continue;

      const v = stripQuotes(trimmed.slice(eq + 1));
      return v.length ? v : null;
    }

    return null;
  } catch {
    return null;
  }
}

export function getStripePublishableKey(): string | null {
  const fromEnv =
    (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "").trim() ||
    (process.env.STRIPE_PUBLISHABLE_KEY || "").trim() ||
    null;

  if (fromEnv) return fromEnv;

  return (
    readEnvLocalValue("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY") ||
    readEnvLocalValue("STRIPE_PUBLISHABLE_KEY")
  );
}

export function getStripeSecretKey(): string | null {
  const fromEnv = (process.env.STRIPE_SECRET_KEY || "").trim() || null;
  if (fromEnv) return fromEnv;
  return readEnvLocalValue("STRIPE_SECRET_KEY");
}
