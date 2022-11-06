"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOrderId = exports.createOrderId = exports.validateOrderId = void 0;
var textCount_1 = require("../../../utils/textCount");
var validateOrderId = function (inputOrderId) {
    if (!inputOrderId) {
        return {
            result: 'err',
            data: { value: 'inputOrderIdがセットされていません。' },
        };
    }
    if (textCount_1.textCount(inputOrderId) < 50) {
        return {
            result: 'err',
            data: { value: 'inputOrderIdは50文字以内ではありません。' },
        };
    }
    return {
        result: 'ok',
        data: { value: inputOrderId },
    };
};
exports.validateOrderId = validateOrderId;
var createOrderId = function (validatorResult) {
    var result = validatorResult.result, data = validatorResult.data;
    if (result === 'err') {
        throw new Error(data.value);
    }
    return {
        value: data.value,
    };
};
exports.createOrderId = createOrderId;
/**
 * 結局適切にpipeに型定義する方法がまだわからなかった。。。
 * @param x
 */
var toOrderId = function (x) {
    var pipe = function () {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        return function (x) {
            return fns.reduce(function (y, f) { return f(y); }, x);
        };
    };
    return pipe(exports.validateOrderId, exports.createOrderId)(x);
};
exports.toOrderId = toOrderId;
