import { IMasterState, MasterStateAction } from "./../reducers/masterState";

export class ToggleLoadingBar extends MasterStateAction {
  public constructor(private showLoadingBar: boolean) {
    super();
  }
  public TypeName(): string {
    return "toggle loading bar";
  }
  protected GenerateNewState(state: IMasterState): IMasterState {
    return {
      ...state,
      SubjectListState: {
        ...state.SubjectListState,
        IsShowingLoadingBar: this.showLoadingBar,
      },
    };
  }
}
