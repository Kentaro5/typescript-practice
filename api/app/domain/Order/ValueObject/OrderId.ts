import { textCount } from '../../../utils/textCount'

/**
 * Example of a Value Object implementation in TypeScript
 * with use of nominal (opaque) types
 */
export type OrderId = {
    value: string
}

export type UnvalidatedOrderId = {
    value: string
}

type InputOrderId = string

type Ok = {
    result: 'ok'
    data: UnvalidatedOrderId
}

type Err = {
    result: 'err'
    data: {
        value: string
    }
}

type Result<Ok, Err> = Ok | Err

type ValidateOrderId = (orderId: InputOrderId) => Result<Ok, Err>

export const validateOrderId = (
    inputOrderId: InputOrderId
): Result<Ok, Err> => {
    if (!inputOrderId) {
        return {
            result: 'err',
            data: { value: 'inputOrderIdがセットされていません。' },
        }
    }

    if (textCount(inputOrderId) < 50) {
        return {
            result: 'err',
            data: { value: 'inputOrderIdは50文字以内ではありません。' },
        }
    }

    return {
        result: 'ok',
        data: { value: inputOrderId },
    }
}

export const createOrderId = (validatorResult: Result<Ok, Err>): OrderId => {
    const { result, data } = validatorResult
    if (result === 'err') {
        throw new Error(data.value)
    }

    return {
        value: data.value,
    }
}

/**
 * 結局適切にpipeに型定義する方法がまだわからなかった。。。
 * @param x
 */
export const toOrderId = (x: string): OrderId => {
    const pipe = (...fns: Array<any>) => (x: string) =>
        fns.reduce<any>((y, f) => f(y), x)

    return pipe(validateOrderId, createOrderId)(x)
}
