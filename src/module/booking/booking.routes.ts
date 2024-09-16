import express, { Router } from "express"
import { BookingControllers } from "./booking.controller"
import { verifyToken } from "../../middleware/varifyToken"
import { verifyAdmin } from "../../middleware/verifyAdmin"
import { verifyUser } from "../../middleware/verifyUser"

const router = express.Router()

router.post("/", verifyToken,BookingControllers.bookingAFacility)
router.get("/", verifyToken, verifyAdmin,BookingControllers.getAllBookings)
router.get("/user", verifyToken, verifyUser,BookingControllers.getBookingByUser)

export const BookingRoutes = router