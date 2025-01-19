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
// router.get('/', (req: Request, res: Response) => {
//   res.render('home', {
//     layout: 'layouts/main',
//     title: 'Home',
//   });
// })
// FOR ADMIN
router.get("".concat(process.env.USER_URL, "/:id"), user_1.default.getUserById);
router.post("".concat(process.env.USER_URL), utils_1.handleImage, user_1.default.register);
router.get("".concat(process.env.USER_URL), user_1.default.listUser);
router.delete('/api/v1/user/:id', user_1.default.deleteUserById);
// GET GTK DATA
router.get("".concat(process.env.GTK_URL), gtk_1.default.listGtk);
router.get("".concat(process.env.GTK_URL, "/:id"), gtk_1.default.getGtkById);
router.post("".concat(process.env.GTK_URL), utils_1.handleImage, gtk_1.default.createGtk);
router.patch("".concat(process.env.GTK_URL, "/:id"), utils_1.handleImage, gtk_1.default.updateGtk);
router.delete("".concat(process.env.GTK_URL, "/:id"), gtk_1.default.deleteGtkById);
exports.default = router;
//# sourceMappingURL=index.js.map