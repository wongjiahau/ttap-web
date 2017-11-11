import {
    ToggleSetTimeConstraintView
} from './../actions/toggleSetTimeConstraintView';
import {
    ISetTimeConstraintState
} from "./../reducers/setTimeConstraintState";

import {
    connect
} from "react-redux";
import {
    State
} from "../../model/states/state";
import {
    ISetTimeConstraintViewDispatchProps,
    ISetTimeConstraintViewStateProps,
    SetTimeConstraintView
} from "../../react/setTimeConstraintView";

const mapStateToProps = (state): ISetTimeConstraintViewStateProps => {
    const target = state.TimetableCreatorStateReducer.SetTimeConstraintState as ISetTimeConstraintState;
    return {
        totalState: target.TotalState,
        isOpen: target.IsOpen
    };
};

const mapDispatchToProps = (dispatch): ISetTimeConstraintViewDispatchProps => {
    return {
        handleSetTimeConstraintAt: (state: State) => {
            alert("not implemented yet");
        },
        handleCancel: () => {
            dispatch(new ToggleSetTimeConstraintView(false).Action())
        }
        // example :
        // handleSlotLoaded: (rawSlots : RawSlot[]) => {
        //     dispatch(new SetSubjects(ParseSlotToSubject(rawSlots)).Action());
        // }
    };
};

export const SetTimeConstraintViewContainer = connect(mapStateToProps, mapDispatchToProps)(SetTimeConstraintView);
