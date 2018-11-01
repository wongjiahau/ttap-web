const sortBy = require("lodash.sortby");
const uniqBy = require("lodash.uniqby");
import {ISlotViewModel} from "../../model/slotViewModel";
import {ChosenColors, Colors} from "./colors";
import { Subject } from "../../model/subject";
import { SubjectSchema } from "../../model/subjectSchema";

export function GenerateColorScheme(slots : ISlotViewModel[]) : IColorScheme[] {
    const result = new Array < IColorScheme > ();
    const subjectCodes: string[] = uniqBy(slots, (s: SubjectSchema) => s.SubjectCode).map((s: SubjectSchema) => s.SubjectCode);
    sortBy(subjectCodes).forEach((s: string, index: number) => {
        result.push({Color: ChosenColors[index % ChosenColors.length], SubjectCode: s});
    });
    return result;
}

export interface IColorScheme {
    Color : Colors;
    SubjectCode : string;
}
