import { ID } from "./id"

describe('ID Value Object', () => {
    test('should void to valida ID', () => {
        const number = 1
        const id = new ID(number)
        
        expect(id.id).toBe(1)
        expect(id.validate()).toBe(true)
    })

    test('shoud throw when id is not number', () => {
        const number = "1"
        // @ts-ignore
        expect(() => new ID(number)).toThrow('Invalid ID')
    })
})