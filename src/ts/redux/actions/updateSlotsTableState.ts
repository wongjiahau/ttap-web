import { IStringDicionary } from "../../interfaces/dictionary";
import { Subject } from "../../model/subject";
import { IMasterState, MasterStateAction } from "./../reducers/masterState";
export class UpdateSlotsTableState extends MasterStateAction {
  public constructor() {
    super();
  }
  public TypeName(): string {
    return "update slots table state";
  }
  protected GenerateNewState(state: IMasterState): IMasterState {
    const selectedSubjects = state.SubjectListState.Subjects.filter(
      (x) => x.IsSelected
    );
    return {
      ...state,
      SlotTableState: {
        ...state.SlotTableState,
        ErrorMessages: null,
        SlotStates: GetSlotStates(selectedSubjects),
        SubjectStates: GetSubjectStates(selectedSubjects),
      },
    };
  }
}

export function GetSlotStates(
  selectedSubjects: Subject[]
): IStringDicionary<boolean> {
  const result: IStringDicionary<boolean> = {};
  selectedSubjects.forEach((s) => {
    s.SlotNumbers.forEach((id) => {
      result[id] = true;
    });
  });
  return result;
}

export type Ternary = "true" | "false" | "intermediate";

export function GetSubjectStates(
  selectedSubjects: Subject[]
): IStringDicionary<Ternary> {
  const result: IStringDicionary<Ternary> = {};
  selectedSubjects.forEach((s) => {
    result[s.Code] = "true";
  });
  return result;
}
