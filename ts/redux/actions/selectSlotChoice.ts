import { ObjectStore } from "../../dataStructure/objectStore";
import {IMasterState, MasterStateAction} from "./../reducers/masterState";
export class SelectSlotChoice extends MasterStateAction {
    public constructor(private slotUid : number, private newSlotChoice : number) {
        super();
    }
    public TypeName() : string {return "select slot choice"; }
    protected GenerateNewState(state : IMasterState) : IMasterState {
        const oldObjectStore = state.TimetableListState.SlotViewModelStore;
        const newSlotStateStore = new ObjectStore(oldObjectStore.GetAll());
        const slotsToBeModified = newSlotStateStore.GetOne(this.slotUid);
        if(!slotsToBeModified) {
            return state
        }
        slotsToBeModified.CurrentChoice = this.newSlotChoice;
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                SlotViewModelStore: newSlotStateStore
            }
        };
    }
}
