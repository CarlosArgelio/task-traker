import { Description } from "./description"

describe('Description Value Object', () => {
    test('should void to valida Description', () => {
        const description = 'description'
        const descriptionValueObject = new Description(description)
        
        expect(descriptionValueObject.description).toBe('description')
        expect(descriptionValueObject.validate()).toBe(true)
    })

    test('should throw when description is not string', () => {
        const description = 1

        // @ts-ignore
        expect(() => new Description(description)).toThrow('Invalid Description')
    })

    test('should throw when description is empty', () => {
        const description = ""

        // @ts-ignore
        expect(() => new Description(description)).toThrow('Invalid Description')
    })
})