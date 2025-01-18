"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var gtk_1 = __importDefault(require("../controllers/gtk"));
var uploadFile_1 = __importDefault(require("../utils/uploadFile"));
var user_1 = __importDefault(require("../controllers/user"));
var router = express_1.default.Router();
// router.get('/', (req: Request, res: Response) => {
//   res.render('home', {
//     layout: 'layouts/main',
//     title: 'Home',
//   });
// })
// FOR ADMIN
router.get('/api/v1/user/:id', user_1.default.getUserById);
router.post('/api/v1/user', uploadFile_1.default, user_1.default.register);
router.get('/api/v1/user', user_1.default.listUser);
// GET GTK DATA
router.get('/api/v1/gtk', gtk_1.default.listGtk);
router.get('/api/v1/gtk/:id', gtk_1.default.getGtkById);
router.post('/api/v1/gtk', uploadFile_1.default, gtk_1.default.createGtk);
router.patch('/api/v1/gtk/:id', uploadFile_1.default, gtk_1.default.updateGtk);
router.delete('/api/v1/gtk/:id', gtk_1.default.deleteGtkById);
exports.default = router;
//# sourceMappingURL=index.js.map