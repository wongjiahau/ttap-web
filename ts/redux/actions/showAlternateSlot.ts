import { ISlotViewModel } from "../../model/slotViewModel";
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
                    AlternativeSlots: [],
                    ShowingAlternateSlotOf: null
                }
            };
        }

        const alternativeSlots = this.slot.AlternativeSlots;

        return {
            ...state,
            SnackbarState: {
                ...state.SnackbarState,
                Message: alternativeSlots.length > 0 ?
                     `Showing alternative slots for ${getSlotContent(this.slot)}` :
                     `No alternative slots are available for ${getSlotContent(this.slot)}`
                     ,
                IsOpen: true
            },
            TimetableListState: {
                ...state.TimetableListState,
                AlternativeSlots: alternativeSlots,
                ShowingAlternateSlotOf: this.slot
            }
        };
    }
}
