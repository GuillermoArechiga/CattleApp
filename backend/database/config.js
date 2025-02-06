import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URI;

async function connectDB() {
  try {
    await mongoose.connect(uri, { dbName: "koa" });

    console.log("✅ Connected to MongoDB!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
}

export { connectDB };
