"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var EitherResultController_1 = __importDefault(require("../controller/EitherResultController"));
var router = express_1.default.Router();
router.use('/', EitherResultController_1.default);
router.use('/either-result', EitherResultController_1.default);
exports.default = router;
