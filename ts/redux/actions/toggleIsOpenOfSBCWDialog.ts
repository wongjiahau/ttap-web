import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";
export class ToggleIsOpenOfSBCWDialog extends MasterStateAction {
    public constructor(private open: boolean) {
        super();
    }
    public TypeName(): string {
        return this.open ?
            "turn on SBCWDialog" :
            "turn off SBCWDialog";

    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        return {
            ...state,
            SbcwDialogState: {
                IsOpen: this.open
            }
        };
    }
}
