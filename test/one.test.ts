import { one } from '../index'

describe('one', () => {
    it('wrap async generator function', () => {
        let f = one(async function* () { })
        expect(typeof f).toBe('function')
    })

    it('instance is async interator', () => {
        let i = one(async function* () { })()
        expect(typeof i.next).toBe('function')
        expect(typeof i.return).toBe('function')
        expect(typeof i.throw).toBe('function')
        expect(i.next()).toBeInstanceOf(Promise)
    })

    it('instance is promise like', () => {
        let i = one(async function* () { })()
        expect(typeof i.then).toBe('function')
    })

    it('take the first yield value', async () => {
        let f = one(async function* () {
            yield 1
            yield 2
        })

        let v = await f()

        expect(v).toBe(1)
    })

    it('pass args into async generator function', async () => {
        let f = one(async function* (v) {
            yield v
            yield 2
        })

        let v = await f(42)

        expect(v).toBe(42)
    })
})
