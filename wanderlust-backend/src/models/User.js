// src/models/User.js
import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    placeId: { type: String, required: true }, // e.g., "port-city"
    title: { type: String, required: true },
    distance: { type: String, default: "" },
    fee: { type: String, default: "" },
    img: { type: String, default: "" }
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email:    { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    // profile fields
    age: { type: String, default: "" },
    location: { type: String, default: "Colombo, Sri Lanka" },
    language: { type: String, default: "English" },
    photo: { type: String, default: "" }, // data URL or http link

    // cart
    cart: { type: [CartItemSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
