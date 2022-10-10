"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerifiedCustomerEmailAddress = exports.createCustomerEmailAddress = void 0;
var createCustomerEmailAddress = function (email) {
    return {
        email: email,
        verified: false
    };
};
exports.createCustomerEmailAddress = createCustomerEmailAddress;
var createVerifiedCustomerEmailAddress = function (customerEmailAddress) {
    if (customerEmailAddress.verified === true) {
        // エラーを投げる
    }
    return {
        email: customerEmailAddress.email,
        verified: true
    };
};
exports.createVerifiedCustomerEmailAddress = createVerifiedCustomerEmailAddress;
