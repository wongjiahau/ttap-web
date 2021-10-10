import { IMasterState, MasterStateAction } from "./../reducers/masterState";
export class HideSnackbar extends MasterStateAction {
  public constructor() {
    super();
  }
  public TypeName(): string {
    return "hide snackbar";
  }
  protected GenerateNewState(state: IMasterState): IMasterState {
    return {
      ...state,
      SnackbarState: {
        ...state.SnackbarState,
        IsOpen: false,
      },
    };
  }
}
