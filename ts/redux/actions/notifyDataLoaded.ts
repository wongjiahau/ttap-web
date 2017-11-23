import { isEqual } from "lodash";
import { RawSlot } from "../../model/rawSlot";
import { ParseSlotToSubject } from "../../parser/parseSlotToSubject";
import { SubjectListState } from "../reducers/subjectListState";
import { TimetableCreatorState, TimetableCreatorStateAction } from "../reducers/timetableCreatorState";
import { ITimetableCreatorState } from "./../reducers/timetableCreatorState";

export class NotifyDataLoaded extends TimetableCreatorStateAction {
    public constructor(private rawSlots: RawSlot[]) {
        super();
    }
    public TypeName(): string {
        return "notify data loaded";
    }
    protected GenerateNewState(state: ITimetableCreatorState):  ITimetableCreatorState {
        return {
            ...state,
            IsSlotLoaded: true,
            SubjectListState: new SubjectListState(ParseSlotToSubject(this.rawSlots))
        };
    }
}
