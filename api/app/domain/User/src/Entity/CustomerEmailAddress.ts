import {
    createLeft2,
    createRight2,
    Either2,
} from '../../../Common/EitherResult2'

type VerifiedAddress = {
    email: string
    verified: true
}

// verifiedはつねにfalse
type UnVerifiedAddress = {
    email: string
    verified: false
}

type CustomerEmailAddress = Either2<UnVerifiedAddress, VerifiedAddress>

export const createCustomerEmailAddress = (
    email: string
): CustomerEmailAddress => {
    const invaild = false
    if (invaild) {
        return createLeft2<UnVerifiedAddress, VerifiedAddress>({
            email: email,
            verified: false,
        })
    }

    return createRight2<UnVerifiedAddress, VerifiedAddress>({
        email: email,
        verified: true,
    })
}

export const createVerifiedCustomerEmailAddress = (
    customerEmailAddress: UnVerifiedAddress
): VerifiedAddress => {
    return {
        email: customerEmailAddress.email,
        verified: true,
    }
}
