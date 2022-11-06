"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSuccess = exports.createFail = void 0;
var createFail = function (errorStatus, errorMessage, errorData) {
    return {
        result: 'err',
        status: errorStatus,
        message: errorMessage,
        data: errorData,
    };
};
exports.createFail = createFail;
var createSuccess = function (successStatus, successMessage, successData) {
    return {
        result: 'ok',
        status: successStatus,
        message: successMessage,
        data: successData,
    };
};
exports.createSuccess = createSuccess;
// 使用例createSuccess<string>(202, 'successMessage', 'successData')
// https://qiita.com/k-penguin-sato/items/9baa959e8919157afcd4
