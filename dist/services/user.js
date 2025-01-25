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
var user_1 = __importDefault(require("../repositories/user"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var utils_1 = require("../utils");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.saveUpdate = function (options, userId, newImageUrl, newImageId) {
        return __awaiter(this, void 0, void 0, function () {
            var password, salt, newHasPass, existingUser, passIsCorrect, updateUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        password = options.password;
                        return [4 /*yield*/, bcrypt_1.default.genSalt()];
                    case 1:
                        salt = _b.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 2:
                        newHasPass = _b.sent();
                        return [4 /*yield*/, user_1.default.getUserById(userId)];
                    case 3:
                        existingUser = _b.sent();
                        return [4 /*yield*/, bcrypt_1.default.compare(password, existingUser.password)];
                    case 4:
                        passIsCorrect = _b.sent();
                        updateUser = {
                            username: existingUser.username,
                            password: !passIsCorrect ? newHasPass : existingUser.password,
                            image_url: newImageUrl || existingUser.image_url,
                            image_id: newImageId || existingUser.image_id
                        };
                        return [4 /*yield*/, user_1.default.updateUser(userId, updateUser)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, updateUser];
                }
            });
        });
    };
    ;
    var _a;
    _a = UserService;
    UserService.register = function (payload, isImage, imageType) { return __awaiter(void 0, void 0, void 0, function () {
        var username, password, email, role, getUsername, getUserEmail, imageUrl, salt, hasPass, newUser, e_1;
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
                    if ((0, utils_1.isValidImage)(imageType)) {
                        throw new Error('It\'s not image format!');
                    }
                    ;
                    if (!isImage) {
                        throw new Error('Image is undefined!');
                    }
                    return [4 /*yield*/, user_1.default.getUserByUsername(username)];
                case 2:
                    getUsername = _b.sent();
                    return [4 /*yield*/, user_1.default.getUserByEmail(email)];
                case 3:
                    getUserEmail = _b.sent();
                    if (getUsername !== null && getUsername !== void 0 ? getUsername : getUserEmail) {
                        throw new Error("".concat(getUsername ? 'username' : 'email', " already exist!"));
                    }
                    return [4 /*yield*/, (0, utils_1.handleCloudinary)(isImage, 'user')];
                case 4:
                    imageUrl = _b.sent();
                    return [4 /*yield*/, bcrypt_1.default.genSalt()];
                case 5:
                    salt = _b.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                case 6:
                    hasPass = _b.sent();
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
                    e_1 = _b.sent();
                    if (e_1 instanceof Error) {
                        throw new Error(e_1.message);
                    }
                    return [3 /*break*/, 9];
                case 9:
                    ;
                    return [2 /*return*/];
            }
        });
    }); };
    UserService.getUserById = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
        var getUser;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, user_1.default.getUserById(userId)];
                case 1:
                    getUser = _b.sent();
                    return [2 /*return*/, getUser];
            }
        });
    }); };
    UserService.login = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
        var username, password, getUser, passIsCorrect, token, e_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    username = payload.username, password = payload.password;
                    if (!username || !password) {
                        throw new Error("".concat(!username ? 'username' : 'password', " is required!"));
                    }
                    return [4 /*yield*/, user_1.default.getUserByUsername(username)];
                case 1:
                    getUser = _b.sent();
                    if (!getUser || !getUser.username) {
                        throw new Error('username doesn\'t exist!');
                    }
                    return [4 /*yield*/, bcrypt_1.default.compare(password, getUser.password)];
                case 2:
                    passIsCorrect = _b.sent();
                    if (!passIsCorrect) {
                        throw new Error('wrong password!');
                    }
                    ;
                    if (!process.env.SECRET_KEY) {
                        // const response = createDefaultResponse(500, 'fail', 'secret key is not defined in the environment variable!')
                        // return response;
                        throw new Error('secret key is not defined in the environment variable!');
                    }
                    ;
                    token = jsonwebtoken_1.default.sign({
                        user: username,
                        role: getUser.role
                    }, process.env.SECRET_KEY, {
                        expiresIn: '1h'
                    });
                    return [2 /*return*/, {
                            token: token,
                            username: username
                        }];
                case 3:
                    e_2 = _b.sent();
                    if (e_2 instanceof Error)
                        throw new Error(e_2.message);
                    throw new Error('an unknow error occured during login');
                case 4:
                    ;
                    return [2 /*return*/];
            }
        });
    }); };
    UserService.deleteUserById = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
        var deleteUser, e_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_1.default.deleteUserById(userId)];
                case 1:
                    deleteUser = _b.sent();
                    return [2 /*return*/, deleteUser];
                case 2:
                    e_3 = _b.sent();
                    if (e_3 instanceof Error)
                        throw new Error(e_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    UserService.updateUser = function (payload, userId, image, imageType) { return __awaiter(void 0, void 0, void 0, function () {
        var userUpdate, newImageUrl, e_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    if (!image) return [3 /*break*/, 3];
                    if (!(0, utils_1.isValidImage)(imageType)) {
                        throw new Error('It\'s not image format!');
                    }
                    ;
                    return [4 /*yield*/, (0, utils_1.handleCloudinary)(image, 'user')];
                case 1:
                    newImageUrl = _b.sent();
                    return [4 /*yield*/, _a.saveUpdate(payload, userId, newImageUrl.secure_url, newImageUrl.public_id)];
                case 2:
                    userUpdate = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, _a.saveUpdate(payload, userId)];
                case 4:
                    userUpdate = _b.sent();
                    _b.label = 5;
                case 5: return [2 /*return*/, userUpdate];
                case 6:
                    e_4 = _b.sent();
                    if (e_4 instanceof Error) {
                        throw new Error(e_4.message);
                    }
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return UserService;
}());
exports.default = UserService;
//# sourceMappingURL=user.js.map