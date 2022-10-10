"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var CustomerEmailAddress_1 = require("../domain/User/src/Entity/CustomerEmailAddress");
var OrderId_1 = require("../domain/Order/ValueObject/OrderId");
var router = express_1.default.Router();
router.get('/', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var customerEmailAddress = CustomerEmailAddress_1.createCustomerEmailAddress('test@example.com');
    var addTwoFunction = addFunctionGenerator(2);
    var addThreeFunction = addFunctionGenerator(3);
    var helloFunc = curriedGreetingFunction('Hello');
    var add1ThenSquare = compose(add1, square);
    var orderId = OrderId_1.createOrderId('orderId');
    var verifiedCustomerEmailAddress = CustomerEmailAddress_1.createVerifiedCustomerEmailAddress(customerEmailAddress);
    res.end(JSON.stringify([
        customerEmailAddress,
        verifiedCustomerEmailAddress,
        addTwoFunction(1),
        addThreeFunction(1),
        helloFunc('Ken'),
        helloFunc('KenTo'),
        add1ThenSquare(5),
        orderId.value,
        '😄💢✋'.split('').length,
        Array.from('😄💢✋').length
    ]));
    next();
});
/**
 * addTwoFunction = (intNumber) => {return intNumber + 2 }
 * addThreeFunction = (intNumber) => {return intNumber + 3 }
 * 上記を１つのメソッドにしたもの
 * @param numberToAdd
 */
var addFunctionGenerator = function (numberToAdd) {
    return function (intNumber) {
        return numberToAdd + intNumber;
    };
};
/**
 * カリー化関数の例
 * @param greetingFormat
 */
var curriedGreetingFunction = function (greetingFormat) { return function (word) {
    return greetingFormat + ' ' + word;
}; };
var dividedBy12 = function (argNumber) {
    return argNumber / 12;
};
/**
 * total functionの例2
 * 引数が不正のものの場合、0で割り算を行うなど。その場合は、nullを返すことを明示的に指定。
 */
var dividedBy12Part2 = function (argNumber) {
    return argNumber / 12;
};
/**
 * function compositonの例
 * https://www.freecodecamp.org/news/function-composition-in-javascript/
 * https://qiita.com/Nossa/items/a8b9e013eb0467321c1e
 */
var add1 = function (num) {
    return num + 1;
};
var square = function (num) {
    return num * num;
};
/**
 * 上記２つをパイプする。
 * @param f1
 * @param f2
 */
var compose = function (f1, f2) { return function (value) { return f2(f1(value)); }; };
exports.default = router;
