import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import User from "../models/User.js";

const router = Router();

// GET /api/cart -> { items: [...] }
router.get("/", requireAuth, async (req, res) => {
  const user = await User.findById(req.userId).lean();
  res.json({ items: user?.cart || [] });
});

// POST /api/cart  add item (ignore duplicates by placeId)
router.post("/", requireAuth, async (req, res) => {
  const { id, title, distance, fee, img } = req.body;
  if (!id || !title) return res.status(400).json({ message: "id and title required" });

  const user = await User.findById(req.userId);
  const exists = user.cart.some((c) => c.placeId === id);
  if (!exists) {
    user.cart.push({ placeId: id, title, distance, fee, img });
    await user.save();
  }
  res.json({ items: user.cart });
});

// DELETE /api/cart/:placeId
router.delete("/:placeId", requireAuth, async (req, res) => {
  const { placeId } = req.params;
  const user = await User.findById(req.userId);
  user.cart = user.cart.filter((c) => c.placeId !== placeId);
  await user.save();
  res.json({ items: user.cart });
});

// DELETE /api/cart  clear
router.delete("/", requireAuth, async (_req, res) => {
  const user = await User.findById(_req.userId);
  user.cart = [];
  await user.save();
  res.json({ items: [] });
});

export default router;
