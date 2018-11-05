import Button from "material-ui/Button";
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from "material-ui/Dialog";
import Typography from "material-ui/Typography";
import * as React from "react";
import {Redirect} from "react-router";
import { IRawSlot } from "../model/rawSlot";
import ParseHtmlToRawSlot from "../parser/parseHtmlToRawSlot";
import {Str} from "../util/str";
import {StackPanel} from "./panels/stackPanel";
import { getLoadingElement, LoadSlotsFromUrl } from "./selectCourseView";

const divStyle : React.CSSProperties = {
    textAlign: "center",
};

const iframeStyle : React.CSSProperties = {
    height: "490px",
    width: "500px"
};

const debugging = false;
const URL = debugging
    ? "https://wongjiahau.github.io/mock-utar-unitreg/"
    : "https://unitreg.utar.edu.my/portal/courseRegStu/login.jsp";

export interface ILoginDispatchProps {
    handleLoadSlots : (rawSlots: IRawSlot[]) => void;
}

interface ILoginStateProps {
    redirect:        boolean;
    openErrorDialog: boolean;
    loading:         boolean;
}

export class Login extends React.Component < ILoginDispatchProps, ILoginStateProps > {
    private currentPage : number = 1;
    private html = "";
    public constructor(props: ILoginDispatchProps) {
        super(props);
        this.state = {
            redirect: false,
            openErrorDialog: false,
            loading: false,
        };
    }

    public render() {
        if (this.state.loading) {
            return getLoadingElement();
        }
        if (this.state.redirect) {
            return <Redirect push={true} to="/play"/>;
        }
        return (
            <div style={divStyle}>
                <StackPanel orientation="vertical" horizontalAlignment="center">
                    <iframe
                        id="unitregiframe"
                        scrolling="no"
                        style={iframeStyle}
                        onLoad={this.handleIFrameOnLoad}
                        src={URL}/>
                    <StackPanel orientation="horizontal" horizontalAlignment="center">
                        <Button raised={true} color="secondary" onClick={this.handleRefresh}>Refresh</Button>
                        <p></p>
                        <Button raised={true} color="primary" onClick={this.handleLoadDemo}>TRY DEMO</Button>
                    </StackPanel>
                </StackPanel>
                <Dialog open={this.state.openErrorDialog}>
                    <DialogTitle>
                            We can't load the data :(
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            It may be due to the following reasons:
                        </DialogContentText>
                        <ul>
                            <li>You have not met your Academic Advisor(AA).</li>
                            <li>Your time to view the data have not reach yet.</li>
                            <li>Internal error of TTAP.</li>
                        </ul>
                        <Typography gutterBottom={true}>
                            Do you want to try the demo instead?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>
                            No thanks
                        </Button>
                        <Button raised={true} onClick={this.handleLoadDemo} color="primary">
                            TRY DEMO
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    public handleLoadDemo = () => {
        this.handleClose();
        LoadSlotsFromUrl(
            "https://raw.githubusercontent.com/wongjiahau/ttap-datahub/master/Demo.json",
            "json",
            () => this.setState({loading: true}),
            (slots) => {
                this.props.handleLoadSlots(slots);
                this.setState({loading: false, redirect: true});
            },
            (error) => alert(error)
        );

    }

    public handleIFrameOnLoad = () => {
        const iframe = (document.getElementById("unitregiframe")as HTMLIFrameElement);
        if (iframe === null) { throw new Error(); }
        if (iframe.contentWindow === null) { throw new Error(); }
        const newLocation = iframe.contentWindow.location.href;
        if ((new Str(newLocation)).Contains("masterSchedule")) {
            this.html += iframe.contentWindow.document.body.innerHTML;
            if ((new Str(this.html)).Contains(`changePage('${this.currentPage + 1}')`)) {
                this.currentPage++;
                (iframe.contentWindow as any)["changePage"](this.currentPage); // changePage is a function defined in <script></script>
            } else {
                try {
                    this.props.handleLoadSlots(ParseHtmlToRawSlot(this.html));
                    this.setState({redirect: true});
                } catch (error) {
                    this.setState({openErrorDialog: true});
                    console.log(error);
                }
            }
        }
    }

    public handleRefresh = () => {
        const iframe = (document.getElementById("unitregiframe")as HTMLIFrameElement);
        iframe.src = iframe.src;
    }

    public handleClose = () => {
        this.setState({openErrorDialog: false});
    }

    public componentDidMount = () => {
        // Check if user is using the Electron-based TTAP Desktop Client
        // Refer https://github.com/electron/electron/issues/2288
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf(' electron/') > -1) {
            // OK, good
        } else {
            // Redirect the user to go download TTAP-Desktop
            alert("Please download the desktop version of TTAP.");
            window.location.href = "https://get-ttap.surge.sh";
        }
    }

}
