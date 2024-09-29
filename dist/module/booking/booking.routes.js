"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)(["user"]), booking_controller_1.BookingControllers.bookingAFacility);
router.get("/", (0, auth_1.auth)(["admin"]), booking_controller_1.BookingControllers.getAllBookings);
router.get("/user", (0, auth_1.auth)(["user"]), booking_controller_1.BookingControllers.getBookingByUser);
router.delete("/:id", (0, auth_1.auth)(["user"]), booking_controller_1.BookingControllers.cancelABooking);
exports.BookingRoutes = router;
