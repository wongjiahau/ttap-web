import { connect } from "react-redux";
import { ISelectCourseViewDispatchProps, SelectCourseView } from "../../react/selectCourseView";
import { NotifyDataLoaded } from "../actions/notifyDataLoaded";

const mapStateToProps = (state): {} => {
    return {};
};

const mapDispatchToProps = (dispatch): ISelectCourseViewDispatchProps => {
    return {
        handleLoadSlot: (rawSlots) => dispatch(new NotifyDataLoaded(rawSlots))
    };
};

export const SelectCourseViewContainer = connect(mapStateToProps, mapDispatchToProps)(SelectCourseView);
