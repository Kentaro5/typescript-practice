"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var route_1 = __importDefault(require("./app/routes/route"));
var app = express_1.default();
var port = 3000;
app.use('/api', route_1.default);
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
