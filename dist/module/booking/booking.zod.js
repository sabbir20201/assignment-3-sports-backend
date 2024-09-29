"use strict";
// src/validations/booking.validation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookingSchemaFile = exports.createBookingSchema = void 0;
const zod_1 = require("zod");
exports.createBookingSchema = zod_1.z.object({
    facility: zod_1.z.string().length(24, "Invalid facility ID"), // MongoDB ObjectId validation
    date: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    startTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, 'Start time must be in HH:mm format'),
    endTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, 'End time must be in HH:mm format'),
    payableAmount: zod_1.z.number().min(0, 'Payable amount must be greater than or equal to 0'),
});
exports.createBookingSchemaFile = {
    createBookingSchema: exports.createBookingSchema
};
