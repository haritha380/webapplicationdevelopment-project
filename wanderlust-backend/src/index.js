import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectDB } from "./db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import bookingRoutes from "./routes/bookings.routes.js"; // <-- add
import discrictRotuer from "./routes/district.routes.js"; // <-- add
import placesRouter from "./routes/place.routes.js"

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors()
);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);          // /api/me
app.use("/api/cart", cartRoutes);
app.use("/api/bookings", bookingRoutes); // <-- add
app.use("/api/districts", discrictRotuer)
app.use("/api/places", placesRouter)

const port = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => console.log(` API running on http://localhost:${port}`));
  })
  .catch((e) => {
    console.error("DB connection failed:", e);
    process.exit(1);
  });
