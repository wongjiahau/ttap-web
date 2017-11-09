import {
    connect
} from "react-redux";
import {
    SubjectListStateAction
} from "../reducers/subjectListState";
import {
    TimetableCreatorStateAction
} from "../reducers/timetableCreatorState";
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
import {
    UpdateSubjectListState
} from "./../actions/updateSubjectListState";

const mapStateToProps = (state): ISubjectListViewStateProps => {
    const target = state.TimetableCreatorStateReducer.SubjectListState;
    return {
        isShowingSelectedSubjectOnly: target.IsShowingSelectedSubjectOnly,
        subjects:                     target.Subjects
    };
};

const mapDispatchToProps = (dispatch): ISubjectListViewDispatchProps => {
    return {
        handleClose: () => dispatch(new ToggleVisibilityOfSubjectListView().Action()),
        handleSearch: (searchedText: string) => dispatch(Wrap(new SearchSubjectList(searchedText)).Action()),
        handleSelection: (subjectCode: string) => {
            dispatch(Wrap(new SelectSubject(subjectCode)).Action());
            dispatch(Wrap(new FindTimetablesBasedOnSelectedSubjects()).Action());
        },
        handleToggleView: () => dispatch(Wrap(new ToggleSubjectListViewingOptions()).Action())
    };
};

export const SubjectListViewContainer = connect(mapStateToProps, mapDispatchToProps)(SubjectListView);

const Wrap = (action: SubjectListStateAction): TimetableCreatorStateAction => {
    return new UpdateSubjectListState(action);
};
