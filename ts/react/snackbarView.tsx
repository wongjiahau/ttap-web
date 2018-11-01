import Button from "material-ui/Button";
import {SnackBarOrigin} from "material-ui/Snackbar";
import Snackbar from "material-ui/Snackbar";
import * as React from "react";

export interface ISnackbarViewStateProps {
    isOpen : boolean;
    message : string;
}

export interface ISnackbarViewDispatchProps {
    handleClose : () => void;
}

interface ISnackbarProps extends ISnackbarViewStateProps,
ISnackbarViewDispatchProps {}

let viewCount = 0;
export class SnackbarView extends React.Component < ISnackbarProps, {} > {
    public render() {
        viewCount++;
        const okButton = (
            <Button color="secondary" onClick={this.props.handleClose}>
                Got it
            </Button>
        );
        const snackbarMessage = <span>{this.props.message}</span>;
        const anchorOrigin : SnackBarOrigin = {
            horizontal: "left",
            vertical: "bottom"
        };
        const getSnackbar = (open: boolean) =>
                <Snackbar
                    action={okButton}
                    open={open}
                    anchorOrigin={anchorOrigin}
                    message={snackbarMessage}/>;
        return (
            <div>
                {getSnackbar(this.props.isOpen && (viewCount % 2 === 0))}
                {getSnackbar(this.props.isOpen && (viewCount % 2 === 1))}
            </div>
        );
    }
}
