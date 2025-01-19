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
var mongoose_1 = __importDefault(require("mongoose"));
var gtk_1 = __importDefault(require("../models/schema/gtk"));
var cloudinary_1 = __importDefault(require("../config/cloudinary"));
var GtkRepository = /** @class */ (function () {
    function GtkRepository() {
    }
    // Get Data By Id
    GtkRepository.getGtkById = function (gtkId) {
        return __awaiter(this, void 0, void 0, function () {
            var gtkData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!mongoose_1.default.Types.ObjectId.isValid(gtkId)) {
                            throw new Error("Invalid ID format: ".concat(gtkId));
                        }
                        return [4 /*yield*/, gtk_1.default.findById(gtkId)];
                    case 1:
                        gtkData = _a.sent();
                        if (!gtkData) {
                            throw new Error("GTK with Id ".concat(gtkId, " not found!"));
                        }
                        return [2 /*return*/, gtkData];
                }
            });
        });
    };
    // Create New GTK
    GtkRepository.createGtk = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var newGtk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newGtk = new gtk_1.default(data);
                        return [4 /*yield*/, newGtk.save()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Update GTK
    GtkRepository.updateGtk = function (gtkId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedGtk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!gtkId) {
                            throw new Error('GTK ID is required!');
                        }
                        if (!data) {
                            throw new Error('No data provided for update!');
                        }
                        return [4 /*yield*/, gtk_1.default.findByIdAndUpdate(gtkId, {
                                $set: data,
                            }, {
                                new: true,
                                runValidators: true
                            })];
                    case 1:
                        updatedGtk = _a.sent();
                        if (!updatedGtk) {
                            throw new Error("GTK with Id ".concat(gtkId, " not found!"));
                        }
                        return [2 /*return*/, updatedGtk];
                }
            });
        });
    };
    // Delete GTK
    GtkRepository.deleteGtkById = function (gtkId) {
        return __awaiter(this, void 0, void 0, function () {
            var gtkData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!mongoose_1.default.Types.ObjectId.isValid(gtkId)) {
                            throw new Error("invalid id format: ".concat(gtkId));
                        }
                        ;
                        return [4 /*yield*/, gtk_1.default.findById(gtkId)];
                    case 1:
                        gtkData = _a.sent();
                        if (!gtkData) {
                            throw new Error("gtk with id ".concat(gtkId, " not found!"));
                        }
                        ;
                        if (!gtkData.image_id) return [3 /*break*/, 3];
                        return [4 /*yield*/, cloudinary_1.default.uploader.destroy(gtkData.image_id)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ;
                        return [4 /*yield*/, gtk_1.default.findByIdAndDelete(gtkId)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return GtkRepository;
}());
exports.default = GtkRepository;
//# sourceMappingURL=gtk.js.map