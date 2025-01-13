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
var gtk_1 = __importDefault(require("../models/gtk"));
var gtk_2 = __importDefault(require("../services/gtk"));
var Gtk = /** @class */ (function () {
    function Gtk() {
    }
    var _a;
    _a = Gtk;
    Gtk.listGtk = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var gtkData, response, error_1, response;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, gtk_1.default.find()];
                case 1:
                    gtkData = _b.sent();
                    response = {
                        status: {
                            code: 200,
                            response: 'success',
                            message: 'Data successfully retrieved.'
                        },
                        result: gtkData
                    };
                    res.status(200).json(response);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    response = {
                        status: {
                            code: 400,
                            response: 'error',
                            message: "asa".concat(error_1)
                        }
                    };
                    res.status(400).json(response);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    Gtk.getGtkById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var gtkId, getGtk, response, error_2, response;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    gtkId = req.params.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, gtk_2.default.getGtkById(gtkId)];
                case 2:
                    getGtk = _b.sent();
                    response = {
                        status: {
                            code: 200,
                            response: 'success',
                            message: 'Gtk has found'
                        },
                        result: getGtk
                    };
                    res.status(200).json(response);
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    response = {
                        status: {
                            code: 404,
                            response: 'fail',
                            message: "".concat(error_2)
                        }
                    };
                    res.status(404).json(response);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    Gtk.deleteGtkById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var gtkId, response, error_3, response;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    gtkId = req.params.id;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, gtk_2.default.deleteGtkById(gtkId)];
                case 2:
                    _b.sent();
                    response = {
                        status: {
                            code: 200,
                            response: 'success',
                            message: "GTK with id: ".concat(gtkId, " has been deleted")
                        }
                    };
                    res.status(200).json(response);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    response = {
                        status: {
                            code: 400,
                            response: 'fail',
                            message: "".concat(error_3)
                        }
                    };
                    res.status(400).json(response);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    Gtk.createGtk = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, image, typeImage, newGtk, response, error_4, response;
        var _b, _c;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    payload = req.body;
                    image = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
                    typeImage = (_c = req.file) === null || _c === void 0 ? void 0 : _c.mimetype;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, gtk_2.default.createGtk(payload, image, typeImage)];
                case 2:
                    newGtk = _d.sent();
                    response = {
                        status: {
                            code: 201,
                            response: 'success',
                            message: 'GTK successfully created.'
                        },
                        result: newGtk
                    };
                    res.status(201).json(response);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _d.sent();
                    response = {
                        status: {
                            code: 400,
                            response: 'fail',
                            message: "".concat(error_4)
                        }
                    };
                    res.status(400).json(response);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    Gtk.updateGtk = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, gtkId, image, typeImage, gtkUpdate, response, error_5, response;
        var _b, _c;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    payload = req.body;
                    gtkId = req.params.id;
                    image = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
                    typeImage = (_c = req.file) === null || _c === void 0 ? void 0 : _c.mimetype;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, gtk_2.default.updateGtk(res, payload, gtkId, image, typeImage)];
                case 2:
                    gtkUpdate = _d.sent();
                    response = {
                        status: {
                            code: 200,
                            response: 'success',
                            message: 'GTK successfully updated.'
                        },
                        result: gtkUpdate
                    };
                    res.status(200).json(response);
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _d.sent();
                    response = {
                        status: {
                            code: 400,
                            response: 'fail',
                            message: "".concat(error_5)
                        }
                    };
                    res.status(400).json(response);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return Gtk;
}());
exports.default = Gtk;
//# sourceMappingURL=index.js.map