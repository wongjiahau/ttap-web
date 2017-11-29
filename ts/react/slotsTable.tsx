import IconArrowRight from "material-ui-icons/ArrowForward";
import Button from "material-ui-next/Button";
import Checkbox from "material-ui-next/Checkbox";
import Divider from "material-ui-next/Divider";
import Drawer from "material-ui-next/Drawer";
import Table, {TableBody, TableCell, TableHead, TableRow} from "material-ui-next/Table";
import Typography from "material-ui-next/Typography";
import * as React from "react";
import {RawSlot} from "../model/rawSlot";
import {Subject} from "../model/subject";
import {StackPanel} from "./panels/stackPanel";
import {iconStyle} from "./styles";

const titleStyle : React.CSSProperties = {
    marginLeft: "15px",
    marginTop: "10px"
};

export interface ISlotsTableProps {
    slotStates: boolean[];
    selectedSubjects : Subject[];
    isOpen : boolean;
    handleClose : () => void;
    handleSlotCheckChanged : (slotNumber: number, checked: boolean) => void;
}

export class SlotsTable extends React.Component < ISlotsTableProps, {}> {
    public render() {
        return (
            <Drawer anchor="right" open={this.props.isOpen}>
                <div>
                    <StackPanel orientation="horizontal">
                        <Button raised={true} color="accent" onClick={this.props.handleClose}>
                            <IconArrowRight style={iconStyle}/>
                            HIDE
                        </Button>
                        <Typography style={{ marginLeft: "10px" }} type="display1">Slots of selected subjects</Typography>
                    </StackPanel>
                    <Divider style={{ marginBottom: "10px", marginTop: "5px" }}/> {this
                        .props
                        .selectedSubjects
                        .map((s) => {
                            return (
                                <div key={s.Code}>
                                    <Typography style={titleStyle} type="subheading">
                                        {s.Code + " - " + s.Name}
                                    </Typography>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell padding="dense">{""}</TableCell>
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
                                                .GetBunch(s.SlotIds)
                                                .map((slot, index) => {
                                                    const checked = this.props.slotStates[slot.HashId];
                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell padding="checkbox"><Checkbox checked={checked} onClick={() => this.props.handleSlotCheckChanged(slot.HashId, checked)}/></TableCell>
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
                        })}

                </div>

            </Drawer>
        );
    }
}
