import {IMasterState, MasterStateAction} from "./../reducers/masterState";
const find = require("lodash.find");
export class SelectSlotChoice extends MasterStateAction {
    public constructor(private slotUid : number, private newSlotChoice : number) {
        super();
    }
    public TypeName() : string {return "select slot choice"; }
    protected GenerateNewState(state : IMasterState) : IMasterState {
        const newSlots = state
            .TimetableListState
            .AllGeneralizedSlots
            .slice();
        for (let i = 0; i < newSlots.length; i++) {
            const x = newSlots[i];
            if (x.Uid === this.slotUid) {
                x.CurrentChoice = this.newSlotChoice;
                break;
            }
        }
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                AllGeneralizedSlots: newSlots
            }
        };
    }
}
