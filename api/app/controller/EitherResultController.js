"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLeft = exports.createRight = void 0;
var express_1 = __importDefault(require("express"));
var CustomerEmailAddress_1 = require("../domain/User/src/Entity/CustomerEmailAddress");
var router = express_1.default.Router();
router.get('/', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var customerEmailAddress = CustomerEmailAddress_1.createCustomerEmailAddress('test@example.com');
    var ClassContainerT = new ClassContainer(1);
    var getNumber = function (value) { return value; };
    var toString = function (value) { return String(value); };
    var stringToNumber = function (value) { return Number(value); };
    var addTwoNumbers = function (x) { return function (y) { return x + y; }; }; // (x: Number) => (y: Number) => Number
    var ClassContainerU = ClassContainerT.fmap(toString);
    var ClassContainerE = ClassContainerU.fmap(stringToNumber).ap(new ClassContainer(addTwoNumbers(2)));
    var ClassContainerI = new ClassContainer(1);
    var ClassContainerF = new ClassContainer(0);
    var ClassContainerG = ClassContainerF.fmap(addTwoNumbers(2)).ap(new ClassContainer(addTwoNumbers(3)));
    var ClassContainerH = new ClassContainer(0).ap(new ClassContainer(addTwoNumbers(3)));
    var ClassContainerL = new ClassContainer(addTwoNumbers);
    var ClassContainerM = new ClassContainer(addTwoNumbers(2));
    var FunctionalContainerT = of(1);
    var FunctionalContainerU = fmap(toString)(FunctionalContainerT);
    var tst = new ClassContainer(addTwoNumbers(2));
    // output => { value: 5 }
    // console.log(ap(
    //     of(
    //         add(2)
    //     )
    // ));
    //     console.log( (new ClassContainer<number>(1)));
    //     console.log((
    //         of(5)
    //     ));
    // output => Array[0] = 1
    var getNumbe2 = function (value) { return value + 2; };
    res.end(JSON.stringify([
        customerEmailAddress.isLeft,
        customerEmailAddress.isRight,
        ClassContainerT,
        ClassContainerU,
        FunctionalContainerT,
        FunctionalContainerU,
        ClassContainerE,
        ap(of(add(2)))(of(3)),
        ap(fmap(add)(of(2)))(of(3)),
        ClassContainerG,
        ClassContainerH,
        function () { return 1; },
        (of(5)),
        (new ClassContainer(1)),
        ap(of(add(2))),
        ClassContainerF.fmap(addTwoNumbers(2))
    ]));
    next();
});
var ClassContainer = /** @class */ (function () {
    function ClassContainer(value) {
        this.value = value;
    }
    ClassContainer.prototype.fmap = function (f) {
        return new ClassContainer(f(this.value));
    };
    ClassContainer.prototype.ap = function (f) {
        var _this = this;
        return f.fmap(function (func) { return func(_this.value); });
    };
    return ClassContainer;
}());
var of = function (value) { return ({ value: value }); };
var fmap = function (f) { return function (fa) { return of(f(fa.value)); }; };
var toString = function (value) { return String(value); };
var ap = function (_a) {
    var f = _a.value;
    return function (_a) {
        var value = _a.value;
        return of(f(value));
    };
};
var add = function (x) { return function (y) { return (x + y); }; };
var result6 = ap(of(add(2)));
var result7 = ap(fmap(add)(of(2)));
console.log(result6(of(4)));
console.log(result7(of(5)));
/* Either Class */
var RightClass = /** @class */ (function () {
    function RightClass(value) {
        this.value = value;
    }
    RightClass.prototype.isLeft = function () {
        return false;
    };
    RightClass.prototype.isRight = function () {
        console.log(this.value);
        return true;
    };
    RightClass.prototype.fmap = function (f) {
        return new RightClass(f(this.value));
    };
    RightClass.prototype.getValue = function () {
        return this.value;
    };
    return RightClass;
}());
var createRight = function (value) {
    return new RightClass(value);
};
exports.createRight = createRight;
var LeftClass = /** @class */ (function () {
    function LeftClass(value) {
        this.value = value;
    }
    LeftClass.prototype.isLeft = function () {
        return true;
    };
    LeftClass.prototype.isRight = function () {
        return false;
    };
    LeftClass.prototype.fmap = function (f) {
        return new LeftClass(f(this.value));
    };
    LeftClass.prototype.getValue = function () {
        return this.value;
    };
    return LeftClass;
}());
var createLeft = function (value) {
    return new LeftClass(value);
};
exports.createLeft = createLeft;
var exec = function (onLeft, onRight) { return function (either) {
    if (either.isLeft()) {
        return onLeft(either.getValue());
    }
    return onRight(either.getValue());
}; };
var isLessThan255 = function (stringVal) {
    return stringVal.length < 255;
};
var addSanToString = function (value) {
    return value + 'さん';
};
var ValidateUserNameForClass = function (userName) {
    if (!isLessThan255(userName)) {
        return exports.createLeft('ユーザー名は255文字以内にしてください。');
    }
    return exports.createRight(userName);
};
var userEither = ValidateUserNameForClass('User Class Name');
var userEitherNameSan = userEither.fmap(addSanToString);
console.log(userEitherNameSan);
console.log(exec(function (str) { return "Error2: " + str; }, function (value) { return value; })(userEitherNameSan));
var isLeft = function (m) { return m.type === "left"; };
var ofRight = function (value) { return ({ type: "right", value: value }); };
var ofLeft = function (value) { return ({ type: "left", value: value }); };
var mapEither = function (f) { return function (m) { return isLeft(m) ? ofLeft(m.value) : ofRight(f(m.value)); }; };
//const flattenEither: FlattenEither = (m) => isLeft(m) ? ofLeft(m.value) : m.value
var flatMapEither = function (f) { return function (m) { return isLeft(m) ? ofLeft(m.value) : f(m.value); }; };
var validateUserName = function (userName) {
    if (!isLessThan255(userName)) {
        return ofLeft('ユーザー名は255文字以内にしてください。');
    }
    return ofRight(userName);
};
var match = function (onLeft, onRight) { return function (m) { return isLeft(m) ? onLeft(m.value) : onRight(m.value); }; };
var getValue = match(function (str) { return "Error: " + str; }, function (value) { return value; });
var result = flatMapEither(validateUserName)(ofRight('User Name'));
console.log(getValue(result));
var result2 = mapEither(addSanToString)(result);
console.log(getValue(result2));
var tryCatch = function (f, onError) {
    try {
        return ofRight(f());
    }
    catch (e) {
        return ofLeft(onError(e));
    }
};
var head = function (arr) {
    if (arr.length > 0) {
        return arr[0];
    }
    else {
        throw new Error('empty array');
    }
};
var toMessage = match(function (str) { return "Error: " + str; }, function (n) { return "Array[0] = " + n; });
console.log(toMessage(tryCatch(function () { return head([]); }, function (e) { return e instanceof Error ? e.message : "unknown error"; })));
// output => Error: empty array
console.log(toMessage(tryCatch(function () { return head([1, 2, 3]); }, function (e) { return e instanceof Error ? e.message : "unknown error"; })));
// #9から読むこと
exports.default = router;
