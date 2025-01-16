"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var cors_1 = __importDefault(require("cors"));
var express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.static('public'));
app.set('view engine', 'ejs');
app.use(express_ejs_layouts_1.default);
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use((0, cors_1.default)());
app.use('/', router_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map