"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBookingRoutes = void 0;
const express_1 = require("express");
const checkAvailability_controllers_1 = __importDefault(require("./checkAvailability.controllers"));
const router = (0, express_1.Router)();
router.get('/', checkAvailability_controllers_1.default);
exports.CheckBookingRoutes = router;
