import { Request, Response } from "express";
import moment from "moment";
import { Booking } from "../booking/booking.model";
import { TBooking } from "../booking/booking.interface";

interface TTimeSlot {
    startTime: string;
    endTime: string;
}
const checkAvailabilityTimeSlots = async (req: Request, res: Response) => {
    try {
        const userDate = req.query.date as string || moment().format('YYYY-MM-DD');
        console.log("userDate =>", userDate);
        const date = moment(userDate, 'YYYY-MM-DD', true)
        if (!date.isValid()) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: 'provided date is invalid'
            })
        }
        // find all bookings from booking model 
        const bookings: TBooking[] = await Booking.find({ date: date.format('YYYY-MM-DD') })
        console.log('FIND ALL BOOKING DATE', bookings);
        const availableTimeSlots: { startTime: string; endTime: string }[] = [
            { startTime: '08:00', endTime: '10:00' },
            { startTime: '10:00', endTime: '12:00' },
            { startTime: '12:00', endTime: '14:00' },
            { startTime: '14:00', endTime: '16:00' },
            { startTime: '16:00', endTime: '18:00' },
        ]
        // filter unavailable time slots 
        const unAvailableTimeSlots = bookings.map((booking: TBooking) => ({
            startTime: booking.startTime,
            endTime: booking.endTime,
        }))
        // filter available time slot 
        availableTimeSlots?.forEach((timeSlot:  { startTime: string; endTime: string }) => {
            for (const unavailableTimeSlot of unAvailableTimeSlots) {
                if (isTimeSlotConflict(timeSlot, unavailableTimeSlot)) {
                    const index = availableTimeSlots.indexOf(timeSlot);
                    availableTimeSlots.splice(index, 1)
                    break;
                }
            }
        })

        function isTimeSlotConflict(timeSlot1:TTimeSlot, timeSlot2:  TTimeSlot) {
            const startTime1 = moment(`${date.format('YYYY-MM-DD')}T${timeSlot1.startTime}`);
            const endTime1 = moment(`${date.format('YYYY-MM-DD')}T${timeSlot1.endTime}`);
            const startTime2 = moment(`${date.format('YYYY-MM-DD')}T${timeSlot2.startTime}`);
            const endTime2 = moment(`${date.format('YYYY-MM-DD')}T${timeSlot2.endTime}`);

            const condition1 = startTime1.isBefore(endTime2) && startTime1.isSameOrAfter(startTime2);
            const condition2 = endTime1.isAfter(startTime2) && endTime1.isSameOrBefore(endTime2);
            const condition3 = startTime1.isBefore(startTime2) && endTime1.isAfter(endTime2);

            return condition1 || condition2 || condition3
        }
    
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Availability checked successfully',
            date: availableTimeSlots
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 200,
            message: 'Availability checked successfully',
            errorSource: error

        })
    }



}
export default checkAvailabilityTimeSlots