// src/models/Place.js
import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema(
  {
    district: { type: mongoose.Schema.Types.ObjectId, ref: "District", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: {type: String, required: true},
    price: {type: String, required: true},
    distance: {type: String, required: true}
  },
  { timestamps: true }
);

export default mongoose.model("Place", PlaceSchema);
