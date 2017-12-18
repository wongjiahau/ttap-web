const isEqual = require("lodash.isequal");
import {
    FindClashes
} from "../../clashFinder/findClashes";
import {
    RawSlot
} from "../../model/rawSlot";
import {
    ParseSlotToSubject
} from "../../parser/parseSlotToSubject";
import {
    IMasterState,
    MasterStateAction
} from "../reducers/masterState";
import {
    NewSubjectListState
} from "../reducers/subjectListState";

export class NotifyDataLoaded extends MasterStateAction {
    public constructor(private rawSlots: RawSlot[]) {
        super();
    }
    public TypeName(): string {
        return "notify data loaded";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        const subjects = ParseSlotToSubject(this.rawSlots);
        FindClashes(subjects);
        return {
            ...state,
            TimetableCreatorState: {
                ...state.TimetableCreatorState,
                IsSlotLoaded: true,
            },
            SubjectListState: {
                ...NewSubjectListState(subjects),
                IsOpen: true
            }
        };
    }
}
