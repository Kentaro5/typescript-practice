export type Either2<L, A> = Left2<L, A> | Right2<L, A>

type Left2<L, A> = {
    value: L,
    isLeft: true,
    isRight: false,
}

type Right2<L, A> = {
    value: A,
    isLeft: false,
    isRight: true,
}

export const createLeft2 = <L, A>(wrongData: L): Left2<L, A> => {
    return {
        value: wrongData,
        isLeft: true,
        isRight: false,
    }
}

export const createRight2 = <L, A>(correctData: A): Right2<L, A> => {
    return {
        value: correctData,
        isLeft: false,
        isRight: true,
    }
}
