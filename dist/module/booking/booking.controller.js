"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingControllers = void 0;
const booking_service_1 = require("./booking.service");
const facility_model_1 = require("../facility/facility.model");
const user_model_1 = require("../user/user.model");
const booking_model_1 = require("./booking.model");
const catchAsync_1 = require("../../utils/catchAsync");
const bookingAFacility = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { facility, date, startTime, endTime } = req.body;
    // const validateData = createBookingSchema.parse(bookingData)
    const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    const userField = yield user_model_1.User.findOne({ email: userEmail });
    if (!userField) {
        throw new Error("user not found");
    }
    const user = userField._id.toString();
    const isFacilityExists = yield facility_model_1.Facility.findOne({ _id: facility });
    if (!isFacilityExists) {
        return res.status(404).json({
            success: false,
            message: 'Facility not found'
        });
    }
    const facilityId = isFacilityExists._id.toString();
    const pricePerHour = isFacilityExists.pricePerHour;
    const existingBookings = yield booking_model_1.Booking.find({
        facility: facilityId,
        date: date,
        $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
        ]
    });
    if (existingBookings.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'selected slot of time is not available for this facility item'
        });
    }
    // calculation if payable amount 
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    const payableAmount = durationHours * pricePerHour;
    const data = {
        facility: facilityId,
        date,
        startTime,
        endTime,
        user,
        payableAmount,
        isBooked: "confirmed",
    };
    const result = yield booking_service_1.bookingService.bookingInToDB(data);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "booking created successfully",
        data: result
    });
}));
const getAllBookings = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const AllBookings = yield booking_model_1.Booking.find({ isBooked: "confirmed" })
        .populate({
        path: 'facility',
        select: "name description pricePerHour location isDeleted"
    })
        .populate({
        path: "user",
        select: "name email phone role address"
    })
        .exec();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Bookings retrieved successfully",
        data: AllBookings
    });
}));
const getBookingByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        const userField = yield user_model_1.User.findOne({ email: userEmail });
        if (!userField) {
            return res.status(500).json({
                success: false,
                message: "user not found"
            });
        }
        const findAUserBookings = yield booking_model_1.Booking.findOne({ user: userField._id })
            .populate({
            path: 'facility',
            select: "name description pricePerHour location isDeleted"
        })
            .exec();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Bookings retrieved successfully",
            data: findAUserBookings
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "no booking found",
        });
    }
});
const cancelABooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        const userField = yield user_model_1.User.findOne({ email: userEmail });
        if (!userField) {
            return res.status(500).json({
                success: false,
                message: "user not found"
            });
        }
        const booking = yield booking_model_1.Booking.findOne({ user: userField._id })
            .populate({
            path: 'facility',
            select: "name description pricePerHour location isDeleted"
        })
            .exec();
        if (!booking) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Booking not found"
            });
        }
        booking.isBooked = "canceled";
        yield (booking === null || booking === void 0 ? void 0 : booking.save());
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Bookings canceled successfully",
            data: booking
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 200,
            message: "no booking found",
        });
    }
});
exports.BookingControllers = {
    bookingAFacility,
    getAllBookings,
    getBookingByUser,
    cancelABooking
};
