import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";

export class ToggleIsOpenOfSubjectListView extends MasterStateAction {
    public constructor(private open: boolean) {
        super();
    }

    public TypeName(): string {
        return this.open ?
            "open subject list view" :
            "close subject list view";
    }

    protected GenerateNewState(state: IMasterState): IMasterState {
        return {
            ...state,
            SubjectListState: {
                ...state.SubjectListState,
                IsOpen: this.open
            }
        };
    }

}
