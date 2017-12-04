import Button from "material-ui-next/Button";
import {Origin} from "material-ui-next/Snackbar";
import Snackbar from "material-ui-next/Snackbar";
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
            <Button color="accent" dense={true} onClick={this.props.handleClose}>
                Got it
            </Button>
        );
        const snackbarMessage = <span>{this.props.message}</span>;
        const anchorOrigin : Origin = {
            horizontal: "center",
            vertical: "bottom"
        };
        return (
            <div>
                <Snackbar
                    action={okButton}
                    open={this.props.isOpen && (viewCount % 2 === 0)}
                    anchorOrigin={anchorOrigin}
                    SnackbarContentProps={{
                    "aria-describedby": "message-id"
                }}
                    message={snackbarMessage}/>
                <Snackbar
                    action={okButton}
                    open={this.props.isOpen && (viewCount % 2 === 1)}
                    anchorOrigin={anchorOrigin}
                    SnackbarContentProps={{
                    "aria-describedby": "message-id"
                }}
                    message={snackbarMessage}/>
            </div>
        );
    }
}
