import { FindAlternativeSlotsOfCurrentSlot } from "./../actions/findAlternativeSlotsOfCurrentSlots";

import {
    connect
} from "react-redux";
import { STCBox } from "../../model/states/stcBox";
import { ISetTimeConstraintViewDispatchProps, ISetTimeConstraintViewStateProps, SetTimeConstraintView } from "../../react/setTimeConstraintView";
import { DefilterTimetable } from "../actions/defilterTimetable";
import { FilterTimetable } from "../actions/filterTimetable";
import { ToggleSetTimeConstraintView } from "../actions/toggleSetTimeConstraintView";
import { ISetTimeConstraintState } from "../reducers/setTimeConstraintState";
import { ITimetableListState } from "../reducers/timetableListState";

const mapStateToProps = (state): ISetTimeConstraintViewStateProps => {
    const stcState = state.MasterStateReducer.SetTimeConstraintState as ISetTimeConstraintState;
    const timetableListState = state.MasterStateReducer.TimetableListState as ITimetableListState;
    return {
        isOpen:                      stcState.IsOpen,
        numberOfRemainingTimetables: timetableListState.FiltrateTimetables.length,
        numberOfRemovedTimetables:   timetableListState.ResidueTimetables.length,
        totalState:                  stcState.TotalState
    };
};

const mapDispatchToProps = (dispatch): ISetTimeConstraintViewDispatchProps => {
    return {
        handleCancel: () => {
            dispatch(new FindAlternativeSlotsOfCurrentSlot());
            dispatch(new ToggleSetTimeConstraintView(false));
        },
        handleDesetTimeConstraintAt: (stcBox: STCBox) => dispatch(new DefilterTimetable(stcBox)),
        handleSetTimeConstraintAt:   (stcBox: STCBox) => dispatch(new FilterTimetable(stcBox))
    };
};

export const SetTimeConstraintContainer = connect(mapStateToProps, mapDispatchToProps)(SetTimeConstraintView);
