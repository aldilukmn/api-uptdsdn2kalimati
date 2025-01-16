"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var controllers_1 = __importDefault(require("../controllers"));
var uploadFile_1 = __importDefault(require("../utils/uploadFile"));
var router = express_1.default.Router();
router.get('/', function (req, res) {
    res.render('home', {
        layout: 'layouts/main',
        title: 'Home',
    });
});
router.get('/api/v1/gtk', controllers_1.default.listGtk);
router.get('/api/v1/gtk/:id', controllers_1.default.getGtkById);
router.post('/api/v1/gtk', uploadFile_1.default, controllers_1.default.createGtk);
router.patch('/api/v1/gtk/:id', uploadFile_1.default, controllers_1.default.updateGtk);
router.delete('/api/v1/gtk/:id', controllers_1.default.deleteGtkById);
exports.default = router;
//# sourceMappingURL=index.js.map