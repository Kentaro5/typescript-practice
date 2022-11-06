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
        '😄💢✋'.split('').length,
        Array.from('😄💢✋').length,
        result,
        output_final,
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
/**
 * monadは以下３点
 * 1.データの構造
 * 2.関係する関数の塊
 * 3.関数がどのように処理されるかを示すもの
 * monadでは、データ・タイプは以下2点を持つ
 * return メソッド、bindメソッド
 * return メソッド＝nomarlバリューをモナドバリューに変更するもの
 * bindモナド関数をチェインするためのメソッド
 */
/**
 * 9章の結果のbool値での切り替え
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
// #9から読むこと
exports.default = router;
