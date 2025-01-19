"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var imageStorage = multer_1.default.diskStorage({
    filename: function (req, file, cb) {
        cb(null, "".concat(new Date().getTime(), "-").concat(file.originalname));
    }
});
var handleImage = (0, multer_1.default)({
    storage: imageStorage
}).single('image_url');
exports.default = handleImage;
//# sourceMappingURL=index.js.map