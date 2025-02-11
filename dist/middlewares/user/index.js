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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var utils_1 = require("../../utils");
var user_1 = __importDefault(require("../../repositories/user"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var UserMiddleware = /** @class */ (function () {
    function UserMiddleware() {
    }
    var _a;
    _a = UserMiddleware;
    UserMiddleware.verifyToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var token, getToken, decoded, user, isUser, e_1, response;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    token = req.headers.authorization;
                    getToken = (0, utils_1.validateToken)(token);
                    decoded = jsonwebtoken_1.default.verify(getToken, "".concat(process.env.SECRET_KEY));
                    return [4 /*yield*/, user_1.default.getUserByUsername(decoded.user)];
                case 1:
                    user = _b.sent();
                    isUser = user.username === decoded.user;
                    if (!isUser) {
                        throw new Error('user not found!');
                    }
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    if (e_1 instanceof Error) {
                        response = (0, utils_1.createDefaultResponse)(401, 'fail', e_1.message);
                        res.status(401).json(response);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    UserMiddleware.isAdmin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var token, getToken, decoded, user, isAdmin, e_2, response;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    token = req.headers.authorization;
                    getToken = (0, utils_1.validateToken)(token);
                    decoded = jsonwebtoken_1.default.verify(getToken, "".concat(process.env.SECRET_KEY));
                    return [4 /*yield*/, user_1.default.getUserByUsername(decoded.user)];
                case 1:
                    user = _b.sent();
                    isAdmin = user.role === decoded.role;
                    if (!isAdmin) {
                        throw new Error('it\'s not admin!');
                    }
                    next();
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _b.sent();
                    if (e_2 instanceof Error) {
                        response = (0, utils_1.createDefaultResponse)(401, 'fail', e_2.message);
                        res.status(401).json(response);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return UserMiddleware;
}());
exports.default = UserMiddleware;
//# sourceMappingURL=index.js.map