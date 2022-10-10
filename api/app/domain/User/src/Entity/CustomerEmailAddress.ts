type VerifiedAddress = {
    email: string,
    verified: boolean
}

// verifiedはつねにfalse
type UnVerifiedAddress = {
    email: string,
    verified: boolean
}

type CustomerEmailAddress = VerifiedAddress | UnVerifiedAddress

export const createCustomerEmailAddress = (email: string):CustomerEmailAddress => {
    return {
        email: email,
        verified: false
    }
}

export const createVerifiedCustomerEmailAddress = (customerEmailAddress: UnVerifiedAddress): VerifiedAddress => {
    if (customerEmailAddress.verified === true) {
        // エラーを投げる
    }

    return {
        email: customerEmailAddress.email,
        verified: true
    }
}
