import {connect} from "react-redux";
import {RawSlot} from "../../model/rawSlot";
import { ParseSlotToSubject } from "../../parser/parseSlotToSubject";
import {IMainFrameDispatchProps, IMainFrameStateProps, MainFrame} from "../../react/mainFrame";
import { NotifyDataLoaded } from "./../actions/notifyDataLoaded";
import { SetSubjects } from "./../actions/setSubjects";
import { MainFrameState } from "./../reducers/mainFrameState";

const mapStateToProps = (state) : IMainFrameStateProps => {
    const target = state.MainFrameReducer as MainFrameState;
    return {IsSlotLoaded: target.IsSlotLoaded};
};

const mapDispatchToProps = (dispatch) : IMainFrameDispatchProps => {
    return {
        handleSlotLoaded: (rawSlots : RawSlot[]) => {
            dispatch(new NotifyDataLoaded(rawSlots).Action());
            dispatch(new SetSubjects(ParseSlotToSubject(rawSlots)).Action());
        }
    };
};

export const MainFrameContainer = connect(mapStateToProps, mapDispatchToProps)(MainFrame);
