import { isEqual } from "lodash";
import { FindClashes } from "../../clashFinder/findClashes";
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
        const subjects = ParseSlotToSubject(this.rawSlots);
        FindClashes(subjects);
        return {
            ...state,
            IsSlotLoaded: true,
            SubjectListState: new SubjectListState(subjects)
        };
    }
}
