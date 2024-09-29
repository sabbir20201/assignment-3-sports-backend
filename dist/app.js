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
const express_1 = __importDefault(require("express"));
const facility_routes_1 = require("./module/facility/facility.routes");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const auth_routes_1 = require("./module/auth/auth.routes");
const booking_routes_1 = require("./module/booking/booking.routes");
const notFound_1 = require("./middleware/notFound");
const globalErrorHandling_1 = require("./middleware/globalErrorHandling");
const check_availability_routes_1 = require("./module/check-availability/check.availability.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/facility", facility_routes_1.facilityRoutes);
app.use("/api/auth", auth_routes_1.AuthRoutes);
app.use("/api/bookings", booking_routes_1.BookingRoutes);
app.use("/api/check-availability", check_availability_routes_1.CheckBookingRoutes);
app.use(globalErrorHandling_1.globalErrorHandler);
app.get('/', (req, res) => {
    res.send('Hello Word one');
});
// app.get('/', (req:Request , res: Response) => {
//   res.send('Hello World')
// });
app.use(notFound_1.notFoundHandler);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!config_1.default.db_url) {
                throw new Error("database is url is missing");
            }
            yield mongoose_1.default.connect(config_1.default.db_url);
            // console.log('connecting to database', config.db_url);
            app.listen(config_1.default.port, () => {
                console.log(`Example app listening on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
exports.default = app;
