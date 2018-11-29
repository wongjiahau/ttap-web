// Note: SBCW means Search By Considering Week Number
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import * as React from "react";

export interface ITurnOnSBCWDialogStateProps {
    isOpen: boolean;
}

export interface ITurnOnSBCWDialogDispatchProps {
    handleClose: () => void;
    handleTurnOn: () => void;
}

interface ITurnOnSBCWDialogProps extends
ITurnOnSBCWDialogDispatchProps,
ITurnOnSBCWDialogStateProps {}

export class TurnOnSBCWDialog extends React.Component<ITurnOnSBCWDialogProps, {}> {
    public render() {
        return (
            <Dialog open={this.props.isOpen}>
                <DialogTitle>{"Turn on search by considering week number?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Turning on this feature will allow TTAP to search for more timetables.
                        WARNING: This will <b><i>slow</i></b> down the search process.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        cancel
                    </Button>
                    <Button onClick={this.props.handleTurnOn} color="primary">
                        Turn on
                    </Button>
                </DialogActions>
            </Dialog>
        );

    }
}
