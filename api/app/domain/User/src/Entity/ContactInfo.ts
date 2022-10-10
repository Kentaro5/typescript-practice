type EmailContactInfo = {
    email: string
    address: null
}

type AddressContactInfo = {
    email: null
    address: string
}

type EmailAndAddressInfo = {
    email: string
    address: string
}

type InputContact = {
    email: string | null,
    address: string | null,
}

type ContactError = {
    errorMsg: string
}

type ContactInfo = EmailContactInfo | AddressContactInfo | EmailAndAddressInfo | ContactError

export const createContactInfo = (info: InputContact):ContactInfo => {
    if (info.email != null && info.address === null) {
        return {
            'email': info.email,
            'address': null
        }
    }

    if (info.email == null && info.address != null) {
        return {
            'email': null,
            'address': info.address
        }
    }

    if (info.email != null && info.address != null) {
        return {
            'email': info.email,
            'address': info.address
        }
    }

    return {
        errorMsg: '不正です。'
    }
}
