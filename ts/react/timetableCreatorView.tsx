import IconList from "material-ui-icons/List";
import Button from "material-ui/Button";
import Switch from "material-ui/Switch";
import * as React from "react";
import {Redirect} from "react-router";
import {RawSlot} from "../model/rawSlot";
import { SaveTimetableDialogContainer } from "../redux/containers/saveTimetableDialogContainer";
import { SetTimeConstraintContainer } from "../redux/containers/setTimeConstraintContainer";
import { SlotsTableContainer } from "../redux/containers/slotsTableContainer";
import { SnackbarContainer } from "../redux/containers/snackbarContainer";
import { SubjectListViewContainer } from "../redux/containers/subjectListViewContainer";
import {TimetableListContainer} from "../redux/containers/timetableListContainer";
import {SBCWDialogContainer} from "../redux/containers/turnOnSBCWDialogContainer";
// import {HENG_2017_APR} from "../tests/testData/heng_2017_apr";
import { GetTestRawSlot1, GetTestSlot1 } from "../tests/testDataGenerator";
import TestManager, { FileName } from "../tests/testManager";
import { LeftRightPanel } from "./panels/leftRightPanel";
import {StackPanel} from "./panels/stackPanel";
import {iconStyle} from "./styles";

const switchStyle : React.CSSProperties = {
    marginRight: 0.03 * window.innerWidth
};

const selectSubjectButtonStyle : React.CSSProperties = {
    marginBottom: "10px",
    marginLeft: "10px"
};

export interface ITimetableCreatorViewStateProps {
    isSlotLoaded : boolean;
    isSbcwTurnedOn : boolean;
}

export interface ITimetableCreatorViewDispatchProps {
    handleOpenSbcwDialog:      ()      => void;
    handleOpenSubjectListView: ()      => void;
    handleSlotLoaded:          (rawSlots: RawSlot[]) => void;
    handleTurnOffSBCW:         ()      => void;
}

interface ITimetableCreatorViewProps extends ITimetableCreatorViewStateProps,
ITimetableCreatorViewDispatchProps {
}

export class TimetableCreatorView extends React.Component < ITimetableCreatorViewProps, {} > {
    public render() {
        // const DEBUGGING = false; // Please change to false during production
        // if (DEBUGGING) {
        //     this.props.handleSlotLoaded(HENG_2017_APR());
        //     alert("WARNING! You are in a debugging session.");
        // } else
        if (!this.props.isSlotLoaded) {
            return <Redirect push={true} to="/select"/>;
        }
        return (
            <div>
                <LeftRightPanel>
                    <Button
                        style={selectSubjectButtonStyle}
                        raised={true}
                        color="secondary"
                        onClick={this.props.handleOpenSubjectListView}>
                        <IconList style={iconStyle}/>
                        Select subjects
                    </Button>
                    <div style={switchStyle}>
                        <StackPanel horizontalAlignment="right" orientation="horizontal">
                            Search by considering week number
                            <Switch style={switchStyle}
                                checked={this.props.isSbcwTurnedOn}
                                onChange={this.handleSwitchToggled}/>
                        </StackPanel>
                    </div>
                </LeftRightPanel>
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

    private handleSwitchToggled = (event : object, checked : boolean) => {
        if (checked) {
            this.props.handleOpenSbcwDialog();
        } else {
            this.props.handleTurnOffSBCW();
        }
    }
}
