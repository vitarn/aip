import { all } from '../index'

describe('all', () => {
    it('wrap async generator function', () => {
        let f = all(async function* () { })
        expect(typeof f).toBe('function')
    })

    it('instance is async interator', () => {
        let i = all(async function* () { })()
        expect(typeof i.next).toBe('function')
        expect(typeof i.return).toBe('function')
        expect(typeof i.throw).toBe('function')
        expect(i.next()).toBeInstanceOf(Promise)
    })

    it('instance is promise like', () => {
        let i = all(async function* () { })()
        expect(typeof i.then).toBe('function')
    })

    it('take all yield value', async () => {
        let f = all(async function* () {
            yield 1
            yield 2
        })

        let v = await f()

        expect(v).toEqual([1, 2])
    })

    it('pass args into async generator function', async () => {
        let f = all(async function* (v: number) {
            yield v
            yield 2
        })

        let v = await f(42)

        expect(v).toEqual([42, 2])
    })

    it('catch async generator function error and reject it', async () => {
        let f = all(async function* () {
            throw new Error('mark')
        })

        expect(f()).rejects.toThrow('mark')

        let error: Error

        await f().then(() => { }, err => error = err)

        expect(error.message).toBe('mark')
    })
})
