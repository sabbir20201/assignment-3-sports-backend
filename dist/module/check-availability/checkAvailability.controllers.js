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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const booking_model_1 = require("../booking/booking.model");
const checkAvailabilityTimeSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDate = req.query.date || (0, moment_1.default)().format('YYYY-MM-DD');
        console.log("userDate =>", userDate);
        const date = (0, moment_1.default)(userDate, 'YYYY-MM-DD', true);
        if (!date.isValid()) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'provided date is invalid'
            });
        }
        // find all bookings from booking model 
        const bookings = yield booking_model_1.Booking.find({ date: date.format('YYYY-MM-DD') });
        console.log('FIND ALL BOOKING DATE', bookings);
        const availableTimeSlots = [
            { startTime: '08:00', endTime: '10:00' },
            { startTime: '10:00', endTime: '12:00' },
            { startTime: '12:00', endTime: '14:00' },
            { startTime: '14:00', endTime: '16:00' },
            { startTime: '16:00', endTime: '18:00' },
        ];
        // filter unavailable time slots 
        const unAvailableTimeSlots = bookings.map((booking) => ({
            startTime: booking.startTime,
            endTime: booking.endTime,
        }));
        // filter available time slot 
        availableTimeSlots === null || availableTimeSlots === void 0 ? void 0 : availableTimeSlots.forEach((timeSlot) => {
            for (const unavailableTimeSlot of unAvailableTimeSlots) {
                if (isTimeSlotConflict(timeSlot, unavailableTimeSlot)) {
                    const index = availableTimeSlots.indexOf(timeSlot);
                    availableTimeSlots.splice(index, 1);
                    break;
                }
            }
        });
        function isTimeSlotConflict(timeSlot1, timeSlot2) {
            const startTime1 = (0, moment_1.default)(`${date.format('YYYY-MM-DD')}T${timeSlot1.startTime}`);
            const endTime1 = (0, moment_1.default)(`${date.format('YYYY-MM-DD')}T${timeSlot1.endTime}`);
            const startTime2 = (0, moment_1.default)(`${date.format('YYYY-MM-DD')}T${timeSlot2.startTime}`);
            const endTime2 = (0, moment_1.default)(`${date.format('YYYY-MM-DD')}T${timeSlot2.endTime}`);
            const condition1 = startTime1.isBefore(endTime2) && startTime1.isSameOrAfter(startTime2);
            const condition2 = endTime1.isAfter(startTime2) && endTime1.isSameOrBefore(endTime2);
            const condition3 = startTime1.isBefore(startTime2) && endTime1.isAfter(endTime2);
            return condition1 || condition2 || condition3;
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Availability checked successfully',
            date: availableTimeSlots
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 200,
            message: 'Availability checked successfully',
            errorSource: error
        });
    }
});
exports.default = checkAvailabilityTimeSlots;
