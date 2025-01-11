"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use('/api', router_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map