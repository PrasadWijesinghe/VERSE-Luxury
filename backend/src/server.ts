import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import client from "prom-client";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";
import { errorHandler, notFound } from "./middleware/errorHandler";

dotenv.config();

const app = express();

client.collectDefaultMetrics();

app.use(cors());
app.use(express.json());

app.get("/metrics", async (_req: Request, res: Response) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "VERSE API running 🚀" });
});

// Health check route (for CI / monitoring)
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(notFound);
app.use(errorHandler);

const portFromEnv = Number(process.env.PORT);
const PORT = Number.isFinite(portFromEnv) ? portFromEnv : 5000;

async function start() {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

start().catch((error) => {
  console.error("Failed to start server ❌", error);
  process.exit(1);
});
