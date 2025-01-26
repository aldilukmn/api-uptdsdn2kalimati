"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var gtk_1 = __importDefault(require("../controllers/gtk"));
var user_1 = __importDefault(require("../controllers/user"));
var utils_1 = require("../utils");
var user_2 = __importDefault(require("../middlewares/user"));
var router = express_1.default.Router();
var baseUrl = '/api/v1';
var userUrl = "".concat(baseUrl, "/user");
var gtkUrl = "".concat(baseUrl, "/gtk");
// router.get('/', (req: Request, res: Response) => {
//   res.render('home', {
//     layout: 'layouts/main',
//     title: 'Home',
//   });
// })
// FOR ADMIN
router.get("".concat(userUrl, "/:id"), user_2.default.verifyToken, user_2.default.isAdmin, user_1.default.getUserById);
router.post("".concat(userUrl), user_2.default.verifyToken, user_2.default.isAdmin, utils_1.handleImage, user_1.default.register);
router.get("".concat(userUrl), user_2.default.verifyToken, user_2.default.isAdmin, user_1.default.listUser);
router.delete("".concat(userUrl, "/:id"), user_2.default.verifyToken, user_2.default.isAdmin, user_1.default.deleteUserById);
router.post("".concat(baseUrl, "/login"), user_1.default.login);
router.patch("".concat(userUrl, "/:id"), user_2.default.verifyToken, user_2.default.isAdmin, utils_1.handleImage, user_1.default.updateUserById);
// GET GTK DATA
router.get("".concat(gtkUrl), gtk_1.default.listGtk);
router.get("".concat(gtkUrl, "/:id"), gtk_1.default.getGtkById);
router.post("".concat(gtkUrl), utils_1.handleImage, gtk_1.default.createGtk);
router.patch("".concat(gtkUrl, "/:id"), utils_1.handleImage, gtk_1.default.updateGtk);
router.delete("".concat(gtkUrl, "/:id"), gtk_1.default.deleteGtkById);
exports.default = router;
//# sourceMappingURL=index.js.map