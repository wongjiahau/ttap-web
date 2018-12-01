import { RawSlot } from "../../model/rawSlot";
import { BinaryPartition } from "../../permutator/partitionize";
import { IMasterState, MasterStateAction } from "../reducers/masterState";

export class ToggleLockSlot extends MasterStateAction {
    public constructor(private operation: "lock"| "unlock", private slot: RawSlot) {
        super();
    }

    public TypeName(): string {
        return "lock slot : " + JSON.stringify(this.slot, null, 2);
    }

    protected GenerateNewState(state: IMasterState): IMasterState {
        const {UidsOfLockedSlot} = state.TimetableListState;
        switch (this.operation) {
            case "lock":
                UidsOfLockedSlot.push(this.slot.Uid);
                break;
            case "unlock":
                const index = UidsOfLockedSlot.indexOf(this.slot.Uid);
                if (index > -1) {
                    UidsOfLockedSlot.splice(index, 1);
                } else {
                    throw new Error("No locked slots have the uid of " + this.slot.Uid);
                }
                break;
        }
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                UidsOfLockedSlot,
            }
        };
    }
}
