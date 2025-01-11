"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controller_1 = __importDefault(require("../controller"));
var rounter = express_1.default.Router();
rounter.get('/v1/gtk', controller_1.default.listGtk);
exports.default = rounter;
//# sourceMappingURL=index.js.map