import {textCount} from "../../../utils/textCount";

/**
 * Example of a Value Object implementation in TypeScript
 * with use of nominal (opaque) types
 */
export type OrderId = {
    value: string
}

export const createOrderId = (orderId: string):OrderId => {
    if (!orderId) {
        throw new Error('orderIdが空です')
    }

    if (textCount(orderId) > 50) {
        throw new Error('orderIdの文字数は50文字以内です')
    }

    return {
        value: orderId
    }
}
