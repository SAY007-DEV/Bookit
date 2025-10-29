import Booking from '../Model/booking.js'

export async function createBooking(req, res, next) {
  try {
    const booking = await Booking.create(req.body)
    res.status(201).json({ data: booking })
  } catch (err) {
    next(err)
  }
}


