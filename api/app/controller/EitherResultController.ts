import Express from 'express'
import { createCustomerEmailAddress } from '../domain/User/src/Entity/CustomerEmailAddress'
import {Either2} from "../domain/Common/EitherResult2";

const router = Express.Router()

router.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    const customerEmailAddress = createCustomerEmailAddress('test@example.com')

    const ClassContainerT = new ClassContainer<number>(1)
    const getNumber = (value: number): number => value
    const toString = (value: number): string => String(value)
    const stringToNumber = (value: string): number => Number(value)
    const addTwoNumbers = (x: number) => (y: number):number => x + y // (x: Number) => (y: Number) => Number

    const ClassContainerU = ClassContainerT.fmap<string>(toString)
    const ClassContainerE = ClassContainerU.fmap(stringToNumber).ap<number>(new ClassContainer<(y: number) => number>(addTwoNumbers(2)))

    const ClassContainerI = new ClassContainer<number>(1)

    const ClassContainerF = new ClassContainer<number>(0)
    const ClassContainerG = ClassContainerF.fmap(addTwoNumbers(2)).ap(new ClassContainer<(y: number) => number>(addTwoNumbers(3)));

    const ClassContainerH = new ClassContainer<number>(0).ap(new ClassContainer<(y: number) => number>(addTwoNumbers(3)));

    const ClassContainerL = new ClassContainer<(x: number) => (y: number) => number>(addTwoNumbers)

    const ClassContainerM = new ClassContainer(addTwoNumbers(2))


    const FunctionalContainerT:FunctionalContainer<number> = of(1)
    const FunctionalContainerU:FunctionalContainer<string> =  fmap(toString)(FunctionalContainerT)
const tst = new ClassContainer<(y: number) => number>(addTwoNumbers(2))
// output => { value: 5 }
// console.log(ap(
//     of(
//         add(2)
//     )
// ));
//     console.log( (new ClassContainer<number>(1)));
//     console.log((
//         of(5)
//     ));



// output => Array[0] = 1
    const getNumbe2 = (value: number): number => value + 2
    res.end(JSON.stringify([
        customerEmailAddress.isLeft,
        customerEmailAddress.isRight,
        ClassContainerT,
        ClassContainerU,
        FunctionalContainerT,
        FunctionalContainerU,
        ClassContainerE,
        ap(of(add(2)))(of(3)),
        ap(fmap(add)(of(2)))(of(3)),
        ClassContainerG,
        ClassContainerH,
        () => {return 1},
        (
            of(5)
        ),
        (new ClassContainer<number>(1)),
        ap(
            of(
                add(2)
            )
        ),
        ClassContainerF.fmap(addTwoNumbers(2))
    ]))
    next()
})

class ClassContainer<T> {
    constructor(private value: T) {}

    fmap<U>(f:(t: T) => U):ClassContainer<U> {
        return new ClassContainer<U>(f(this.value))
    }
    ap<U>(f: ClassContainer<(t: T) => U>): ClassContainer<U> {
        return f.fmap(func => func(this.value))
    }
}

type FunctionalContainer<T> = {
    value: T
}

type Of = <T>(value: T) => FunctionalContainer<T>
type MapFunctionalContainer = <T, U>(f: (t: T)=> U ) => (fa: FunctionalContainer<T>) => FunctionalContainer<U>
type Ap = <T, U>(f: FunctionalContainer<(t: T)=> U> ) => (fa: FunctionalContainer<T>) => FunctionalContainer<U>

const of: Of = <T>(value:T) => ({ value })
const fmap: MapFunctionalContainer = <T, U>(f: (t: T)=> U ) => (fa: FunctionalContainer<T>) => of(f( fa.value))
const toString = (value: number): string => String(value)
const ap: Ap = ({ value: f }) => ({ value}) => of(f(value))
const add = (x: number) => (y: number) => (x + y)

const result6 = ap(
    of(
        add(2)
    )
)

const result7 = ap(
    fmap(add)
    (
        of(2)
    )
)

console.log(result6(of(4)));
console.log(result7(of(5)));

/* Either Class */
class RightClass<L, A> {
    constructor(
        private value: A
    ) {}

    isLeft():boolean {
        return false
    }

    isRight(): boolean {
        console.log(this.value);
        return true
    }

    fmap<U>(f:(t: A) => U):RightClass<A, U> {
        return new RightClass<A, U>(f(this.value))
    }

    getValue() {
        return this.value
    }
}

