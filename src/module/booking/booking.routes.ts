import express, { Router } from "express"
import { BookingControllers } from "./booking.controller"
import { verifyToken } from "../../middleware/varifyToken"

const router = express.Router()

router.post("/", verifyToken,BookingControllers.bookingAFacility)
router.get("/", BookingControllers.bookingAFacility)

export const BookingRoutes = router