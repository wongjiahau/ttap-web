import {IMasterState, MasterStateAction} from "./../reducers/masterState";
export class SelectSlotChoice extends MasterStateAction {
    public constructor(private slotUid : number, private newSlotChoice : number) {
        super();
    }
    public TypeName() : string {return "select slot choice"; }
    protected GenerateNewState(state : IMasterState) : IMasterState {
        // What I'm doing here is not really in the proper Redux way
        // Because Redux suggest that we should not modified the state
        // Instead we should copy the old state and return the modified copy
        const slotsToBeModified = state.TimetableListState.SlotStateStore.GetOne(this.slotUid);
        slotsToBeModified.CurrentChoice = this.newSlotChoice;
        return {
            ...state
        };
    }
}
