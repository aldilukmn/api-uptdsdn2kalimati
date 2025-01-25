"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validateToken = function (token) {
    if (!token) {
        throw new Error('please login first!');
    }
    ;
    if (!token.startsWith('Bearer')) {
        throw new Error('wrong format token!');
    }
    ;
    var getToken = token.split(' ')[1];
    return getToken;
};
exports.default = validateToken;
//# sourceMappingURL=index.js.map