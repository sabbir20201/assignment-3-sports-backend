import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { Facility } from "../facility/facility.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { catchAsync } from "../../utils/catchAsync";

const bookingAFacility = catchAsync(async (req: Request, res: Response) => {

    const { facility, date, startTime, endTime } = req.body;
    // const validateData = createBookingSchema.parse(bookingData)
    const userEmail = (req as any).user?.email;
    const userField = await User.findOne({ email: userEmail })
    if (!userField) {
        throw new Error("user not found")

    }
    const user = (userField as any)._id.toString()
    const isFacilityExists = await Facility.findOne({ _id: facility });
    


    if (!isFacilityExists) {
        return res.status(404).json({
            success: false,
            message: 'Facility not found'
        });
    }

    const facilityId = (isFacilityExists as any)._id.toString();
    const pricePerHour = isFacilityExists.pricePerHour;

    const existingBookings = await Booking.find({
        facility: facilityId,
        date: date,
        $or: [
            { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
        ]
    })

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
    const payableAmount = durationHours * pricePerHour


    const data: TBooking = {
        facility: facilityId,
        date,
        startTime,
        endTime,
        user,
        payableAmount,
        isBooked: "confirmed",
    }

    const result = await bookingService.bookingInToDB(data);
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "booking created successfully",
        data: result
    })

})

const getAllBookings = catchAsync(async (req: Request, res: Response) => {

    const AllBookings = await Booking.find({ isBooked: "confirmed" })
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
    })

})

const getBookingByUser = async (req: Request, res: Response) => {
    try {
        const userEmail = (req as any).user?.email;
        const userField = await User.findOne({ email: userEmail })
        if (!userField) {
            return res.status(500).json({
                success: false,
                message: "user not found"
            })
        }

        const findAUserBookings = await Booking.findOne({ user: userField._id })
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
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "no booking found",
        })
    }
}


const cancelABooking = async (req: Request, res: Response) => {
    try {
        const userEmail = (req as any).user?.email;
        const userField = await User.findOne({ email: userEmail })
        if (!userField) {
            return res.status(500).json({
                success: false,
                message: "user not found"
            })
        }

        const booking = await Booking.findOne({ user: userField._id })
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
            })
        }
        booking.isBooked = "canceled"
        await booking?.save()

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Bookings canceled successfully",
            data: booking
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 200,
            message: "no booking found",
        })
    }
}
export const BookingControllers = {
    bookingAFacility,
    getAllBookings,
    getBookingByUser,
    cancelABooking
}
