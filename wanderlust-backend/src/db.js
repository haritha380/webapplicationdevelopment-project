// src/db.js
import mongoose from "mongoose";

export async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, {
    dbName: "wanderlust", // this must match the DB name in your URI
  });
  console.log(" MongoDB connected");
}
