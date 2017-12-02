import {
    clone,
    remove
} from "lodash";
import { RawSlot } from "../../model/rawSlot";
import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";

export class ReformTimetablesBasedOnSpecificSlot extends MasterStateAction {
    public constructor(private slotId: number, private checked: boolean) {
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
        } else  {
            filtrateTimetables = filtrateTimetables.concat(
                remove(residueTimetables, (timetable) => {
                    return timetable.HashIds.some((x) => x === this.slotId);
                }));
        }
        const slotIdsOfRelatedSlots = RawSlot.GetRelated(this.slotId);
        const slotStates = clone(state.SlotTableState.SlotStates);
        slotIdsOfRelatedSlots.forEach((id) => {
             slotStates[id] = !this.checked;
        });
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                FiltrateTimetables: filtrateTimetables,
                ResidueTimetables: residueTimetables
            },
            SlotTableState: {
                ...state.SlotTableState,
                SlotStates: slotStates
            }
        };
    }
}
