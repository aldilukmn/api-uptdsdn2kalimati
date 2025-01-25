"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./router"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
// import expressEjsLayouts from 'express-ejs-layouts';
var cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
var app = (0, express_1.default)();
// app.use(express.static('public'));
// app.set('view engine', 'ejs');
// app.use(expressEjsLayouts);
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true })); //For Login body json, POST METHOD
// app.use(express.json()); //For Login body json, POST METHOD
app.use((0, cors_1.default)({
    origin: "".concat(process.env.DEPLOY),
    credentials: true
}));
app.use('/', router_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map