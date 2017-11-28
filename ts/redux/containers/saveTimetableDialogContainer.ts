import {expect} from "chai";
import {connect} from "react-redux";
import {ISaveTimetableDialogDispatchProps, ISaveTimetableDialogStateProps, SaveTimetableDialog} from "../../react/saveTimetableDialog";
import {SaveTimetableAsGoogleCalendar} from "../actions/saveTimetable/saveTimetableAsGoogleCalendar";
import {SaveTimetableAsImage} from "../actions/saveTimetable/saveTimetableAsImage";
import {SaveTimetableAsTextFile} from "../actions/saveTimetable/saveTimetableAsTextFile";
import {ToggleIsOpenOfGetDateDialog} from "../actions/toggleIsOpenOfGetDateDialog";
import {ToggleIsOpenOfSaveDialog} from "../actions/toggleIsOpenOfSaveDialog";
import {UpdateSaveTimetableDialogState} from "../actions/updateSaveTimetableDialogState";
import {UpdateSubjectListState} from "../actions/updateSubjectListState";
import {UpdateTimetableListState} from "../actions/updateTimetableListState";
import {SaveTimetableDialogState} from "../reducers/saveTimetableDialogState";
import {TimetableListStateAction} from "../reducers/timetableListState";

const mapStateToProps = (state) : ISaveTimetableDialogStateProps => {
    const target = state.TimetableCreatorStateReducer.SaveTimetableDialogState as SaveTimetableDialogState;
    return {
        isGetDateDialogOpen: target.IsGetDateDialogOpen,
        isMainDialogOpen: target.IsMainDialogOpen
    };

};

const mapDispatchToProps = (dispatch) : ISaveTimetableDialogDispatchProps => {
    return {
        handleSaveAsTextFile:       ()          => dispatch(new SaveTimetableAsTextFile().Action()),
        handleSaveAsPicture:        ()          => dispatch(new SaveTimetableAsImage().Action()),
        handleSaveToGoogleCalendar: (semStartDate: Date) => dispatch(new SaveTimetableAsGoogleCalendar(semStartDate).Action()),
        handleClose:                ()          => dispatch(new UpdateSaveTimetableDialogState(new ToggleIsOpenOfSaveDialog(false)).Action()),
        handleCloseGetDateDialog:   ()          => dispatch(new UpdateSaveTimetableDialogState(new ToggleIsOpenOfGetDateDialog(false)).Action()),
        handleOpenGetDateDialog:    ()          => dispatch(new UpdateSaveTimetableDialogState(new ToggleIsOpenOfGetDateDialog(true)).Action())
    };
};

export const SaveTimetableDialogContainer = connect(mapStateToProps, mapDispatchToProps)(SaveTimetableDialog);

const Wrap = (action : TimetableListStateAction) : any => {
    return new UpdateSubjectListState(new UpdateTimetableListState(action)).Action();
};
