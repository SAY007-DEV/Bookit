import { Router } from 'express'
import { getAllExperiences, getExperienceById } from '../Controller/experiencecontroller.js'

const router = Router()

router.get('/experiences', getAllExperiences)
router.get('/experiences/:id', getExperienceById)

export default router


