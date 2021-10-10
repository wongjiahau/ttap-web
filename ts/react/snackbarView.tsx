import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { SnackbarOrigin } from "@material-ui/core/Snackbar";
import * as React from "react";

export interface ISnackbarViewStateProps {
  isOpen: boolean;
  message: string;
}

export interface ISnackbarViewDispatchProps {
  handleClose: () => void;
}

interface ISnackbarProps
  extends ISnackbarViewStateProps,
    ISnackbarViewDispatchProps {}

let viewCount = 0;
export class SnackbarView extends React.Component<ISnackbarProps, {}> {
  public render() {
    viewCount++;
    const okButton = (
      <Button color="secondary" onClick={this.props.handleClose}>
        Got it
      </Button>
    );
    const snackbarMessage = <span>{this.props.message}</span>;
    const anchorOrigin: SnackbarOrigin = {
      horizontal: "left",
      vertical: "bottom",
    };
    const getSnackbar = (open: boolean) => (
      <Snackbar
        action={okButton}
        open={open}
        anchorOrigin={anchorOrigin}
        message={snackbarMessage}
      />
    );
    return (
      <React.Fragment>
        {getSnackbar(this.props.isOpen && viewCount % 2 === 0)}
        {getSnackbar(this.props.isOpen && viewCount % 2 === 1)}
      </React.Fragment>
    );
  }
}
