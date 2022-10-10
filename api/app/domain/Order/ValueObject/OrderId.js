"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderId = void 0;
var textCount_1 = require("../../../utils/textCount");
var createOrderId = function (orderId) {
    if (!orderId) {
        throw new Error('orderIdが空です');
    }
    if (textCount_1.textCount(orderId) > 50) {
        throw new Error('orderIdの文字数は50文字以内です');
    }
    return {
        value: orderId
    };
};
exports.createOrderId = createOrderId;
