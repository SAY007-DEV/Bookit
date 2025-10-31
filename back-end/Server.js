import express from 'express'
import cors from "cors"
import dotenv from "dotenv"
import experienceRoutes from './Routes/experienceRoutes.js'
import bookingRoutes from './Routes/bookingRoutes.js'
import promoRoutes from './Routes/promoRoutes.js'


import { notFound, errorHandler } from './Middleware/errorhandle.js'
import connectDB from './Config/dbconnect.js'

dotenv.config();
const port=8000

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', experienceRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/promo', promoRoutes)


app.use(notFound)
app.use(errorHandler)



app.listen(port,()=>{
  console.log('server is running')
})

connectDB()