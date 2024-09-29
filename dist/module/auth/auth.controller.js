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
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const auth_createToken_1 = require("./auth.createToken");
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("./auth.utils");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = req.body;
        const result = yield auth_service_1.authService.registerInToDB(data);
        const tokenData = {
            email: data.email,
            role: data.role
        };
        const token = (0, auth_createToken_1.createToken)(tokenData, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_in);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User registered successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'use another email',
            error: `${(_a = error === null || error === void 0 ? void 0 : error.errorResponse) === null || _a === void 0 ? void 0 : _a.keyValue.email} is already exist`
        });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const user = yield auth_service_1.authService.loginFromDB(userData);
        if (!user) {
            throw new Error("user not found");
        }
        const passwordMatch = yield (0, auth_utils_1.isPasswordMatched)(userData.password, user.password);
        if (!passwordMatch) {
            throw new Error("password not matched");
        }
        const jwtPayload = {
            email: user.email,
            role: user.role,
        };
        const token = (0, auth_createToken_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expire_in);
        const userLoginData = {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address
        };
        res.cookie('token', token, {
            httpOnly: true
        });
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User logged in successfully",
            token: token,
            data: userLoginData,
        });
    }
    catch (error) {
        res.json({
            success: false,
            statusCode: 500,
            error: error.message
        });
    }
});
exports.authController = {
    register,
    login
};
