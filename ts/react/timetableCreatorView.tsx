import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import IconList from "material-ui-icons/List";
import * as React from "react";
import {Redirect} from "react-router";
import {RawSlot} from "../model/rawSlot";
import { AlgorithmVisualizerViewContainer } from "../redux/containers/algorithmVisualizerContainer";
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
import { AlgorithmVisualizerView } from "./algorithmVisualizerView";
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
    isSbcwTurnedOn : boolean; // sbcw = search by considering week number
    isDccTurnedOn: boolean; // dcc = disable clash checking
}

export interface ITimetableCreatorViewDispatchProps {
    handleOpenSbcwDialog:      ()      => void;
    handleOpenSubjectListView: ()      => void;
    handleSlotLoaded:          (rawSlots: RawSlot[]) => void;
    handleTurnOffSBCW:         ()      => void;
    handleToggleDisableClashChecking: (disable: boolean)  => void;
}

interface ITimetableCreatorViewProps extends ITimetableCreatorViewStateProps,
ITimetableCreatorViewDispatchProps {
}

export class TimetableCreatorView extends React.Component < ITimetableCreatorViewProps, {
    isDccDialogOpen: boolean;
} > {
    public constructor(props: ITimetableCreatorViewProps) {
        super(props);
        this.state = {
            isDccDialogOpen: false
        };
    }

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
                        variant="contained"
                        color="secondary"
                        onClick={this.props.handleOpenSubjectListView}>
                        <IconList style={iconStyle}/>
                        Select subjects
                    </Button>
                    <div style={{...switchStyle}}>
                        <StackPanel horizontalAlignment="right" orientation="horizontal">
                            <FormControlLabel
                                label="Disable clash-checking"
                                control={<Switch style={switchStyle}
                                            color="primary"
                                            checked={this.props.isDccTurnedOn}
                                            onChange={this.handleToggleDisableClashChecking}/>}/>

                            {/* This feature below is currently disabled,
                                because its necessity is diminished
                                due to better timetable-finding algorithm */}
                            <FormControlLabel
                                style={{display: "none"}}
                                label="Search by considering week number"
                                control={<Switch style={switchStyle}
                                            color="primary"
                                            checked={this.props.isSbcwTurnedOn}
                                            onChange={this.handleToggleSBCW}/>}/>
                            {""/*This is for overcoming a bug of StackPanel */}
                        </StackPanel>
                    </div>
                </LeftRightPanel>

                <Dialog open={this.state.isDccDialogOpen}>
                    <DialogTitle>Disable clash-checking?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Turning on this feature might cause TTAP to generate <b>invalid</b> timetables.
                            <br/>
                            <br/>
                            You should only turn on this feature if you want to to visualize clashes between different subjects.
                            <br/>
                            <br/>
                            WARNING: This will also <b><i>slow</i></b> down the search process.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({isDccDialogOpen: false})} color="primary">
                            cancel
                        </Button>
                        <Button onClick={() => {
                            this.setState({isDccDialogOpen: false});
                            this.props.handleToggleDisableClashChecking(true);
                        }} color="primary">
                            Turn on
                        </Button>
                    </DialogActions>
                </Dialog>
                <TimetableListContainer/>
                <SaveTimetableDialogContainer/>
                <SBCWDialogContainer/>
                <SetTimeConstraintContainer/>
                <SlotsTableContainer/>
                <SnackbarContainer/>
                <SubjectListViewContainer/>
                <AlgorithmVisualizerViewContainer/>
            </div>
        );
    }

    private handleToggleSBCW = (event : object, checked : boolean) => {
        if (checked) {
            this.props.handleOpenSbcwDialog();
        } else {
            this.props.handleTurnOffSBCW();
        }
    }

    private handleToggleDisableClashChecking = (event: object, checked: boolean) => {
        if (checked) {
            this.setState({isDccDialogOpen: true});
        } else {
            this.props.handleToggleDisableClashChecking(false);
        }
    }
}
