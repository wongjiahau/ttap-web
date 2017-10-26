import { combineReducers } from "redux";
import { SubjectListReducer} from "./subjectListState";
import { TimetableCreatorReducer } from "./timetableCreatorState";

export const AllReducers =  combineReducers({
  SubjectListReducer,
  TimetableCreatorReducer
});
