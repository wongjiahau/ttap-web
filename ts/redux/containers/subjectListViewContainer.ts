import {
    connect
} from "react-redux";
import {
    ISubjectListViewDispatchProps,
    ISubjectListViewStateProps,
    SubjectListView
} from "./../../react/subjectListView";
import {
    FindTimetablesBasedOnSelectedSubjects
} from "./../actions/FindTimetablesBasedOnSelectedSubjects";
import {
    SearchSubjectList
} from "./../actions/searchSubjectList";
import {
    SelectSubject
} from "./../actions/selectSubject";
import {
    ToggleSubjectListViewingOptions
} from "./../actions/toggleSubjectListViewingOption";
import {
    ToggleVisibilityOfSubjectListView
} from "./../actions/toggleVisibilityOfSubjectListView";

const mapStateToProps = (state): ISubjectListViewStateProps => {
    return {
        isShowingSelectedSubjectOnly: state.SubjectListStateReducer.IsShowingSelectedSubjectOnly,
        subjects: state.SubjectListStateReducer.Subjects
    };
};

const mapDispatchToProps = (dispatch): ISubjectListViewDispatchProps => {
    return {
        handleClose: () => dispatch(new ToggleVisibilityOfSubjectListView().Action()),
        handleSearch: (searchedText: string) => dispatch(new SearchSubjectList(searchedText).Action()),
        handleSelection: (subjectCode: string) => {
            dispatch(new SelectSubject(subjectCode).Action());
            dispatch(new FindTimetablesBasedOnSelectedSubjects().Action());
        },
        handleToggleView: () => dispatch(new ToggleSubjectListViewingOptions().Action())
    };
};

export const SubjectListViewContainer = connect(mapStateToProps, mapDispatchToProps)(SubjectListView);
