import { connect } from "react-redux";
import { RawSlot } from "../../model/rawSlot";
import ParseHtmlToRawSlot from "../../parser/parseHtmlToRawSlot";
import { ITimetableCreatorViewDispatchProps, ITimetableCreatorViewStateProps, TimetableCreatorView } from "../../react/timetableCreatorView";
import { NotifyDataLoaded } from "../actions/notifyDataLoaded";
import { ToggleIsOpenOfSubjectListView } from "../actions/toggleIsOpenOfSubjectListView";
import { ITimetableCreatorState } from "../reducers/timetableCreatorState";

const mapStateToProps = (state): ITimetableCreatorViewStateProps => {
    const target = state.MasterStateReducer.TimetableCreatorState as ITimetableCreatorState;
    return {
        isSlotLoaded: target.IsSlotLoaded
    };
};

const mapDispatchToProps = (dispatch): ITimetableCreatorViewDispatchProps => {
    return {
        handleLoadDemo: (html: string) => dispatch(new NotifyDataLoaded(ParseHtmlToRawSlot(html)).Action()),
        handleSlotLoaded: (rawSlots: RawSlot[]) => dispatch(new NotifyDataLoaded(rawSlots).Action()),
        handleOpenSubjectListView: () => dispatch(new ToggleIsOpenOfSubjectListView(true).Action())
    };
};

export const TimetableCreatorContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableCreatorView);
