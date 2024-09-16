import express from "express"
import { authController } from "./auth.controller";
import { verifyToken } from "../../middleware/varifyToken";
import { userValidationByZod } from "../user/user.validation";


const router = express.Router();

router.post("/signup",authController.register);
router.post("/login", authController.login)


export const AuthRoutes = router