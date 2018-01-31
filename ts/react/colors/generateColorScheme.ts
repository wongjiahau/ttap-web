const sortBy = require("lodash.sortby");
const uniqBy = require("lodash.uniqby");
import {ISlotState} from "../../model/generalizedSlot";
import {ChosenColors, Colors} from "./colors";

export function GenerateColorScheme(slots : ISlotState[]) : IColorScheme[] {
    const result = new Array < IColorScheme > ();
    const subjectCodes = uniqBy(slots, (s) => s.SubjectCode).map((s) => s.SubjectCode);
    sortBy(subjectCodes).forEach((s, index) => {
        result.push({Color: ChosenColors[index], SubjectCode: s});
    });
    return result;
}

export interface IColorScheme {
    Color : Colors;
    SubjectCode : string;
}
