import {connect} from "react-redux";
import {ISaveTimetableDialogDispatchProps, ISaveTimetableDialogStateProps, SaveTimetableDialog} from "../../react/saveTimetableDialog";
import {SaveTimetableAsGoogleCalendar} from "../actions/saveTimetable/saveTimetableAsGoogleCalendar";
import {SaveTimetableAsImage} from "../actions/saveTimetable/saveTimetableAsImage";
import {SaveTimetableAsTextFile} from "../actions/saveTimetable/saveTimetableAsTextFile";
import {ToggleIsOpenOfGetDateDialog} from "../actions/toggleIsOpenOfGetDateDialog";
import {ToggleIsOpenOfSaveDialog} from "../actions/toggleIsOpenOfSaveDialog";
import { ISaveTimetableDialogState } from "../reducers/saveTimetableDialogState";

const mapStateToProps = (state) : ISaveTimetableDialogStateProps => {
    const target = state.MasterStateReducer.SaveTimetableDialogState as ISaveTimetableDialogState;
    return {
        isGetDateDialogOpen: target.IsGetDateDialogOpen,
        isMainDialogOpen: target.IsMainDialogOpen
    };

};

const mapDispatchToProps = (dispatch) : ISaveTimetableDialogDispatchProps => {
    return {
        handleSaveAsTextFile:       ()          => dispatch(new SaveTimetableAsTextFile()),
        handleSaveAsPicture:        ()          => dispatch(new SaveTimetableAsImage()),
        handleSaveToGoogleCalendar: (semStartDate: Date) => dispatch(new SaveTimetableAsGoogleCalendar(semStartDate)),
        handleClose:                ()          => dispatch(new ToggleIsOpenOfSaveDialog(false)),
        handleCloseGetDateDialog:   ()          => dispatch(new ToggleIsOpenOfGetDateDialog(false)),
        handleOpenGetDateDialog:    ()          => dispatch(new ToggleIsOpenOfGetDateDialog(true))
    };
};

export const SaveTimetableDialogContainer = connect(mapStateToProps, mapDispatchToProps)(SaveTimetableDialog);
