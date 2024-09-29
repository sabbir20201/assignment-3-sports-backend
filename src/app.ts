import express, { Request, Response } from 'express'
import { facilityRoutes } from './module/facility/facility.routes'
import { AuthRoutes } from './module/auth/auth.routes'
import { BookingRoutes } from './module/booking/booking.routes'
import { notFoundHandler } from './middleware/notFound'
import { globalErrorHandler } from './middleware/globalErrorHandling'
import { CheckBookingRoutes } from './module/check-availability/check.availability.routes'
const app = express()

app.use(express.json())

app.use("/api/facility", facilityRoutes)
app.use("/api/auth", AuthRoutes)
app.use("/api/bookings", BookingRoutes)
app.use("/api/check-availability", CheckBookingRoutes)

app.use(globalErrorHandler)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Word one')
})

app.use(notFoundHandler)



export default app