import { MasterStateAction } from "../reducers/masterState";
import { IMasterState } from "../reducers/masterState";

export class GoToThisAlternativeSlot extends MasterStateAction {
    public constructor(
        private sourceSlotUid: number,
        private destinationSlotUid: number
    ) {
        super();
    }
    public TypeName(): string { return `go to this alternate slot (destination=${this.destinationSlotUid}) `; }

    protected GenerateNewState(state: IMasterState): IMasterState {
        const sourceSlot = state.TimetableListState.SlotViewModelStore.GetOne(this.sourceSlotUid)
        if(!sourceSlot) {
            console.error("Something is wrong, source slot is not defined")
            return state
        }
        const alternativeSlot = sourceSlot.AlternativeSlots.find(slot => slot.slot.Uid === this.destinationSlotUid)

        if(!alternativeSlot) {
            return state
        }
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                CurrentIndex: alternativeSlot.destinationTimetableIndex,
                CurrentSubIndex: alternativeSlot.destinationTimetableSubIndex,
                ShowingAlternateSlotOf: null
            },
            SnackbarState: {
                ...state.SnackbarState,
                IsOpen: false
            }
        }
    }
}