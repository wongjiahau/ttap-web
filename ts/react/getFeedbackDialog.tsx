import StarIcon from "material-ui-icons/Star";
import Button from "material-ui/Button";
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from "material-ui/Dialog";
import Typography from "material-ui/Typography";
import * as React from "react";
import {Redirect} from "react-router";
import {StackPanel} from "./panels/stackPanel";
declare var Cookies : any;

interface IGetFeedbackDialogState {
    isOpen : boolean;
    redirect : boolean;
}
export class GetFeedbackDialog extends React.Component < {},
IGetFeedbackDialogState > {
    public constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            redirect: false
        };
        try {
            const feedbackPrompted = Cookies.get("feedbackPrompted") === "true"; // eslint-disable-line no-undef
            if (!feedbackPrompted) {
                window.setTimeout(() => {
                    this.setState({isOpen: true});
                }, 60000 * 4.5); // Note: 60,000ms = 1 minute
            }
        } catch (e) {
            // surpess Cookies is not defined error
            // This is because Cookies is loaded from <script> via CDN
        }
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect push={true} to="/feedbackForm"/>;
        }
        return (
            <Dialog open={this.state.isOpen}>
                <DialogTitle>
                    <Typography type="display1">
                        Thank you for using TTAP!
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Will you please rate us? :)
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleNo} color="primary">
                        No thanks
                    </Button>
                    <Button raised={true} onClick={this.handleYes} color="primary">
                        Rate ttap
                        <StarIcon
                            style={{
                            color: "white",
                            marginLeft: "10px"
                        }}/>
                    </Button>
                </DialogActions>
            </Dialog>
        );

    }

    public handleNo = () => {
        this.setState({isOpen: false});
        this.setCookies();
    }

    public handleYes = () => {
        this.setState({isOpen: false, redirect: true});
        this.setCookies();
    }

    public setCookies = () => {
        Cookies.set("feedbackPrompted", "true", {expires: 7}); // eslint-disable-line no-undef
    }
}
