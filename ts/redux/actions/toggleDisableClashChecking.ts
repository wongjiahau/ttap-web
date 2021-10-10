import { IMasterState, MasterStateAction } from "../reducers/masterState";

export class ToggleDisableClashChecking extends MasterStateAction {
  public constructor(private disable: boolean) {
    super();
  }

  public TypeName(): string {
    return "toggle disable clash checking to: " + this.disable;
  }

  protected GenerateNewState(state: IMasterState): IMasterState {
    return {
      ...state,
      SettingsState: {
        ...state.SettingsState,
        DisableClashChecking: this.disable,
      },
      SnackbarState: {
        IsOpen: true,
        Message: `Clash-checking ${this.disable ? "disabled" : "enabled"}.`,
      },
    };
  }
}
