import { IMasterState, MasterStateAction } from "./../reducers/masterState";
export class ToggleIsOpenOfSaveDialog extends MasterStateAction {
  public constructor(private isOpen: boolean) {
    super();
  }
  public TypeName(): string {
    if (this.isOpen) {
      return "open save dialog";
    } else {
      return "close save dialog";
    }
  }
  protected GenerateNewState(state: IMasterState): IMasterState {
    return {
      ...state,
      SaveTimetableDialogState: {
        ...state.SaveTimetableDialogState,
        IsMainDialogOpen: this.isOpen,
      },
    };
  }
}
