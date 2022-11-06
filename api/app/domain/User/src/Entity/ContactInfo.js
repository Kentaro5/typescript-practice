"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactInfo = void 0;
var createContactInfo = function (info) {
    if (info.email != null && info.address === null) {
        return {
            email: info.email,
            address: null,
        };
    }
    if (info.email == null && info.address != null) {
        return {
            email: null,
            address: info.address,
        };
    }
    if (info.email != null && info.address != null) {
        return {
            email: info.email,
            address: info.address,
        };
    }
    return {
        errorMsg: '不正です。',
    };
};
exports.createContactInfo = createContactInfo;
