import {expect} from "chai";
import {Time} from "./time";

describe("time", () => { 
    it("Test_Time_Equality_1", () => {
        // arrange
        var input1 = Time.CreateTime24Hour(10, 10);
        var input2 = Time.CreateTime24Hour(10, 10);
        expect(input1.Equal(input2)).to.equal(true);       
    });
});
