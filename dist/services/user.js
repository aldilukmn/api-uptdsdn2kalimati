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
var cloudinary_1 = __importDefault(require("../config/cloudinary"));
var user_1 = __importDefault(require("../repositories/user"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserService = /** @class */ (function () {
    function UserService() {
    }
    var _a;
    _a = UserService;
    UserService.register = function (payload, isImage, imageType) { return __awaiter(void 0, void 0, void 0, function () {
        var username, password, email, role, imageUrl, getUsername, getUserEmail, salt, hasPass, newUser, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    username = payload.username, password = payload.password, email = payload.email, role = payload.role;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, , 9]);
                    if (!username || !password || !email || !role) {
                        throw new Error("".concat(!username ? 'username' : !password ? 'password' : !email ? 'email' : !role ? 'role' : null, " is required!"));
                    }
                    if (!email.includes('@')) {
                        throw new Error('Not email format!');
                    }
                    if (password.length < 8) {
                        throw new Error('Password length should be more than 8 characters!');
                    }
                    if (imageType !== 'image/png' &&
                        imageType !== 'image/jpg' &&
                        imageType !== 'image/jpeg') {
                        throw new Error('It\'s not image format!');
                    }
                    if (!isImage) {
                        throw new Error('Image is undefined!');
                    }
                    return [4 /*yield*/, cloudinary_1.default.uploader.upload(isImage, {
                            folder: 'user'
                        }, function (err, result) {
                            if (err) {
                                throw new Error('Failed to upload image to cloudinary!');
                            }
                            return result;
                        })];
                case 2:
                    imageUrl = _b.sent();
                    return [4 /*yield*/, user_1.default.getUserByUsername(username)];
                case 3:
                    getUsername = _b.sent();
                    return [4 /*yield*/, user_1.default.getUserByEmail(email)];
                case 4:
                    getUserEmail = _b.sent();
                    return [4 /*yield*/, bcrypt_1.default.genSalt()];
                case 5:
                    salt = _b.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                case 6:
                    hasPass = _b.sent();
                    if (getUsername !== null && getUsername !== void 0 ? getUsername : getUserEmail) {
                        throw new Error("".concat(getUsername ? 'username' : 'email', " already exist!"));
                    }
                    newUser = {
                        username: username.toLowerCase(),
                        password: hasPass,
                        email: email.toLowerCase(),
                        role: role.toLowerCase(),
                        image_url: imageUrl.secure_url,
                        image_id: imageUrl.public_id
                    };
                    return [4 /*yield*/, user_1.default.createUser(newUser)];
                case 7:
                    _b.sent();
                    return [2 /*return*/, newUser];
                case 8:
                    error_1 = _b.sent();
                    throw error_1;
                case 9: return [2 /*return*/];
            }
        });
    }); };
    return UserService;
}());
exports.default = UserService;
//# sourceMappingURL=user.js.map