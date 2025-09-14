import mongoose from "mongoose";

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "mongodb",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Mongoose connection error:", error);
    process.exit(1);
  }
}
