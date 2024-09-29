"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const facility_controller_1 = require("./facility.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const facility_validation_1 = require("./facility.validation");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.get('/', facility_controller_1.facilityController.getAllFacilities);
router.post('/', (0, auth_1.auth)(["admin"]), (0, validateRequest_1.default)(facility_validation_1.facilityZodSchemaFile.facilityZodSchema), facility_controller_1.facilityController.createFacility);
router.put('/:id', (0, auth_1.auth)(["admin"]), (0, validateRequest_1.default)(facility_validation_1.facilityZodSchemaFile.facilityZodSchema), facility_controller_1.facilityController.updateAFacility);
router.delete('/:id', (0, auth_1.auth)(["admin"]), facility_controller_1.facilityController.deleteAFacility);
exports.facilityRoutes = router;
