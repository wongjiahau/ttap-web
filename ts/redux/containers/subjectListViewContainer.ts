import { connect } from "react-redux";
import { ToggleLoadingScreen } from "../../react/app";
import { FindAlternativeSlotsOfCurrentSlots } from "../actions/findAlternativeSlotsOfCurrentSlots";
import { HideSnackbar } from "../actions/hideSnackbar";
import { ToggleIsEnabledOfAlgorithmVisualizer } from "../actions/toggleIsEnabledOfAlgorithmVisualizer";
import { ToggleIsOpenOfAlgorithmVisualizerView } from "../actions/toggleIsOpenOfAlgorithmVisualizerView";
import { ToggleIsOpenOfSubjectListView } from "../actions/toggleIsOpenOfSubjectListView";
import { ToggleSetTimeConstraintView } from "../actions/toggleSetTimeConstraintView";
import { UpdateSlotsTableState } from "../actions/updateSlotsTableState";
import { UpdateTotalMatrix } from "../actions/updateTotalMatrix";
import { IMasterState } from "../reducers/masterState";
import { ISubjectListState } from "../reducers/subjectListState";
import {
  ISubjectListViewDispatchProps,
  ISubjectListViewStateProps,
  SubjectListView,
} from "./../../react/subjectListView";
import { NotifyIfTimetableIsFound } from "./../actions/notifyIfTimetableIsFound";
import { SearchSubjectList } from "./../actions/searchSubjectList";
import { ToggleLoadingBar } from "./../actions/toggleLoadingBar";
import { ToggleSubjectListViewingOptions } from "./../actions/toggleSubjectListViewingOption";
import { ToggleSubjectSelection } from "./../actions/toggleSubjectSelection";

const mapStateToProps = (state: any): ISubjectListViewStateProps => {
  const masterState = state.MasterStateReducer as IMasterState;
  const target = masterState.SubjectListState as ISubjectListState;
  return {
    ClashingSubjectPairs: target.ClashingSubjectPairs,
    IsOpen: target.IsOpen,
    IsShowingLoadingBar: target.IsShowingLoadingBar,
    IsShowingSelectedSubjectOnly: target.IsShowingSelectedSubjectOnly,
    SearchedText: target.SearchedText,
    Subjects: target.Subjects,
    IsAlgorithmVisualizerEnabled:
      masterState.AlgorithmVisualizerState.isEnabled,
  };
};

const mapDispatchToProps = (dispatch: any): ISubjectListViewDispatchProps => {
  return {
    handleClose: () => {
      dispatch(new ToggleIsOpenOfSubjectListView(false));
      dispatch(new HideSnackbar());
      dispatch(new UpdateSlotsTableState());
      dispatch(new ToggleSetTimeConstraintView(true));
      dispatch(new UpdateTotalMatrix());
    },
    handleSearch: (searchedText: string) => {
      dispatch(new SearchSubjectList(searchedText));
      dispatch(new HideSnackbar());
    },
    handleSelection: (subjectIndex: number) => {
      ToggleLoadingScreen("Finding possible timetables", () => {
        dispatch(new ToggleSubjectSelection(subjectIndex));
        dispatch(new NotifyIfTimetableIsFound());
        dispatch(new ToggleIsOpenOfAlgorithmVisualizerView(true));
      });
    },
    handleToggleView: () => dispatch(new ToggleSubjectListViewingOptions()),
    handleToggleIsEnabledOfFindTimetableVisualization: () =>
      dispatch(new ToggleIsEnabledOfAlgorithmVisualizer()),
    handleHideFindTimetableVisualization: () =>
      dispatch(new ToggleIsEnabledOfAlgorithmVisualizer(false)),
  };
};

export const SubjectListViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectListView);
