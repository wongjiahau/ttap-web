const sortBy = require("lodash.sortby");
const uniqBy = require("lodash.uniqby");
import {
    RawSlot
} from "../../model/rawSlot";
import {
    ChosenColors,
    Colors
} from "./colors";

export function GenerateColorScheme(rawSlots: RawSlot[]): IColorScheme[] {
    const result = new Array < IColorScheme > ();
    const subjectCodes = uniqBy(rawSlots, (s) => s.SubjectCode).map((s) => s.SubjectCode);
    sortBy(subjectCodes).forEach((s, index) => {
        result.push({
            Color: ChosenColors[index],
            SubjectCode: s
        });
    });
    return result;
}

export interface IColorScheme {
    Color: Colors;
    SubjectCode: string;
}
