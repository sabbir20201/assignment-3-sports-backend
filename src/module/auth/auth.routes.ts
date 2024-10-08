import express from "express"
import { authController } from "./auth.controller";

const router = express.Router();

router.post("/signup",authController.register);
router.post("/login", authController.login)


export const AuthRoutes = router