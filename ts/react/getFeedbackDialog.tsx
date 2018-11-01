import ThumbUpIcon from "material-ui-icons/ThumbUp";
import Button from "material-ui/Button";
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from "material-ui/Dialog";
import * as React from "react";
import { FeedbackFormUrl } from "../constants";
import {StackPanel} from "./panels/stackPanel";
declare var Cookies : any;

interface IGetFeedbackDialogState {
    isOpen : boolean;
}
export class GetFeedbackDialog extends React.Component < {},
IGetFeedbackDialogState > {
    public constructor(props: {}) {
        super(props);
        this.state = {
            isOpen: false,
        };
        try {
            const feedbackPrompted = Cookies.get("feedbackPrompted") === "true"; // eslint-disable-line no-undef
            const HOW_MANY_MINUTE = 4.25; // This is just a guess
            if (!feedbackPrompted) {
                window.setTimeout(() => {
                    this.setState({isOpen: true});
                }, 60000 * HOW_MANY_MINUTE); // Note: 60,000ms = 1 minute
            }
        } catch (e) {
            // surpess Cookies is not defined error
            // This is because Cookies is loaded from <script> via CDN
        }
    }
    public render() {
        return (
            <Dialog open={this.state.isOpen}>
                <img style={{height: "350px"}} src="https://image.ibb.co/gaKihc/thank_3148710_640.png"/>
                <DialogTitle>
                        Thank you for using TTAP!
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
                        <ThumbUpIcon
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
    }

    public handleYes = () => {
        this.setState({isOpen: false});
        this.setCookies();
        window.open(FeedbackFormUrl, "_blank");
    }

    public setCookies = () => {
        Cookies.set("feedbackPrompted", "true", {expires: 7}); // eslint-disable-line no-undef
    }
}
