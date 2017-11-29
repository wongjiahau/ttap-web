import {
    ITimetableCreatorState,
    TimetableCreatorStateAction
} from "./../reducers/timetableCreatorState";
export class ToggleIsOpenOfSlotsTable extends TimetableCreatorStateAction {
    public constructor(private isOpen: boolean) {
        super();
    }
    public TypeName(): string {
        return this.isOpen ?
            "open slots table" :
            "close slots table";
    }
    protected GenerateNewState(state: ITimetableCreatorState): ITimetableCreatorState {
        return {
            ...state,
            IsSlotsTableVisible: this.isOpen
        };
    }
}
