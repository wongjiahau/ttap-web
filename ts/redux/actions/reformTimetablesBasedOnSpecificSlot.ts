import {
    clone,
    remove
} from "lodash";
import { RawSlot } from "../../model/rawSlot";
import {
    ITimetableCreatorState,
    TimetableCreatorStateAction
} from "./../reducers/timetableCreatorState";

export class ReformTimetablesBasedOnSpecificSlot extends TimetableCreatorStateAction {
    public constructor(private slotId: number, private checked: boolean) {
        super();
    }
    public TypeName(): string {
        return this.checked ?
            `removing timetables that contain slot (${this.slotId})` :
            `adding back timetables that contain slot (${this.slotId})`;

    }
    protected GenerateNewState(state: ITimetableCreatorState): ITimetableCreatorState {
        const cloned = clone(state);
        let filtrateTimetables = cloned.SubjectListState.TimetableListState.FiltrateTimetables;
        let residueTimetables = cloned.SubjectListState.TimetableListState.ResidueTimetables;
        if (this.checked) {
            residueTimetables = residueTimetables.concat(
                remove(filtrateTimetables, (timetable) => {
                    return timetable.HashIds.some((x) => x === this.slotId);
                }));
        } else  {
            filtrateTimetables = filtrateTimetables.concat(
                remove(residueTimetables, (timetable) => {
                    return timetable.HashIds.some((x) => x === this.slotId);
                }));
        }
        cloned.SubjectListState.TimetableListState.FiltrateTimetables = filtrateTimetables;
        cloned.SubjectListState.TimetableListState.ResidueTimetables = residueTimetables;

        const slotIdsOfRelatedSlots = RawSlot.GetRelated(this.slotId);
        slotIdsOfRelatedSlots.forEach((id) => {
            cloned.SubjectListState.SlotStates[id] = !this.checked;
        });

        return cloned;
    }
}
