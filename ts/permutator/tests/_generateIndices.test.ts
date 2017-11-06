import {
    expect
} from "chai";
import {
    ISlot
} from "../../model/slot";
import {
    BoundedInt
} from "../boundedInt";
import {
    GenerateIndices
} from "../generateIndices";

describe("GenerateIndices", () => {
    it("case 1", () => {
        const input = [
            [0],
            [0, 0],
            [0, 0, 0]
        ];
        const actual = GenerateIndices(input);
        const expected = [
            new BoundedInt(0, 0),
            new BoundedInt(1, 0),
            new BoundedInt(2, 0)
        ];

        for (let i = 0; i < 3; i++) {
            expect(actual[i].Equals(expected[i])).to.eq(true);
        }
    });

    it("case 2", () => {
        const input = [
            [0, 0, 0],
            [0, 0],
            [0]
        ];
        const actual = GenerateIndices(input);
        const expected = [
            new BoundedInt(2, 0),
            new BoundedInt(1, 0),
            new BoundedInt(0, 0)
        ];

        for (let i = 0; i < 3; i++) {
            expect(actual[i].Equals(expected[i])).to.eq(true);
        }
    });
});
