import { connect } from "react-redux";
import { ISelectCourseViewDispatchProps, SelectCourseView } from "../../react/selectCourseView";
import { NotifyDataLoaded } from "../actions/notifyDataLoaded";

const mapStateToProps = (state: any): {} => {
    return {};
};

const mapDispatchToProps = (dispatch: any): ISelectCourseViewDispatchProps => {
    return {
        handleLoadSlot: (rawSlots) => dispatch(new NotifyDataLoaded(rawSlots))
    };
};

export const SelectCourseViewContainer = connect(mapStateToProps, mapDispatchToProps)(SelectCourseView);
