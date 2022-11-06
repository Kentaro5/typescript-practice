import Express from 'express'
import {
    createCustomerEmailAddress,
    createVerifiedCustomerEmailAddress,
} from '../domain/User/src/Entity/CustomerEmailAddress'

import {
    createOrderId,
    OrderId,
    toOrderId,
} from '../domain/Order/ValueObject/OrderId'

const router = Express.Router()

router.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')

    const customerEmailAddress = createCustomerEmailAddress('test@example.com')

    const addTwoFunction = addFunctionGenerator(2)
    const addThreeFunction = addFunctionGenerator(3)

    const helloFunc = curriedGreetingFunction('Hello')
    //const add1ThenSquare = compose( add1, square)

    const array = [1]
    const result = array.reduce((prev, current) => prev + current, 0)
    //const pipe = (...fns:Array<(num:number) => number>) => (x:number) => fns.reduce((y, f) => f(y), x);

    // function pipe
    const output_final: number = pipe(square, checkNumber, double)(2)
    const orderId = toOrderId('orderId')
    res.end(
        JSON.stringify([
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
        ])
    )
    next()
})

/**
 * addTwoFunction = (intNumber) => {return intNumber + 2 }
 * addThreeFunction = (intNumber) => {return intNumber + 3 }
 * 上記を１つのメソッドにしたもの
 * @param numberToAdd
 */
const addFunctionGenerator = (
    numberToAdd: number
): ((num: number) => number) => {
    return (intNumber: number): number => {
        return numberToAdd + intNumber
    }
}

/**
 * カリー化関数の例
 * @param greetingFormat
 */
const curriedGreetingFunction = (greetingFormat: string) => (
    word: string
): string => {
    return greetingFormat + ' ' + word
}

/**
 * total functionの例1
 * 返り値がNumber以外のものを返さないようにするための工夫の例
 */
type NonDividedZeroInteger = number // 引数か何かで渡すときは、割っても0にならないものを型として定義

const dividedBy12 = (argNumber: NonDividedZeroInteger): number => {
    return argNumber / 12
}

/**
 * total functionの例2
 * 引数が不正のものの場合、0で割り算を行うなど。その場合は、nullを返すことを明示的に指定。
 */

const dividedBy12Part2 = (argNumber: number): number | null => {
    return argNumber / 12
}

/**
 * function compositonの例
 * https://www.freecodecamp.org/news/function-composition-in-javascript/
 * https://qiita.com/Nossa/items/a8b9e013eb0467321c1e
 */
const add1 = (num: number): number => {
    return num + 1
}

const square = (num: number): number => {
    return num * num
}

/**
 * 上記２つをパイプする。
 * @param f1
 * @param f2
 */
const compose = (f1: (num: number) => number, f2: (num: number) => number) => (
    value: number
) => f2(f1(value))

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
const pipe = <T>(...fns: Array<(arg: T) => T>) => (value: T) =>
    fns.reduce((acc, fn) => fn(acc), value)
const double = (x: number): number => x * 3
const square2 = (x: number): number => x * x
const checkNumber = (num: number): number => {
    if (num === 4) {
        return num
    }

    return 1
}

// #9から読むこと
export default router
