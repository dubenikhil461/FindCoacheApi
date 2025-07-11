import express from 'express'
const router = express.Router()

import User from '../controller/User.js'; router.use('/user',User)  

export default router;