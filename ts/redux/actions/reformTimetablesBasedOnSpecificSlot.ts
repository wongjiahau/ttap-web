import {
    clone,
    find,
    remove
} from "lodash";
import {
    RawSlot
} from "../../model/rawSlot";
import {
    Subject
} from "../../model/subject";
import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";
import {
    Ternary
} from "./toggleSubjectSelection";

export class ReformTimetablesBasedOnSpecificSlot extends MasterStateAction {
    public constructor(private slotId: number, private checked: boolean, private subjectCode: string) {
        super();
    }
    public TypeName(): string {
        return this.checked ?
            `removing timetables that contain slot (${this.slotId})` :
            `adding back timetables that contain slot (${this.slotId})`;

    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        let filtrateTimetables = clone(state.TimetableListState.FiltrateTimetables);
        let residueTimetables = clone(state.TimetableListState.ResidueTimetables);
        if (this.checked) {
            residueTimetables = residueTimetables.concat(
                remove(filtrateTimetables, (timetable) => {
                    return timetable.HashIds.some((x) => x === this.slotId);
                }));
        } else {
            filtrateTimetables = filtrateTimetables.concat(
                remove(residueTimetables, (timetable) => {
                    return timetable.HashIds.some((x) => x === this.slotId);
                }));
        }

        const slotIdsOfRelatedSlots = RawSlot.GetRelated(this.slotId);
        const newSlotStates = clone(state.SlotTableState.SlotStates);
        slotIdsOfRelatedSlots.forEach((id) => {
            newSlotStates[id] = !this.checked;
        });

        const targetSubject = find(state.SubjectListState.Subjects, {
            Code: this.subjectCode
        });
        const newStateOfTargetSubject = GetNewStateOfTargetSubject(targetSubject, newSlotStates);
        const newSubjectStates = clone(state.SlotTableState.SubjectStates);
        newSubjectStates[this.subjectCode] = newStateOfTargetSubject;
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                FiltrateTimetables: filtrateTimetables,
                ResidueTimetables: residueTimetables
            },
            SlotTableState: {
                ...state.SlotTableState,
                SlotStates: newSlotStates,
                SubjectStates: newSubjectStates
            }
        };
    }
}

function GetNewStateOfTargetSubject(subject: Subject, newSlotStates: boolean[]): Ternary {
    let someSlotIsSelected = false;
    let someSlotIsNotSelected = false;
    subject.SlotIds.forEach((id) => {
        if (newSlotStates[id] === true) {
            someSlotIsSelected = true;
        } else {
            someSlotIsNotSelected = true;
        }
    });
    if (someSlotIsSelected && someSlotIsNotSelected) {
        return "intermediate";
    }
    if (someSlotIsSelected) {
        return "true";
    }
    if (someSlotIsNotSelected) {
        return "false";
    }

}
