import { Router } from "express";
// import checkAvailability from "./checkAvailability.controller";
import { auth } from "../../middleware/auth";
import checkAvailabilityTimeSlots from "./checkAvailability.controllers";
// { BookingCheckControllers } 
const router = Router();

router.get('/',auth(['user']), checkAvailabilityTimeSlots);

export const CheckBookingRoutes = router
