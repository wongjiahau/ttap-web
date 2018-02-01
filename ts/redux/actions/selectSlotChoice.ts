import { ObjectStore } from "../../dataStructure/objectStore";
import {IMasterState, MasterStateAction} from "./../reducers/masterState";
export class SelectSlotChoice extends MasterStateAction {
    public constructor(private slotUid : number, private newSlotChoice : number) {
        super();
    }
    public TypeName() : string {return "select slot choice"; }
    protected GenerateNewState(state : IMasterState) : IMasterState {
        const oldObjectStore = state.TimetableListState.SlotStateStore;
        const newSlotStateStore = new ObjectStore(oldObjectStore.GetAll());
        const slotsToBeModified = newSlotStateStore.GetOne(this.slotUid);
        slotsToBeModified.CurrentChoice = this.newSlotChoice;
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                SlotStateStore: newSlotStateStore
            }
        };
    }
}
