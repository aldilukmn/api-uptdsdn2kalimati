"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var gtk_1 = __importDefault(require("../controllers/gtk"));
var user_1 = __importDefault(require("../controllers/user"));
var utils_1 = require("../utils");
var router = express_1.default.Router();
var userUri = '/api/v1/user';
var gtkUri = '/api/v1/gtk';
// router.get('/', (req: Request, res: Response) => {
//   res.render('home', {
//     layout: 'layouts/main',
//     title: 'Home',
//   });
// })
// FOR ADMIN
router.get("".concat(userUri, "/:id"), user_1.default.getUserById);
router.post("".concat(userUri), utils_1.handleImage, user_1.default.register);
router.get("".concat(userUri), user_1.default.listUser);
router.delete("".concat(userUri, "/:id"), user_1.default.deleteUserById);
// GET GTK DATA
router.get("".concat(gtkUri), gtk_1.default.listGtk);
router.get("".concat(gtkUri, "/:id"), gtk_1.default.getGtkById);
router.post("".concat(gtkUri), utils_1.handleImage, gtk_1.default.createGtk);
router.patch("".concat(gtkUri, "/:id"), utils_1.handleImage, gtk_1.default.updateGtk);
router.delete("".concat(gtkUri, "/:id"), gtk_1.default.deleteGtkById);
exports.default = router;
//# sourceMappingURL=index.js.map