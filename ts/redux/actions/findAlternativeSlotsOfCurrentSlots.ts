import { ObjectStore } from "../../dataStructure/objectStore";
import { CreateSlotFromRaw } from "../../model/slot";
import { CreateSlotViewModel } from "../../model/slotViewModel";
import { GotIntersection } from "../../permutator/state";
import {MasterStateAction} from "../reducers/masterState";
import { TinySlot } from "./../../permutator/tinySlot";
import {IMasterState} from "./../reducers/masterState";

/**
 * CurrentSlots means the slots that are being displayed at the moment
 */
export class FindAlternativeSlotsOfCurrentSlot extends MasterStateAction {
    public TypeName() : string {return "go to next timetable"; }

    protected GenerateNewState(state : IMasterState) : IMasterState {
        const allSlots = state.DataState.RawSlotDataRouter.GetCurrentData().GetAll();
        const uidsOfFiltratedSlots = new Set<number>(); // filtrated means not being filtered away
        for (let i = 0; i < state.TimetableListState.FiltrateTimetables.length; i++) {
            const t = state.TimetableListState.FiltrateTimetables[i];
            for (let j = 0; j < t.Uids.length; j++) {
                uidsOfFiltratedSlots.add(t.Uids[j]);
            }
        }

        const currentTimetable = state.TimetableListState.FiltrateTimetables[state.TimetableListState.CurrentIndex];

        const currentSlots = state.TimetableListState.SlotViewModelStore.GetAll();
        for (let i = 0; i < currentSlots.length; i++) {
            const s = currentSlots[i];
            s.AlternativeSlots = allSlots
                .filter((x) => {
                    return x.SubjectCode === s.SubjectCode
                        && x.Type === s.Type
                        && uidsOfFiltratedSlots.has(x.Uid)
                        ;
                })
                .filter((x) => {
                    return !GotIntersection(
                        currentTimetable.State,
                        new TinySlot(CreateSlotFromRaw(x)).State
                    );
                })
                .map(CreateSlotViewModel)
                .map((x) => ({...x, IsAlternativeSlot: true}))
                ;
        }

        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                SlotViewModelStore: new ObjectStore(currentSlots)
            }
        };
    }
}
