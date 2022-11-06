"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRight2 = exports.createLeft2 = void 0;
var createLeft2 = function (wrongData) {
    return {
        value: wrongData,
        isLeft: true,
        isRight: false,
    };
};
exports.createLeft2 = createLeft2;
var createRight2 = function (correctData) {
    return {
        value: correctData,
        isLeft: false,
        isRight: true,
    };
};
exports.createRight2 = createRight2;
