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
    //const add1ThenSquare = compose( add1, square)
    var array = [1];
    var result = array.reduce(function (prev, current) { return prev + current; }, 0);
    //const pipe = (...fns:Array<(num:number) => number>) => (x:number) => fns.reduce((y, f) => f(y), x);
    // function pipe
    var output_final = pipe(square, checkNumber, double)(2);
    var orderId = OrderId_1.toOrderId('orderId');
    res.end(JSON.stringify([
        customerEmailAddress,
        addTwoFunction(1),
        addThreeFunction(1),
        helloFunc('Ken'),
        helloFunc('KenTo'),
        orderId.value,
        '๐๐ขโ'.split('').length,
        Array.from('๐๐ขโ').length,
        result,
        output_final,
    ]));
    next();
});
/**
 * addTwoFunction = (intNumber) => {return intNumber + 2 }
 * addThreeFunction = (intNumber) => {return intNumber + 3 }
 * ไธ่จใ๏ผใคใฎใกใฝใใใซใใใใฎ
 * @param numberToAdd
 */
var addFunctionGenerator = function (numberToAdd) {
    return function (intNumber) {
        return numberToAdd + intNumber;
    };
};
/**
 * ใซใชใผๅ้ขๆฐใฎไพ
 * @param greetingFormat
 */
var curriedGreetingFunction = function (greetingFormat) { return function (word) {
    return greetingFormat + ' ' + word;
}; };
var dividedBy12 = function (argNumber) {
    return argNumber / 12;
};
/**
 * total functionใฎไพ2
 * ๅผๆฐใไธๆญฃใฎใใฎใฎๅ?ดๅใ0ใงๅฒใ็ฎใ่กใใชใฉใใใฎๅ?ดๅใฏใnullใ่ฟใใใจใๆ็คบ็ใซๆๅฎใ
 */
var dividedBy12Part2 = function (argNumber) {
    return argNumber / 12;
};
/**
 * function compositonใฎไพ
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
 * ไธ่จ๏ผใคใใใคใใใใ
 * @param f1
 * @param f2
 */
var compose = function (f1, f2) { return function (value) { return f2(f1(value)); }; };
/**
 * monadใฏไปฅไธ๏ผ็น
 * 1.ใใผใฟใฎๆง้?
 * 2.้ขไฟใใ้ขๆฐใฎๅก
 * 3.้ขๆฐใใฉใฎใใใซๅฆ็ใใใใใ็คบใใใฎ
 * monadใงใฏใใใผใฟใปใฟใคใใฏไปฅไธ2็นใๆใค
 * return ใกใฝใใใbindใกใฝใใ
 * return ใกใฝใใ๏ผnomarlใใชใฅใผใใขใใใใชใฅใผใซๅคๆดใใใใฎ
 * bindใขใใ้ขๆฐใใใงใคใณใใใใใฎใกใฝใใ
 */
/**
 * 9็ซ?ใฎ็ตๆใฎboolๅคใงใฎๅใๆฟใ
 */
var pipe = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (value) {
        return fns.reduce(function (acc, fn) { return fn(acc); }, value);
    };
};
var double = function (x) { return x * 3; };
var square2 = function (x) { return x * x; };
var checkNumber = function (num) {
    if (num === 4) {
        return num;
    }
    return 1;
};
// #9ใใ่ชญใใใจ
exports.default = router;
