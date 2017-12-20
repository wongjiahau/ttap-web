import IconList from "material-ui-icons/List";
import Button from "material-ui/Button";
import * as React from "react";
import { Redirect } from "react-router";
import {RawSlot} from "../model/rawSlot";
import { SaveTimetableDialogContainer } from "../redux/containers/saveTimetableDialogContainer";
import { SetTimeConstraintContainer } from "../redux/containers/setTimeConstraintContainer";
import { SlotsTableContainer } from "../redux/containers/slotsTableContainer";
import { SnackbarContainer } from "../redux/containers/snackbarContainer";
import { SubjectListViewContainer } from "../redux/containers/subjectListViewContainer";
import {TimetableListContainer} from "../redux/containers/timetableListContainer";
import { SBCWDialogContainer } from "../redux/containers/turnOnSBCWDialogContainer";
import {iconStyle} from "./styles";

const selectSubjectButtonStyle : React.CSSProperties = {
    marginBottom: "10px",
    marginLeft: "10px"
};

export interface ITimetableCreatorViewStateProps {
    isSlotLoaded: boolean;
}

export interface ITimetableCreatorViewDispatchProps {
    handleOpenSubjectListView : () => void;
    handleSlotLoaded : (rawSlots : RawSlot[]) => void;
}

interface ITimetableCreatorViewProps extends ITimetableCreatorViewStateProps,
ITimetableCreatorViewDispatchProps {}

export class TimetableCreatorView extends React.Component < ITimetableCreatorViewProps, {} > {
    public render() {
        if (!this.props.isSlotLoaded) {
            return <Redirect push={true} to="/select"/>;
        }
        return (
            <div>
                <Button
                    style={selectSubjectButtonStyle}
                    raised={true}
                    color="accent"
                    onClick={this.props.handleOpenSubjectListView}>
                    <IconList style={iconStyle}/>
                    Select subjects
                </Button>
                <TimetableListContainer/>
                <SaveTimetableDialogContainer/>
                <SBCWDialogContainer/>
                <SetTimeConstraintContainer/>
                <SlotsTableContainer/>
                <SnackbarContainer/>
                <SubjectListViewContainer/>
            </div>
        );
    }
}
