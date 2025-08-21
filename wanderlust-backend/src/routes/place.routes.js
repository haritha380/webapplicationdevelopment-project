// src/routes/place.routes.js
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import Place from "../models/Place.js"; // Define this model
import District from "../models/District.js";

const router = Router();

// Create a place
router.post("/", requireAuth, async (req, res) => {
  const { district, name, description, image,distance, price } = req.body;
  const place = new Place({ district, name, description, image, distance, price });
  await place.save();
  await District.findByIdAndUpdate(district, {$push: {places: place._id}})
  res.status(201).json(place);
});

router.get("/:discrictId", async (req, res) => {
    const discrictId = req.params.discrictId;
    const places = await Place.find({ district: discrictId })
    res.status(200).json(places)
})

// Get all places
router.get("/", async (req, res) => {
  const places = await Place.find();
  res.status(200).json(places);
});

router.patch("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const place = await Place.findByIdAndUpdate(id, updates, { new: true });
  if (!place) {
    return res.status(404).json({ error: "Place not found" });
  }
  res.status(200).json(place);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const place = await Place.findByIdAndDelete(id);
  if (!place) {
    return res.status(404).json({ error: "Place not found" });
  }
  res.status(200).json({ message: "Place deleted successfully" });
});

export default router;
