import { IMasterState, MasterStateAction } from "./../reducers/masterState";
export class ToggleIsOpenOfGetDateDialog extends MasterStateAction {
  public constructor(private isOpen: boolean) {
    super();
  }

  public TypeName(): string {
    return this.isOpen ? "open get date dialog" : "close get date dialog";
  }

  protected GenerateNewState(state: IMasterState): IMasterState {
    return {
      ...state,
      SaveTimetableDialogState: {
        ...state.SaveTimetableDialogState,
        IsGetDateDialogOpen: this.isOpen,
      },
    };
  }
}
