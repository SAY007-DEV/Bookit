import { Router } from 'express'
import { validatePromo } from '../Controller/promocontoller.js'

const router = Router()

router.post('/validate', validatePromo)

export default router


