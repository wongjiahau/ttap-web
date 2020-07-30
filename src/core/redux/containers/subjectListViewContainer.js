"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const app_1 = require("../../react/app");
const hideSnackbar_1 = require("../actions/hideSnackbar");
const toggleIsEnabledOfAlgorithmVisualizer_1 = require("../actions/toggleIsEnabledOfAlgorithmVisualizer");
const toggleIsOpenOfAlgorithmVisualizerView_1 = require("../actions/toggleIsOpenOfAlgorithmVisualizerView");
const toggleIsOpenOfSubjectListView_1 = require("../actions/toggleIsOpenOfSubjectListView");
const toggleSetTimeConstraintView_1 = require("../actions/toggleSetTimeConstraintView");
const updateSlotsTableState_1 = require("../actions/updateSlotsTableState");
const updateTotalMatrix_1 = require("../actions/updateTotalMatrix");
const subjectListView_1 = require("./../../react/subjectListView");
const notifyIfTimetableIsFound_1 = require("./../actions/notifyIfTimetableIsFound");
const searchSubjectList_1 = require("./../actions/searchSubjectList");
const toggleSubjectListViewingOption_1 = require("./../actions/toggleSubjectListViewingOption");
const toggleSubjectSelection_1 = require("./../actions/toggleSubjectSelection");
const mapStateToProps = (state) => {
    const masterState = state.MasterStateReducer;
    const target = masterState.SubjectListState;
    return {
        ClashingSubjectPairs: target.ClashingSubjectPairs,
        IsOpen: target.IsOpen,
        IsShowingLoadingBar: target.IsShowingLoadingBar,
        IsShowingSelectedSubjectOnly: target.IsShowingSelectedSubjectOnly,
        SearchedText: target.SearchedText,
        Subjects: target.Subjects,
        IsAlgorithmVisualizerEnabled: masterState.AlgorithmVisualizerState.isEnabled
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleClose: () => {
            dispatch(new toggleIsOpenOfSubjectListView_1.ToggleIsOpenOfSubjectListView(false));
            dispatch(new hideSnackbar_1.HideSnackbar());
            dispatch(new updateSlotsTableState_1.UpdateSlotsTableState());
            dispatch(new toggleSetTimeConstraintView_1.ToggleSetTimeConstraintView(true));
            dispatch(new updateTotalMatrix_1.UpdateTotalMatrix());
        },
        handleSearch: (searchedText) => {
            dispatch(new searchSubjectList_1.SearchSubjectList(searchedText));
            dispatch(new hideSnackbar_1.HideSnackbar());
        },
        handleSelection: (subjectIndex) => {
            app_1.ToggleLoadingScreen("Finding possible timetables", () => {
                dispatch(new toggleSubjectSelection_1.ToggleSubjectSelection(subjectIndex));
                dispatch(new notifyIfTimetableIsFound_1.NotifyIfTimetableIsFound());
                dispatch(new toggleIsOpenOfAlgorithmVisualizerView_1.ToggleIsOpenOfAlgorithmVisualizerView(true));
            });
        },
        handleToggleView: () => dispatch(new toggleSubjectListViewingOption_1.ToggleSubjectListViewingOptions()),
        handleToggleIsEnabledOfFindTimetableVisualization: () => dispatch(new toggleIsEnabledOfAlgorithmVisualizer_1.ToggleIsEnabledOfAlgorithmVisualizer()),
        handleHideFindTimetableVisualization: () => dispatch(new toggleIsEnabledOfAlgorithmVisualizer_1.ToggleIsEnabledOfAlgorithmVisualizer(false)),
    };
};
exports.SubjectListViewContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(subjectListView_1.SubjectListView);
//# sourceMappingURL=subjectListViewContainer.js.map