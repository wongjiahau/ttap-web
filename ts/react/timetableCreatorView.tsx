import {reduce, uniq} from "lodash";
import Button from "material-ui-next/Button";
import Paper from "material-ui-next/Paper";
import Typography from "material-ui-next/Typography";
import IconList from "material-ui/svg-icons/action/list";
import * as React from "react";
import {Beautify} from "../helper";
import {RawSlot} from "../model/rawSlot";
import {Subject} from "../model/subject";
import { SaveTimetableDialogContainer } from "../redux/containers/saveTimetableDialogContainer";
import { SetTimeConstraintContainer } from "../redux/containers/setTimeConstraintContainer";
import { SlotsTableContainer } from "../redux/containers/slotsTableContainer";
import { SnackbarContainer } from "../redux/containers/snackbarContainer";
import { SubjectListViewContainer } from "../redux/containers/subjectListViewContainer";
import {TimetableListContainer} from "../redux/containers/timetableListContainer";
import {LoadTestDataView} from "./loadTestDataView";
import {Login} from "./login";
import {StackPanel} from "./panels/stackPanel";
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
    handleLoadDemo : (html : string) => void;
}

interface ITimetableCreatorViewProps extends ITimetableCreatorViewStateProps,
ITimetableCreatorViewDispatchProps {}

export class TimetableCreatorView extends React.Component < ITimetableCreatorViewProps, {} > {
    public render() {
        if (!this.props.isSlotLoaded) {
            return (
                <div>
                    <LoadTestDataView handleLoadDemo={this.props.handleLoadDemo}/>
                    <Login notifyDataLoaded={this.props.handleSlotLoaded}/>
                </div>
            );
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
                <SetTimeConstraintContainer/>
                <SlotsTableContainer/>
                <SnackbarContainer/>
                <SubjectListViewContainer/>
            </div>
        );
    }

    private GenerateMessage(clashingSubjectPairs : Array < [Subject, Subject] >): React.ReactNode {
        const paperStyle: React.CSSProperties = {
            padding: "10px"
        };
        const subjectsInvolved = uniq < Subject > (reduce(clashingSubjectPairs, (result, x) => result.concat(x), []));
        const stringifySubject = (s : Subject) => Beautify(s.Name) + "(" + s.Code + ")";
        return (
            <Paper style={paperStyle}>
                <StackPanel orientation="vertical" horizontalAlignment="center">
                    <Typography type="display2" color="inherit">
                        No possible timetable is found because:
                    </Typography>
                    <br/>
                    <table>
                        {clashingSubjectPairs.map((pair, index) => {
                            return (
                                <tr key={index}>
                                    <td>{"- " + stringifySubject(pair[0])}</td>
                                    <td>
                                        <i>is clashing with</i>
                                    </td>
                                    <td>{stringifySubject(pair[1])}<br/></td>
                                </tr>
                            );
                        })}
                    </table>
                    <br/>
                    <Typography type="display1" color="inherit">
                        Try deselecting one of the following subjects :
                    </Typography>
                    <ul>
                        {subjectsInvolved.map((x) => (
                            <li>{stringifySubject(x)}</li>
                        ))}
                    </ul>
                </StackPanel>
            </Paper>
        );
    }
}
