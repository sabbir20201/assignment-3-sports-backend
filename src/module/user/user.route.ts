import express from 'express'
import { UserController } from './user.controller'
const router = express.Router()

router.post("/signup", UserController.signUp)
router.post("/login", UserController.login)

export const UserRouter = router