import { Router } from "express";
import checkAvailabilityTimeSlots from "./checkAvailability.controllers";

const router = Router();

router.get('/', checkAvailabilityTimeSlots);

export const CheckBookingRoutes = router
