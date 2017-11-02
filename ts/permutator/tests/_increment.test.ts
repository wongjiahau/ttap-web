import {
    expect
} from "chai";
import {
    Increment
} from "../increment";
import {
    BoundedInt
} from "./../boundedInt";

describe("increment", () => {

    it("case 1", () => {
        const input = [
            new BoundedInt(1, 0),
            new BoundedInt(2, 1),
            new BoundedInt(3, 2)
        ];
        const expected = [
            new BoundedInt(1, 0),
            new BoundedInt(2, 1),
            new BoundedInt(3, 3)
        ];
        const actual = Increment(input);

        for (let i = 0; i < 3; i++) {
            expect(actual[i].Equals(expected[i])).to.eq(true);
        }
    });

    it("case 2", () => {
        const input = [
            new BoundedInt(1, 0),
            new BoundedInt(2, 1),
            new BoundedInt(3, 3)
        ];
        const expected = [
            new BoundedInt(1, 0),
            new BoundedInt(2, 2),
            new BoundedInt(3, 0)
        ];
        const actual = Increment(input);
        for (let i = 0; i < 3; i++) {
            expect(actual[i].Equals(expected[i])).to.eq(true);
        }
    });

    it("case 3", () => {
        const input = [
            new BoundedInt(1, 0),
            new BoundedInt(2, 2),
            new BoundedInt(3, 3)
        ];
        const expected = [
            new BoundedInt(1, 1),
            new BoundedInt(2, 0),
            new BoundedInt(3, 0)
        ];
        const actual = Increment(input);
        for (let i = 0; i < 3; i++) {
            expect(actual[i].Equals(expected[i])).to.eq(true);
        }
    });

    it("case 4", () => {
        const input = [
            new BoundedInt(1, 0),
            new BoundedInt(0, 0),
            new BoundedInt(0, 0),
        ];
        const expected = [
            new BoundedInt(1, 1),
            new BoundedInt(0, 0),
            new BoundedInt(0, 0)
        ];
        const actual = Increment(input);
        for (let i = 0; i < 3; i++) {
            expect(actual[i].Equals(expected[i])).to.eq(true);
        }
    });

    it("should return null when max value has reached", () => {
        const input = [
            new BoundedInt(1, 1)
        ];
        const result = Increment(input);
        expect(result).to.eq(null);
    });

});
