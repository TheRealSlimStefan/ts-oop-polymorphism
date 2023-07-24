import { Player } from "."
import { SwordAttack, AxeAttack, FireSpellAttack, IceSpellAttack } from "./Attack"
import { Gloves, Shield } from "./Equipment"

describe("Player tests", () => {
    let player: Player

    beforeEach(() => { // Before each "it" test, start with a new Player instance
        player = new Player()
    })

    it("should reduce the players health on successful sword hits", () => {
        let result

        do {
            result = player.takeHit(new SwordAttack())
        } while (result.includes('missed'))

        expect(player.health).toBeLessThan(52)
        expect(result).toContain('The attack hit')

        const extractedNumbers = result.match(/^\d+|\d+\b|\d+(?=\w)/g) // extract the numbers from the result
        if (extractedNumbers !== null) {
            expect(52 - Number(extractedNumbers[0])).toEqual(Number(extractedNumbers[1]))
        }
    })

    it("should reduce the players health on successful axe hits", () => {
        let result

        do {
            result = player.takeHit(new AxeAttack())
        } while (result.includes('missed'))

        expect(player.health).toBeLessThan(52)
        expect(result).toContain('The attack hit')

        const extractedNumbers = result.match(/^\d+|\d+\b|\d+(?=\w)/g) // extract the numbers from the result
        if (extractedNumbers !== null) {
            expect(52 - Number(extractedNumbers[0])).toEqual(Number(extractedNumbers[1]))
        }
    })

    it("should reduce the players health on successful fire spell hits", () => {
        let result

        do {
            result = player.takeHit(new FireSpellAttack())
        } while (result.includes('missed'))

        expect(player.health).toBeLessThan(52)
        expect(result).toContain('The attack hit')

        const extractedNumbers = result.match(/^\d+|\d+\b|\d+(?=\w)/g) // extract the numbers from the result
        if (extractedNumbers !== null) {
            expect(52 - Number(extractedNumbers[0])).toEqual(Number(extractedNumbers[1]))
        }
    })

    it("should reduce the players health on successful ice spell hits", () => {
        let result

        do {
            result = player.takeHit(new IceSpellAttack())
        } while (result.includes('missed'))

        expect(player.health).toBeLessThan(52)
        expect(result).toContain('The attack hit')

        const extractedNumbers = result.match(/^\d+|\d+\b|\d+(?=\w)/g) // extract the numbers from the result
        if (extractedNumbers !== null) {
            expect(52 - Number(extractedNumbers[0])).toEqual(Number(extractedNumbers[1]))
        }
    })

    it("should reduce the players health on successful not defined attack hits", () => {
        let result

        do {
            result = player.takeHit({name: "banana", minHit: 1, maxHit:5})
        } while (result.includes('missed'))

        expect(player.health).toBeLessThan(52)
        expect(result).toContain('The attack hit')

        const extractedNumbers = result.match(/^\d+|\d+\b|\d+(?=\w)/g) // extract the numbers from the result
        if (extractedNumbers !== null) {
            expect(52 - Number(extractedNumbers[0])).toEqual(Number(extractedNumbers[1]))
        }
    })

    it("should return correct statement when missed", () => {
        let result

        do {
            result = player.takeHit(new AxeAttack())
        } while (!result.includes('missed'))

        expect(result).toContain('attack missed')

    })

    it("should increase armour when shield is added to inventory", () => {
        player.addEquipment(new Shield())
        expect(player.armour).toEqual(18)
    })

    it("should decrease armour when shield is removed from inventory", () => {
        const shield = new Shield();
        
        player.addEquipment(shield)
        player.removeEquipment(shield)

        expect(player.armour).toEqual(14)
    })

    it("should not decrease armour when we pass to function item which is not in inventory", () => {
        const shield = new Shield();
        const gloves = new Gloves();
        
        player.addEquipment(gloves);
        player.removeEquipment(shield)
        
        expect(player.armour).toEqual(16)
    })
})