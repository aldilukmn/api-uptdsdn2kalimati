"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createDefaultResponse = function (code, response, message, result) {
    return {
        status: {
            code: code,
            response: response,
            message: message,
        },
        result: result
    };
};
exports.default = createDefaultResponse;
//# sourceMappingURL=index.js.map