import mongoose from "mongoose";
import { env } from "./env.js";

let connectionPromise: Promise<typeof mongoose> | null = null;

export async function connectDatabase() {
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(env.MONGO_URI, {
      autoIndex: env.NODE_ENV !== "production",
    });
  }

  return connectionPromise;
}

export async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  connectionPromise = null;
}
