import Button from "material-ui-next/Button";
import Dialog, {DialogTitle} from "material-ui-next/Dialog";
import * as React from "react";
import Flatpickr from "react-flatpickr";
import {StackPanel} from "./panels/stackPanel";

export interface IGetSemStartDateDialogState {
    date : Date;
    dateSelected : boolean;
}

export class GetSemStartDateDialog extends React.Component < {},
IGetSemStartDateDialogState > {
    public constructor(props) {
        super(props);
        this.state = {
            date: null,
            dateSelected: false
        };
    }

    public handleDateChanged = (date : Date) => {
        this.setState({date, dateSelected: true});
    }

    public render() {
        const flatpickerOptions = {
            altInput: true,
            disable: [(date) => {
                    // disable date that are not Monday
                    return (date.getDay() !== 1);
                }
            ]
        };

        const buttonStyle : React.CSSProperties = {
            marginRight: "10px"
        };
        return (
            <Dialog open={true}>
                <DialogTitle>Pick a date that represent the
                    <br/>
                    Monday of Week One of next semester.</DialogTitle>
                <div>
                    <StackPanel orientation="vertical" horizontalAlignment="center">
                        <Flatpickr
                            placeholder="Pick date . . ."
                            options={flatpickerOptions}
                            onChange={this.handleDateChanged}/>
                        {""}
                    </StackPanel>
                    <StackPanel
                        style={{
                        margin: "10px"
                    }}
                        orientation="horizontal"
                        horizontalAlignment="right">
                        <Button style={buttonStyle}>Cancel</Button>
                        <Button
                            style={buttonStyle}
                            disabled={!this.state.dateSelected}
                            raised={true}
                            color="primary">Add to Google Calendar</Button>
                    </StackPanel>
                </div>
            </Dialog>
        );
    }
}
