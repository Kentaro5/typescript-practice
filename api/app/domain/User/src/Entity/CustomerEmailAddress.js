"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerifiedCustomerEmailAddress = exports.createCustomerEmailAddress = void 0;
var EitherResult2_1 = require("../../../Common/EitherResult2");
var createCustomerEmailAddress = function (email) {
    var invaild = false;
    if (invaild) {
        return EitherResult2_1.createLeft2({
            email: email,
            verified: false,
        });
    }
    return EitherResult2_1.createRight2({
        email: email,
        verified: true,
    });
};
exports.createCustomerEmailAddress = createCustomerEmailAddress;
var createVerifiedCustomerEmailAddress = function (customerEmailAddress) {
    return {
        email: customerEmailAddress.email,
        verified: true,
    };
};
exports.createVerifiedCustomerEmailAddress = createVerifiedCustomerEmailAddress;
