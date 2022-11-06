export type Ok<T> = {
    result: 'ok'
    status: number
    message: string
    data: T
}

export type Err<T> = {
    result: 'err'
    status: number
    message: string
    data: T | null
}

export type Result<T> = Ok<T> | Err<T>

export const createFail = <T>(
    errorStatus: number,
    errorMessage: string,
    errorData: T
): Result<T> => {
    return {
        result: 'err',
        status: errorStatus,
        message: errorMessage,
        data: errorData,
    }
}

export const createSuccess = <T>(
    successStatus: number,
    successMessage: string,
    successData: T
): Result<T> => {
    return {
        result: 'ok',
        status: successStatus,
        message: successMessage,
        data: successData,
    }
}
// 使用例createSuccess<string>(202, 'successMessage', 'successData')
// https://qiita.com/k-penguin-sato/items/9baa959e8919157afcd4
