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
            'ðð¢â'.split('').length,
            Array.from('ðð¢â').length,
            result,
            output_final,
        ])
    )
    next()
})

/**
 * addTwoFunction = (intNumber) => {return intNumber + 2 }
 * addThreeFunction = (intNumber) => {return intNumber + 3 }
 * ä¸è¨ãï¼ã¤ã®ã¡ã½ããã«ãããã®
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
 * ã«ãªã¼åé¢æ°ã®ä¾
 * @param greetingFormat
 */
const curriedGreetingFunction = (greetingFormat: string) => (
    word: string
): string => {
    return greetingFormat + ' ' + word
}

/**
 * total functionã®ä¾1
 * è¿ãå¤ãNumberä»¥å¤ã®ãã®ãè¿ããªãããã«ããããã®å·¥å¤«ã®ä¾
 */
type NonDividedZeroInteger = number // å¼æ°ãä½ãã§æ¸¡ãã¨ãã¯ãå²ã£ã¦ã0ã«ãªããªããã®ãåã¨ãã¦å®ç¾©

const dividedBy12 = (argNumber: NonDividedZeroInteger): number => {
    return argNumber / 12
}

/**
 * total functionã®ä¾2
 * å¼æ°ãä¸æ­£ã®ãã®ã®å ´åã0ã§å²ãç®ãè¡ããªã©ããã®å ´åã¯ãnullãè¿ããã¨ãæç¤ºçã«æå®ã
 */

const dividedBy12Part2 = (argNumber: number): number | null => {
    return argNumber / 12
}

/**
 * function compositonã®ä¾
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
 * ä¸è¨ï¼ã¤ããã¤ãããã
 * @param f1
 * @param f2
 */
const compose = (f1: (num: number) => number, f2: (num: number) => number) => (
    value: number
) => f2(f1(value))

/**
 * monadã¯ä»¥ä¸ï¼ç¹
 * 1.ãã¼ã¿ã®æ§é 
 * 2.é¢ä¿ããé¢æ°ã®å¡
 * 3.é¢æ°ãã©ã®ããã«å¦çãããããç¤ºããã®
 * monadã§ã¯ããã¼ã¿ã»ã¿ã¤ãã¯ä»¥ä¸2ç¹ãæã¤
 * return ã¡ã½ãããbindã¡ã½ãã
 * return ã¡ã½ããï¼nomarlããªã¥ã¼ãã¢ããããªã¥ã¼ã«å¤æ´ãããã®
 * bindã¢ããé¢æ°ããã§ã¤ã³ããããã®ã¡ã½ãã
 */

/**
 * 9ç« ã®çµæã®boolå¤ã§ã®åãæ¿ã
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

// #9ããèª­ããã¨
export default router
