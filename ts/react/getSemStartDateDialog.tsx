import { DialogTitle, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import * as React from "react";
import {StackPanel} from "./panels/stackPanel";
const format = require("date-fns/format");

export interface IGetSemStartDateDialogState {
    date : Date | null;
    error : boolean;
    helperText: string;
    dateIsSelected : boolean;
}

export interface IGetSemStartDateDialogProps {
    isOpen : boolean;
    handleSaveToGoogleCalendar : (semStartDate : Date) => void;
    handleClose : () => void;
}

export class GetSemStartDateDialog extends React.Component < IGetSemStartDateDialogProps,
IGetSemStartDateDialogState > {
    public constructor(props: IGetSemStartDateDialogProps) {
        super(props);
        this.state = {
            date: null,
            error: false,
            helperText: "",
            dateIsSelected: false
        };
    }

    public handleDateChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const chosenDate = new Date(Date.parse(event.target.value));
        if (chosenDate.getDay() !== 1) {
            this.setState({
                helperText: "Error: the date you chose is not a Monday.",
                error: true,
                dateIsSelected: false
            });
            return;
        }
        this.setState({
            helperText: `The date you picked is ${format(chosenDate, "DD-MMMM-YYYY (dddd)")}.`,
            error: false,
            dateIsSelected: true,
            date: chosenDate
        });
    }

    public render() {
        const buttonStyle : React.CSSProperties = {
            marginRight: "10px"
        };
        return (
            <Dialog open={this.props.isOpen}>
                <DialogTitle>Pick a date that represent the
                    <br/>
                    Monday of Week One of next semester.
                </DialogTitle>
                    <div>
                    <StackPanel orientation="vertical" horizontalAlignment="center">
                        <TextField
                                id="date"
                                label="Date"
                                type="date"
                                error={this.state.error}
                                helperText={this.state.helperText}
                                onChange={this.handleDateChanged}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                            {""}
                    </StackPanel>
                    <StackPanel style={{ margin: "10px" }}
                        orientation="horizontal"
                        horizontalAlignment="right">
                        <Button style={buttonStyle} onClick={this.props.handleClose}>Cancel</Button>
                        <Button
                            onClick={() => {
                                if (this.state.date) {
                                    this.props.handleSaveToGoogleCalendar(this.state.date);
                                }
                            }}
                            style={buttonStyle}
                            disabled={!this.state.dateIsSelected}
                            variant="contained"
                            color="primary">Add to Google Calendar</Button>
                    </StackPanel>
                </div>
            </Dialog>
        );
    }
}
