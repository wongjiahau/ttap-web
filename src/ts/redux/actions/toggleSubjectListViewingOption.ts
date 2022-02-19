import { IMasterState, MasterStateAction } from "./../reducers/masterState";
export class ToggleSubjectListViewingOptions extends MasterStateAction {
  public TypeName(): string {
    return "toggle subject list viewing option";
  }
  protected GenerateNewState(state: IMasterState): IMasterState {
    const newIsShowingSelectedSubjectOnly =
      !state.SubjectListState.IsShowingSelectedSubjectOnly;
    const newSubjects = state.SubjectListState.Subjects.map((s) => {
      if (newIsShowingSelectedSubjectOnly) {
        return {
          ...s,
          IsVisible: s.IsSelected,
        };
      } else {
        return {
          ...s,
          IsVisible: true,
        };
      }
    });
    const result: IMasterState = {
      ...state,
      SubjectListState: {
        ...state.SubjectListState,
        IsShowingSelectedSubjectOnly: newIsShowingSelectedSubjectOnly,
        Subjects: newSubjects,
      },
    };
    return result;
  }
}
