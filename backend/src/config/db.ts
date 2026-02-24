import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI ?? process.env.MONGODB_URL;
  const dbName = process.env.MONGODB_DBNAME ?? "VERSE";

  if (!uri) {
    throw new Error("Missing Mongo connection string: set MONGODB_URI (or MONGODB_URL) in .env");
  }

  try {
    mongoose.connection.once("connected", () => {
      console.log(`MongoDB connected ✅ (db: ${dbName})`);
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error ❌", err);
    });

    await mongoose.connect(uri, { dbName });
  } catch (error) {
    console.error("Failed to connect MongoDB ❌", error);
    process.exit(1);
  }
}