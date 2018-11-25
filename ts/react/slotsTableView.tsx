import Button from "material-ui/Button";
import Checkbox from "material-ui/Checkbox";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import Paper from "material-ui/Paper";
import Table, {TableBody, TableCell, TableHead, TableRow} from "material-ui/Table";
import Typography from "material-ui/Typography";
import * as React from "react";
import { ObjectStore } from "../dataStructure/objectStore";
import {IStringDicionary} from "../interfaces/dictionary";
import {IRawSlot, RawSlot} from "../model/rawSlot";
import {Subject} from "../model/subject";
import {DiffReport, MissingSlotType} from "../model/subjectSchema";
import { Ternary } from "../redux/actions/updateSlotsTableState";
import { BeautifySubjectName } from "../util/beautifySubjectName";
import {Colors} from "./colors/colors";
import {StackPanel} from "./panels/stackPanel";
import {iconStyle} from "./styles";

const headerStyle : React.CSSProperties = {
    marginLeft: "10px"
};

const titleStyle : React.CSSProperties = {
    fontWeight: "bold",
    marginLeft: "15px",
    marginTop: "10px"
};

const divStyle : React.CSSProperties = {
    flex: "2",
    overflow: "auto"
};

const footerStyle : React.CSSProperties = {
    margin: "10px",
    minHeight: "36px",
    textAlign: "left"
};

export interface ISlotsTableViewStateProps {
    errorMessages : DiffReport[] | null;
    isOpen : boolean;
    selectedSubjects : Subject[];
    slotStates : IStringDicionary < boolean >;
    subjectStates : IStringDicionary < Ternary >;
    rawSlotStore: ObjectStore<IRawSlot>;
}

export interface ISlotsTableViewDispatchProps {
    handleCancel : () => void;
    handleDone : () => void;
    handleSlotCheckChanged : (slotNumber : string, checked : boolean, subjectCode : string) => void;
    handleSlotsGroupCheckChanged : (subjectCode : string) => void;
}

export interface ISlotsTableViewProps extends ISlotsTableViewStateProps,
ISlotsTableViewDispatchProps {}

export interface ISlotsTableViewInternalState {
    sectionStyle : React.CSSProperties;
}

export class SlotsTable extends React.Component < ISlotsTableViewProps,
ISlotsTableViewInternalState > {
    public constructor(props : ISlotsTableViewProps) {
        super(props);
        this.state = {
            sectionStyle: this.getSectionStyle()
        };
    }

    public getSectionStyle() : React.CSSProperties {
        return {
            display: "flex",
            flexFlow: "column",
            height: window.innerHeight
        };
    }

    public render() {
        return (
            <Drawer anchor="right" open={this.props.isOpen} onClose={this.props.handleDone}>
                <section style={this.state.sectionStyle}>
                    <header style={headerStyle}>
                        <StackPanel orientation="vertical">
                            <Typography type="display1" color="primary">Below are the time slots of selected subjects.</Typography>
                            <Typography type="subheading" gutterBottom={true}>You can select or deselect some specific time slots.</Typography>
                        </StackPanel>
                    </header>
                    <Paper style={divStyle}>{this
                            .props
                            .selectedSubjects
                            .map((subject) => {
                                return (
                                    <div key={subject.Code}>
                                        <Typography style={titleStyle} type="subheading">
                                            {subject.Code + " - " + BeautifySubjectName(subject.Name)}
                                        </Typography>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            indeterminate={this.props.subjectStates[subject.Code] === "intermediate"}
                                                            checked={this.props.subjectStates[subject.Code] === "true"}
                                                            onClick={() => this.props.handleSlotsGroupCheckChanged(subject.Code)}/>
                                                    </TableCell>
                                                    <TableCell padding="dense">No</TableCell>
                                                    <TableCell padding="dense">Type</TableCell>
                                                    <TableCell padding="dense">Group</TableCell>
                                                    <TableCell padding="dense">Day</TableCell>
                                                    <TableCell padding="dense">Time</TableCell>
                                                    <TableCell padding="dense">Week</TableCell>
                                                    <TableCell padding="dense">Room</TableCell>
                                                    <TableCell padding="dense">Remark</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.props.rawSlotStore
                                                    .GetBunch(subject.SlotUids)
                                                    .map((slot, index) => {
                                                        const checked = this.props.slotStates[slot.Number];
                                                        const clickHandler = () => this
                                                            .props
                                                            .handleSlotCheckChanged(slot.Number, checked, subject.Code);
                                                        return (
                                                            <TableRow key={index} hover={true} onClick={clickHandler}>
                                                                <TableCell padding="checkbox">
                                                                    <Checkbox checked={checked} onClick={clickHandler}/>
                                                                </TableCell>
                                                                <TableCell padding="dense">{slot.Number}</TableCell>
                                                                <TableCell padding="dense">{slot.Type}</TableCell>
                                                                <TableCell padding="dense">{slot.Group}</TableCell>
                                                                <TableCell padding="dense">{slot.Day}</TableCell>
                                                                <TableCell padding="dense">{slot.TimePeriod}</TableCell>
                                                                <TableCell padding="dense">{slot.WeekNumber}</TableCell>
                                                                <TableCell padding="dense">{slot.Room}</TableCell>
                                                                <TableCell padding="dense">{slot.Remark}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                            </TableBody>
                                        </Table>
                                        <Divider/>
                                        <Divider/>
                                    </div>
                                );
                            })}</Paper>
                    <div>
                        {GenerateErrorLabels(this.props.errorMessages)}
                    </div>
                    <footer style={footerStyle}>
                        <StackPanel orientation="horizontal" horizontalAlignment="left">
                            <Button raised={true} color="primary" onClick={this.props.handleDone}>
                                Find new timetables
                            </Button>
                            <Button onClick={this.props.handleCancel}>
                                Cancel
                            </Button>
                        </StackPanel>
                    </footer>
                </section>

            </Drawer>
        );
    }
}

function GenerateErrorLabels(diffReports : DiffReport[] | null) {
    const errorStyle : React.CSSProperties = {
        color: Colors.Red
    };
    if (!diffReports) {
        return "";
    }
    if (diffReports[0].MissingSlotType === "no possible timetables found") {
        return (
            <div style={errorStyle}>
                <ul>
                    <li>
                        The currently selected slots do not produce any possible timetables. Try selecting more slots.
                    </li>
                </ul>
            </div>
        );
    }
    const getType = (type : MissingSlotType) : string => {
        switch (type) {
            case "L":
                return "LECTURE";
            case "T":
                return "TUTORIAL";
            case "P":
                return "PRACTICAL";
            case "no possible timetables found":
                return "";
        }
    };
    return (
        <div style={errorStyle}>
            <ul>{diffReports.map((r) => (
                    <li>At least one {getType(r.MissingSlotType)}&nbsp;is needed for {Subject.GetSubjectNameOf(r.SubjectCode)}</li>
                ))}</ul>
        </div>

    );
}
