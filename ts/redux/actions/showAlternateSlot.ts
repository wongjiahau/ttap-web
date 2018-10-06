import { CreateSlotFromRaw } from "../../model/slot";
import { ISlotViewModel } from "../../model/slotViewModel";
import { GotIntersection } from "../../permutator/state";
import { TinySlot } from "../../permutator/tinySlot";
import { getSlotContent } from "../../react/slotView";
import { GetInitial } from "../../util/getInitial";
import { RawSlot } from "./../../model/rawSlot";
import {IMasterState, MasterStateAction} from "./../reducers/masterState";

export class ShowAlternateSlot extends MasterStateAction {
    public constructor(private slot : ISlotViewModel) {
        super();
    }
    public TypeName() : string {return "show alternate slot"; }
    protected GenerateNewState(state : IMasterState) : IMasterState {
        if (state.TimetableListState.ShowingAlternateSlotOf &&
            this.slot.Uid === state.TimetableListState.ShowingAlternateSlotOf.Uid) {
            return {
                ...state,
                SnackbarState: {
                    ...state.SnackbarState,
                    IsOpen: false
                },
                TimetableListState: {
                    ...state.TimetableListState,
                    AlternateSlots: [],
                    ShowingAlternateSlotOf: null
                }
            };
        }
        const allSlots = state.DataState.RawSlotDataRouter.GetCurrentData().GetAll();
        const uidsOfFiltratedSlots = new Set<number>(); // filtrated means not being filtered away
        for (let i = 0; i < state.TimetableListState.FiltrateTimetables.length; i++) {
            const t = state.TimetableListState.FiltrateTimetables[i];
            for (let j = 0; j < t.Uids.length; j++) {
                uidsOfFiltratedSlots.add(t.Uids[j]);
            }
        }

        const currentTimetable = state.TimetableListState.FiltrateTimetables[state.TimetableListState.CurrentIndex];
        const alternateSlots = allSlots
            .filter((x) => {
                return x.SubjectCode === this.slot.SubjectCode
                    && x.Type === this.slot.Type
                    && uidsOfFiltratedSlots.has(x.Uid)
                    ;
            })
            .filter((x) => {
                return !GotIntersection(
                    currentTimetable.State,
                    new TinySlot(CreateSlotFromRaw(x)).State
                );
            });

        return {
            ...state,
            SnackbarState: {
                ...state.SnackbarState,
                Message: `Showing alternate slots for ${getSlotContent(this.slot)}`,
                IsOpen: true
            },
            TimetableListState: {
                ...state.TimetableListState,
                AlternateSlots: alternateSlots,
                ShowingAlternateSlotOf: this.slot
            }
        };
    }
}
