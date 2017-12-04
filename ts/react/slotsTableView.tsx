import * as $ from "jquery";
import Button from "material-ui-next/Button";
import Checkbox from "material-ui-next/Checkbox";
import Divider from "material-ui-next/Divider";
import Drawer from "material-ui-next/Drawer";
import Paper from "material-ui-next/Paper";
import Table, {TableBody, TableCell, TableHead, TableRow} from "material-ui-next/Table";
import Typography from "material-ui-next/Typography";
import * as React from "react";
import {Beautify} from "../helper";
import {IStringDicionary} from "../interfaces/dictionary";
import {RawSlot} from "../model/rawSlot";
import {Subject} from "../model/subject";
import {DiffReport} from "../model/subjectSchema";
import {Ternary} from "../redux/actions/toggleSubjectSelection";
import {StackPanel} from "./panels/stackPanel";
import {iconStyle} from "./styles";

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
    errorMessages : DiffReport[];
    isOpen : boolean;
    selectedSubjects : Subject[];
    slotStates : IStringDicionary < boolean >;
    subjectStates : IStringDicionary < Ternary >;
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
        $(window).on("resize", this.handleWindowResizing);
        this.state = {
            sectionStyle: this.getSectionStyle()
        };
    }

    public handleWindowResizing = () => {
        this.setState({
            sectionStyle: this.getSectionStyle()
        });
    }

    public getSectionStyle() : React.CSSProperties {
        return {
            display: "flex",
            flexFlow: "column",
            height: $(window).height()
        };
    }

    public render() {
        return (
            <Drawer anchor="right" open={this.props.isOpen}>
                <section style={this.state.sectionStyle}>
                    <header>
                        <StackPanel
                            orientation="vertical"
                            style={{
                            marginLeft: "5px"
                        }}>
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
                                            {subject.Code + " - " + Beautify(subject.Name)}
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
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {RawSlot
                                                    .GetBunch(subject.SlotIds)
                                                    .map((slot, index) => {
                                                        const checked = this.props.slotStates[slot.Number];
                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell padding="checkbox"><Checkbox
                                                                    checked={checked}
                                                                    onClick={() => this.props.handleSlotCheckChanged(slot.Number, checked, subject.Code)}/>
                                                                </TableCell>
                                                                <TableCell padding="dense">{slot.Number}</TableCell>
                                                                <TableCell padding="dense">{slot.Type}</TableCell>
                                                                <TableCell padding="dense">{slot.Group}</TableCell>
                                                                <TableCell padding="dense">{slot.Day}</TableCell>
                                                                <TableCell padding="dense">{slot.TimePeriod}</TableCell>
                                                                <TableCell padding="dense">{slot.WeekNumber}</TableCell>
                                                                <TableCell padding="dense">{slot.Room}</TableCell>
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
                                {
                                    JSON.stringify(this.props.errorMessages)

                                }
                            </div>
                    <footer style={footerStyle}>
                        <StackPanel orientation="horizontal" horizontalAlignment="right">
                            <Button raised={true} color="primary" onClick={this.props.handleDone}>
                                DONE
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
