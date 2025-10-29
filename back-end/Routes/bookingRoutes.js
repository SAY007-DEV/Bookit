import { Router } from 'express'
import { createBooking } from '../Controller/bookingcontroller.js'

const router = Router()

router.post('/', createBooking)

export default router


