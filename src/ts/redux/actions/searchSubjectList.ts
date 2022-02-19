import { GetInitial } from "../../util/getInitial";
import { Str } from "../../util/str";
import { IMasterState, MasterStateAction } from "./../reducers/masterState";

export class SearchSubjectList extends MasterStateAction {
  public constructor(private searchedText: string) {
    super();
  }
  public TypeName(): string {
    return "search subject list";
  }
  protected GenerateNewState(state: IMasterState): IMasterState {
    const newSubjects = state.SubjectListState.Subjects.map((s) => {
      const stringToBeMatched = new Str(
        (s.Code + s.Name + GetInitial(s.Name)).toLowerCase()
      );
      return {
        ...s,
        IsVisible: stringToBeMatched.Contains(this.searchedText.toLowerCase())
          ? true
          : false,
      };
    });
    const result: IMasterState = {
      ...state,
      SubjectListState: {
        ...state.SubjectListState,
        IsShowingSelectedSubjectOnly: false,
        SearchedText: this.searchedText,
        Subjects: newSubjects,
      },
    };
    return result;
  }
}
