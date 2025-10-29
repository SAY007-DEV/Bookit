import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema(
  {
    experienceId: { type: String, required: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    qty: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true },
    taxes: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    promoCode: { type: String },
    refId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
)

export default mongoose.model('Booking', BookingSchema)


