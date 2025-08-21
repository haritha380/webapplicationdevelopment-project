import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import Booking from "../models/Booking.js";

const router = Router();

/**
 * POST /api/bookings
 * body: { id, title, distance, fee, img }
 * Records a "User Booked a Cab" event
 */
router.post("/", requireAuth, async (req, res) => {
  const { id, title, distance, fee, img } = req.body || {};
  if (!id || !title) {
    return res.status(400).json({ message: "id and title are required" });
  }

  const created = await Booking.create({
    userId: req.userId,
    type: "cab",
    placeId: id,
    title,
    distance,
    fee,
    img
  });

  return res.status(201).json({ ok: true, bookingId: created._id, message: "User Booked a Cab" });
});

/** (Optional) list my bookings */
router.get("/", requireAuth, async (req, res) => {
  const bookings = await Booking.find({ userId: req.userId }).sort({ createdAt: -1 }).lean();
  res.json({ bookings });
});

export default router;
