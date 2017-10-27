import {combineReducers} from "redux";
import {MainFrameReducer} from "./mainFrameState";
import {SubjectListReducer} from "./subjectListState";
import {TimetableCreatorReducer} from "./timetableCreatorState";

export const AllReducers = combineReducers({
    MainFrameReducer,
    SubjectListReducer,
    TimetableCreatorReducer
});
