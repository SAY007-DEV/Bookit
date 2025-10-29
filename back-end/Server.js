import express from 'express'
import cors from "cors"
import dotenv from "dotenv"
import experienceRoutes from './Routes/experienceRoutes.js'

dotenv.config();
const port=8000

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', experienceRoutes)

app.listen(port,()=>{
    console.log("server is running");
    })