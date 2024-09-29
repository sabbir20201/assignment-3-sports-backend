"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const notFoundHandler = (req, res, next) => {
    res.status(403).json({
        success: false,
        statusCode: 404,
        message: "Not Found",
    });
};
exports.notFoundHandler = notFoundHandler;
