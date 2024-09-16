"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const facility_controller_1 = require("./facility.controller");
const router = express_1.default.Router();
router.post('/', facility_controller_1.facilityController.createFacility);
router.get('/', facility_controller_1.facilityController.getAllFacilities);
router.get('/:', facility_controller_1.facilityController.getAllFacilities);
exports.facilityRoutes = router;
