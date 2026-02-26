import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler, notFound } from "./middleware/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "VERSE API running 🚀" });
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