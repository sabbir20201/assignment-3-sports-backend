"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const handleError = err.issues.map(error => {
        return {
            path: String(error.path[error.path.length - 1]),
            message: error.message
        };
    });
    const statusCode = 404;
    return {
        statusCode,
        message: err.name,
        errorSources: handleError
    };
};
exports.default = handleZodError;
