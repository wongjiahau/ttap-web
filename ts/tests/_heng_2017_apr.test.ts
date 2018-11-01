import { expect } from "chai";
import { ParseRawSlotToSubject} from "../parser/parseRawSlotToSubject";
import {GetInitial} from "../util/getInitial";
import { HENG_2017_APR, IndexOf } from "./testData/heng_2017_apr";

describe("heng_2017_apr", () => {
    describe("IndexOf", () => {
        it("case 1", () => {
            const rawSlots = HENG_2017_APR();
            const subjects = ParseRawSlotToSubject(rawSlots);
            const subjectNameInitials = subjects.map((x) => GetInitial(x.Name));
            const indexDic: {[key: string]: string|number} = {};
            subjectNameInitials.forEach((name, index) => {
                indexDic[name] = index;
                indexDic[index] = name;
            });
            expect(indexDic).to.deep.eq(IndexOf);
        });
    });

});
