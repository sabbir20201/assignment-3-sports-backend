import express, { Request, Response } from 'express'
import { facilityRoutes } from './module/facility/facility.routes'
import mongoose from 'mongoose'
import config from './config'
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

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello Word one')
// })
app.get('/', (req:Request , res: Response) => {
  res.send('Hello World')
});
app.use(notFoundHandler)

async function main() {
  try {
    if (!config.db_url) {
 

      throw new Error("database is url is missing")
      
    }
    await mongoose.connect(config.db_url as string);
    // console.log('connecting to database', config.db_url);

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error);
  }
}

main();

export default app