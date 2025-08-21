import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

const router = Router();

router.get("/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.userId).lean();
  if (!user) return res.status(404).json({ message: "User not found" });
  const { _id, fullName, email, age, location, language, photo, cart } = user;
  res.json({ id: _id, fullName, email, age, location, language, photo, cart });
});

router.put("/me", requireAuth, async (req, res) => {
  const allowed = ["fullName", "age", "email", "location", "language", "photo"];
  const patch = {};
  for (const k of allowed) if (k in req.body) patch[k] = req.body[k];

  const user = await User.findByIdAndUpdate(req.userId, patch, { new: true }).lean();
  res.json({
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    age: user.age,
    location: user.location,
    language: user.language,
    photo: user.photo,
    cart: user.cart
  });
});

router.delete("/me", requireAuth, async (req, res) => {
  await Booking.deleteMany({ userId: req.userId });
  await User.findByIdAndDelete(req.userId);
  res.json({ ok: true });
});

export default router;
