// This file is generated,
// please don't modify it unless you know what you're doing
import {combineReducers} from "redux";
import {MainFrameReducer} from "./mainFrameState";
import {SubjectListStateReducer} from "./subjectListState";
import {TimetableCreatorReducer} from "./timetableCreatorState";
// new-import

export const AllReducers = combineReducers({
    MainFrameReducer,
    SubjectListStateReducer,
    TimetableCreatorReducer,
    // new-reducer
});
