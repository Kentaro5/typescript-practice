import Express from 'express'
import {
    createCustomerEmailAddress,
    createVerifiedCustomerEmailAddress
} from "../domain/User/src/Entity/CustomerEmailAddress";

import {createOrderId, OrderId} from "../domain/Order/ValueObject/OrderId";

const router = Express.Router()

router.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');

    const customerEmailAddress = createCustomerEmailAddress('test@example.com')

    const addTwoFunction = addFunctionGenerator(2)
    const addThreeFunction = addFunctionGenerator(3)

    const helloFunc = curriedGreetingFunction('Hello')
    const add1ThenSquare = compose( add1, square)
    const orderId = createOrderId('orderId')


    const verifiedCustomerEmailAddress = createVerifiedCustomerEmailAddress(customerEmailAddress)
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
        ]
    ));
    next()
})

/**
 * addTwoFunction = (intNumber) => {return intNumber + 2 }
 * addThreeFunction = (intNumber) => {return intNumber + 3 }
 * 上記を１つのメソッドにしたもの
 * @param numberToAdd
 */
const addFunctionGenerator = (numberToAdd: number): (num: number) => number => {
    return (intNumber: number): number => {
        return numberToAdd + intNumber
    }
}

/**
 * カリー化関数の例
 * @param greetingFormat
 */
const curriedGreetingFunction = (greetingFormat: string) => (word: string) :string  => {
    return greetingFormat + ' ' + word
}

/**
 * total functionの例1
 * 返り値がNumber以外のものを返さないようにするための工夫の例
 */
type NonDividedZeroInteger = number // 引数か何かで渡すときは、割っても0にならないものを型として定義

const dividedBy12 = (argNumber: NonDividedZeroInteger):number => {
    return argNumber / 12
}

/**
 * total functionの例2
 * 引数が不正のものの場合、0で割り算を行うなど。その場合は、nullを返すことを明示的に指定。
 */

const dividedBy12Part2 = (argNumber: number):number | null => {
    return argNumber / 12
}

/**
 * function compositonの例
 * https://www.freecodecamp.org/news/function-composition-in-javascript/
 * https://qiita.com/Nossa/items/a8b9e013eb0467321c1e
 */
const add1 = (num: number):number => {
    return num + 1
}

const square = (num: number):number => {
    return num * num
}

/**
 * 上記２つをパイプする。
 * @param f1
 * @param f2
 */
const compose = (f1:(num:number) => number , f2:(num:number) => number) => (value:number) => f2( f1(value) );


// #9から読むこと
export default router
