// src/routes/district.routes.js
import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import District from "../models/District.js"; // Define this model
import Place from "../models/Place.js";

const router = Router();

// Create a district
router.post("/", requireAuth, async (req, res) => {
  const { name, description, image } = req.body;
  const district = new District({ name,  description, image });
  await district.save();
  res.status(201).json(district);
});

// Get all districts
router.get("/", requireAuth, async (req, res) => {
  const districts = await District.find().populate("places").lean();
  res.json(districts);
});

router.get("/:districtId", async (req, res) => {
  const { districtId } = req.params;
  const district = await District.findById(districtId);
  res.json(district);
});

// Update a district
router.patch("/:districtId", requireAuth, async (req, res) => {
  const { districtId } = req.params;
  const updates = req.body;
  const district = await District.findByIdAndUpdate(districtId, updates, { new: true });
  res.json(district);
});

// Delete a district
router.delete("/:districtId", requireAuth, async (req, res) => {
  const { districtId } = req.params;
  console.log("delete")
  await Place.deleteMany({district: districtId});
  await District.findByIdAndDelete(districtId);
  res.status(204).send();
});

export default router;
