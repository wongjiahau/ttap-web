import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";
export class ToggleIsOpenOfSlotsTable extends MasterStateAction {
    public constructor(private isOpen: boolean) {
        super();
    }
    public TypeName(): string {
        return this.isOpen ?
            "open slots table" :
            "close slots table";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        return {
            ...state,
            SlotTableState: {
                ...state.SlotTableState,
                IsOpen: this.isOpen
            },
            SnackbarState: {
                ...state.SnackbarState,
                IsOpen: false
            }
        };
    }
}
