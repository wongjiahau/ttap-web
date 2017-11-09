import {
    expect
} from "chai";
import {
    isEqual
} from "lodash";
import {
    Partitionize
} from "../partitionize";
import {
    IPartitionable, PartitionizeByKey
} from "./../partitionize";

describe("Partitionize", () => {
    it("case 1", () => {
        const item1: IPartitionable = {
            PartitionKey: 1
        };
        const item2: IPartitionable = {
            PartitionKey: 1
        };
        const input = [item1, item2];
        const actual = Partitionize(input);
        const expected = [input.slice()];
        // console.log(actual);
        // console.log(expected);
        expect(actual.length).to.eq(expected.length);
        expect(isEqual(expected, actual)).to.eq(true);
    });

    it("case 2", () => {
        const item1: IPartitionable = {
            PartitionKey: 1
        };
        const item2: IPartitionable = {
            PartitionKey: 2
        };
        const input = [item1, item2];
        const actual = Partitionize(input);
        const expected = [
            [input[0]],
            [input[1]]
        ];
        expect(actual.length).to.eq(expected.length);
        expect(isEqual(expected, actual)).to.eq(true);
    });

    it("case 3", () => {
        const item1: IPartitionable = {
            PartitionKey: 1
        };
        const item2: IPartitionable = {
            PartitionKey: 2
        };
        const item3: IPartitionable = {
            PartitionKey: 3
        };
        const input = [item1, item2, item3];
        const actual = Partitionize(input);
        const expected = [
            [input[0]],
            [input[1]],
            [input[2]]
        ];
        expect(actual.length).to.eq(expected.length);
        expect(isEqual(expected, actual)).to.eq(true);
    });

    it("case 4", () => {
        const item1: IPartitionable = {
            PartitionKey: 1
        };
        const item2: IPartitionable = {
            PartitionKey: 2
        };
        const item3: IPartitionable = {
            PartitionKey: 3
        };
        const item4: IPartitionable = {
            PartitionKey: 3
        };
        const input = [item1, item2, item3, item4];
        const actual = Partitionize(input);
        const expected = [
            [input[0]],
            [input[1]],
            [input[2], input[3]]
        ];
        expect(actual.length).to.eq(expected.length);
        expect(isEqual(expected, actual)).to.eq(true);
    });

    it("case 5", () => {
        const item1 : IPartitionable = {
            PartitionKey: 1
        };
        const item2 : IPartitionable = {
            PartitionKey: 2
        };
        const item3 : IPartitionable = {
            PartitionKey: 3
        };
        const item4 : IPartitionable = {
            PartitionKey: 3
        };
        const item5 : IPartitionable = {
            PartitionKey: 2
        };
        const input = [item1, item2, item3, item4, item5];
        const actual = Partitionize(input);
        const expected = [
            [input[0]],
            [input[1], input[4]],
            [input[2], input[3]]
        ];
        expect(actual.length).to.eq(expected.length);
        expect(isEqual(expected, actual)).to.eq(true);

    });

    it("case 6", () => {
        const item1: IPartitionable = {
            PartitionKey: 1
        };
        const item2: IPartitionable = {
            PartitionKey: 2
       };
        const item3: IPartitionable = {
            PartitionKey: 1
       };
        const item4: IPartitionable = {
            PartitionKey: 2
       };
        const item5: IPartitionable = {
            PartitionKey: 1
       };
        const item6: IPartitionable = {
            PartitionKey: 2
        };
        const input = [item1, item2, item3, item4, item5, item6];
        const actual = Partitionize(input);
        const expected = [
            [input[0], input[2], input[4]],
            [input[1], input[3], input[5]],
        ];
        expect(actual.length).to.eq(expected.length);
        expect(isEqual(expected, actual)).to.eq(true);
    });

});

describe("PartitionizeByKey", () => {
    it("case 1" , () => {
        const a = {
            customKey : "koko"
        };
        const b = {
            customKey : "koko"
        };
        const c = {
            customKey : "jojo"
        };

        const result = PartitionizeByKey([a, b, c], "customKey");
        expect(result.length).to.eq(2);
        expect(result[0].length).to.eq(1);
        expect(result[1].length).to.eq(2);
    });
    
});
