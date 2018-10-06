import { CreateSlotFromRaw } from "../../model/slot";
import { ISlotViewModel } from "../../model/slotViewModel";
import { GotIntersection } from "../../permutator/state";
import { TinySlot } from "../../permutator/tinySlot";
import {IMasterState, MasterStateAction} from "./../reducers/masterState";

export class ShowAlternateSlot extends MasterStateAction {
    public constructor(private slot : ISlotViewModel) {
        super();
    }
    public TypeName() : string {return "show alternate slot"; }
    protected GenerateNewState(state : IMasterState) : IMasterState {
        const slots = state.DataState.RawSlotDataRouter.GetCurrentData().GetAll();
        const currentTimetable = state.TimetableListState.FiltrateTimetables[state.TimetableListState.CurrentIndex];
        const alternateSlots = slots
            .filter((x) => {
                return x.SubjectCode === this.slot.SubjectCode
                    && x.Type === this.slot.Type;
            })
            .filter((x) => {
                return !GotIntersection(
                    currentTimetable.State,
                    new TinySlot(CreateSlotFromRaw(x)).State
                );
            });

        const result = [...state.TimetableListState.FiltrateTimetables];
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                AlternateSlots: alternateSlots
            }
        };
    }
}