export const createRight = <L, A>(value: A):RightClass<L, A> => {
    return new RightClass(value)
}

class LeftClass<L, A> {
    constructor(
        private readonly value: L
    ) {}

    isLeft():boolean {
        return true
    }

    isRight(): boolean {
        return false
    }

    fmap<U>(f:(t: L) => U):LeftClass<U, L> {
        return new LeftClass<U, L>(f(this.value))
    }

    getValue() {
        return this.value
    }
}

export const createLeft = <L, A>(value: L):LeftClass<L, A> => {
    return new LeftClass(value)
}

type EitherClass<L, A> = LeftClass<L, A> | RightClass<L, A>

const exec = (onLeft: (value: string) => string, onRight: (value: string) => string) => (either: EitherClass<string, string>): string => {
    if (either.isLeft()) {
        return onLeft(either.getValue())
    }

    return onRight(either.getValue())
}

const isLessThan255 = (stringVal: any) => {
    return stringVal.length < 255
}

const addSanToString = (value: string): string => {
    return value + 'さん'
}

const ValidateUserNameForClass = (userName: string): EitherClass<string, string> => {
    if (!isLessThan255(userName)) {
        return createLeft('ユーザー名は255文字以内にしてください。');
    }

    return createRight(userName)
}

const userEither = ValidateUserNameForClass('User Class Name')
const userEitherNameSan = userEither.fmap(addSanToString)

console.log(userEitherNameSan);
console.log(exec((str)=> `Error2: ${str}`, (value)=> value)(userEitherNameSan));



/* Either Function */

type Right<T> = {
    type: "right"
    value: T
}

type Left<T> = {
    type: "left"
    value: T
}

type Either<L, R> = Left<L> | Right<R>

type OfRight = <T>(value: T) => Right<T>

type OfLeft = <T>(value: T) => Left<T>

type MapEither = <L, R, U>(f: (a: R) => U) => (m: Either<L, R>) => Either<L, U>

//type FlattenEither = <L, R>(m: Either<L, Either<L, R>>) => Either<L, R>

type FlatMapEither = <L, R, U>(f: (a: R) => Either<L, U>) => (m: Either<L, R>) => Either<L, U>

type TryCatch = <L, R>(f: ()=> R, onError: (e: unknown) => L) => Either<L, R>

type MatchEither = <L, R, A>(onLeft: (err: L) => A, onRight: (r: R) => A) => (ma: Either<L, R>) => A

const isLeft = <L, R>(m: Either<L, R>): m is Left<L> => m.type === "left"
const ofRight: OfRight = (value) => ({ type: "right", value})
const ofLeft: OfLeft = (value) => ({ type: "left", value })
const mapEither: MapEither = (f) => (m) => isLeft(m) ? ofLeft(m.value) : ofRight(f(m.value))
//const flattenEither: FlattenEither = (m) => isLeft(m) ? ofLeft(m.value) : m.value
const flatMapEither: FlatMapEither = (f) => (m) => isLeft(m) ? ofLeft(m.value) : f(m.value)

const validateUserName = (userName: string): Either<string, string> => {
    if (!isLessThan255(userName)) {
        return ofLeft('ユーザー名は255文字以内にしてください。')
    }

    return ofRight(userName)
}

const match: MatchEither = (onLeft, onRight) => (m) => isLeft(m) ? onLeft(m.value) : onRight(m.value);
const getValue = match((str: string)=> `Error: ${str}`, (value: string)=> value)
const result = flatMapEither(validateUserName)(ofRight('User Name'))
console.log(getValue(result));
const result2 = mapEither<string, string, string>(addSanToString)(result)
console.log(getValue(result2));

const tryCatch: TryCatch = (f, onError) => {
    try {
        return ofRight(f())
    } catch (e) {
        return ofLeft(onError(e))
    }
}
// 動作例
type Head = <T>(arr: ReadonlyArray<T>) => T
const head: Head = (arr) => {
    if (arr.length > 0) {
        return arr[0]
    } else {
        throw new Error('empty array')
    }
}



const toMessage = match((str: string)=> `Error: ${str}`, (n: number)=> `Array[0] = ${n}`)



console.log(toMessage(tryCatch(()=> head([]), (e)=> e instanceof Error ? e.message : "unknown error")))
// output => Error: empty array

console.log(toMessage(tryCatch(()=> head([1, 2, 3]), (e)=> e instanceof Error ? e.message : "unknown error")))

// #9から読むこと
export default router
