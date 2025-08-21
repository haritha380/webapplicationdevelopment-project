import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, required: true },
    type: { type: String, enum: ["cab"], required: true }, // we log cab bookings
    placeId: { type: String, required: true },
    title: { type: String, required: true },
    distance: { type: String, default: "" },
    fee: { type: String, default: "" },
    img: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
