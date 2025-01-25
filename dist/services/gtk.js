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
var gtk_1 = __importDefault(require("../repositories/gtk"));
var utils_1 = require("../utils");
var GtkService = /** @class */ (function () {
    function GtkService() {
    }
    GtkService.saveUpdate = function (options, gtkId, newImageUrl, newImageId) {
        return __awaiter(this, void 0, void 0, function () {
            var status, name, nip, class_gtk, existingGtk, totalStudent, updateGtk;
            var _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        status = options.status, name = options.name, nip = options.nip, class_gtk = options.class_gtk;
                        return [4 /*yield*/, gtk_1.default.getGtkById(gtkId)];
                    case 1:
                        existingGtk = _d.sent();
                        totalStudent = {
                            male: ((_b = options.totalStudent) === null || _b === void 0 ? void 0 : _b.male) || existingGtk.totalStudent.male,
                            female: ((_c = options.totalStudent) === null || _c === void 0 ? void 0 : _c.female) || existingGtk.totalStudent.female,
                        };
                        updateGtk = {
                            status: status || existingGtk.status,
                            name: name || existingGtk.name,
                            nip: nip || existingGtk.nip,
                            class_gtk: class_gtk || existingGtk.class_gtk,
                            image_url: newImageUrl || existingGtk.image_url,
                            image_id: newImageId || existingGtk.image_id,
                            totalStudent: totalStudent
                        };
                        return [4 /*yield*/, gtk_1.default.updateGtk(gtkId, updateGtk)];
                    case 2:
                        _d.sent();
                        return [2 /*return*/, updateGtk];
                }
            });
        });
    };
    var _a;
    _a = GtkService;
    GtkService.createGtk = function (payload, image, imageType) { return __awaiter(void 0, void 0, void 0, function () {
        var imageUrl, newGtk, e_1;
        var _b, _c;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 3, , 4]);
                    if (!payload.status || !payload.name) {
                        throw new Error("".concat(!payload.status ? 'status'
                            : !payload.name ? 'name'
                                : null, " is required!"));
                    }
                    ;
                    if (!(0, utils_1.isValidImage)(imageType)) {
                        throw new Error('It\'s not image format!');
                    }
                    ;
                    if (!image) {
                        throw new Error('Image is undefined!');
                    }
                    ;
                    return [4 /*yield*/, (0, utils_1.handleCloudinary)(image, 'gtk')];
                case 1:
                    imageUrl = _d.sent();
                    newGtk = {
                        status: payload.status.toLowerCase(),
                        name: payload.name,
                        nip: payload.nip === '-' ? '' : payload.nip,
                        class_gtk: payload.class_gtk,
                        image_url: imageUrl.secure_url,
                        image_id: imageUrl.public_id,
                        totalStudent: {
                            male: (_b = payload.totalStudent) === null || _b === void 0 ? void 0 : _b.male,
                            female: (_c = payload.totalStudent) === null || _c === void 0 ? void 0 : _c.female
                        }
                    };
                    return [4 /*yield*/, gtk_1.default.createGtk(newGtk)];
                case 2:
                    _d.sent();
                    return [2 /*return*/, newGtk];
                case 3:
                    e_1 = _d.sent();
                    if (e_1 instanceof Error) {
                        throw new Error(e_1.message);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    GtkService.getGtkById = function (gtkId) { return __awaiter(void 0, void 0, void 0, function () {
        var getGtk, e_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, gtk_1.default.getGtkById(gtkId)];
                case 1:
                    getGtk = _b.sent();
                    return [2 /*return*/, getGtk];
                case 2:
                    e_2 = _b.sent();
                    if (e_2 instanceof Error) {
                        throw new Error(e_2.message);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    GtkService.deleteGtkById = function (gtkId) { return __awaiter(void 0, void 0, void 0, function () {
        var deleteGtk, e_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, gtk_1.default.deleteGtkById(gtkId)];
                case 1:
                    deleteGtk = _b.sent();
                    return [2 /*return*/, deleteGtk];
                case 2:
                    e_3 = _b.sent();
                    if (e_3 instanceof Error) {
                        throw new Error(e_3.message);
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    GtkService.updateGtk = function (payload, gtkId, image, imageType) { return __awaiter(void 0, void 0, void 0, function () {
        var gtkUpdate, newImageUrl, e_4;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    if (!image) return [3 /*break*/, 3];
                    if (!(0, utils_1.isValidImage)(imageType)) {
                        throw new Error('It\'s not image format!');
                    }
                    return [4 /*yield*/, (0, utils_1.handleCloudinary)(image, 'gtk')];
                case 1:
                    newImageUrl = _b.sent();
                    return [4 /*yield*/, _a.saveUpdate(payload, gtkId, newImageUrl.secure_url, newImageUrl.public_id)];
                case 2:
                    gtkUpdate = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, _a.saveUpdate(payload, gtkId)];
                case 4:
                    gtkUpdate = _b.sent();
                    _b.label = 5;
                case 5: return [2 /*return*/, gtkUpdate];
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
    return GtkService;
}());
exports.default = GtkService;
//# sourceMappingURL=gtk.js.map