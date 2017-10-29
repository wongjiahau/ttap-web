import {combineReducers} from "redux";
import {MainFrameReducer} from "./mainFrameState";
import {SubjectListReducer} from "./subjectListState";
import {TimetableCreatorReducer} from "./timetableCreatorState";
import { TimetableListReducer } from "./timetableListState";

export const AllReducers = combineReducers({
    MainFrameReducer,
    SubjectListReducer,
    TimetableCreatorReducer,
    TimetableListReducer
});
