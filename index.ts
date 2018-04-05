import './Symbol.asyncIterator'

export const one = <T, P1, P2, P3, P4, P5>(
    asyncGen: (p1?: P1, p2?: P2, p3?: P3, p4?: P4, p5?: P5, ...rest) => AsyncIterableIterator<T>
) => (p1?: P1, p2?: P2, p3?: P3, p4?: P4, p5?: P5, ...rest) => {
    const iter = asyncGen(p1, p2, p3, p4, p5, ...rest)

    return {
        ...iter,
        then(onfulfilled?: (value: T) => any, onrejected?) {
            return iter.next().then(result => onfulfilled(result.value), onrejected)
        },
    }
}

export const all = <T, P1, P2, P3, P4, P5>(
    asyncGen: (p1?: P1, p2?: P2, p3?: P3, p4?: P4, p5?: P5, ...rest) => AsyncIterableIterator<T>
) => (p1?: P1, p2?: P2, p3?: P3, p4?: P4, p5?: P5, ...rest) => {
    const iter = asyncGen(p1, p2, p3, p4, p5, ...rest)

    return {
        ...iter,
        async then(onfulfilled?: (value: T[]) => any, onrejected?) {
            try {
                const list = []
                for await (const result of iter) {
                    list.push(result)
                }
                onfulfilled(list)
            } catch (err) {
                if (onrejected) onrejected(err)
            }
        },
    }
}
