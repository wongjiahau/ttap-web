import { IStringDicionary } from "../../interfaces/dictionary";
import { DiffReport } from "../../model/subjectSchema";
import { Ternary } from "../actions/toggleSubjectSelection";

export interface ISlotsTableState {
    ErrorMessages: DiffReport[];
    IsOpen:        boolean;
    SlotStates:    IStringDicionary<boolean>; // whether a slot is selected or not
    SubjectStates: IStringDicionary<Ternary>; // whether all slots of a subject is selected or not
}

export function NewSlotsTableState() : ISlotsTableState {
    return {
        IsOpen:        false,
        SlotStates:    {},
        SubjectStates: {},
        ErrorMessages: null
    };
}
