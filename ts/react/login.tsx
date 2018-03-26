import Button from "material-ui/Button";
import * as React from "react";
import {Redirect} from "react-router";
import {Str} from "../util/str";
import {StackPanel} from "./panels/stackPanel";

const divStyle : React.CSSProperties = {
    textAlign: "center",
};

const iframeStyle : React.CSSProperties = {
    height: "490px",
    width: "500px"
};

const debugging = true;
const URL = debugging
    ? "http://localhost/mockunitreg/"
    : "https://unitreg.utar.edu.my/portal/courseRegStu/";

export interface ILoginDispatchProps {
    handleParseHtmlToSlot : (html : string) => void;
}

interface ILoginStateProps {
    redirect : boolean;
}
export class Login extends React.Component < ILoginDispatchProps,
ILoginStateProps > {
    private currentPage : number = 1;
    private html = "";
    public constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    public render() {
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
                        src={`${URL}login.jsp`}/>
                    <Button raised={true} color="secondary" onClick={this.handleRefresh}>Refresh</Button>
                </StackPanel>
            </div>
        );
    }

    public handleIFrameOnLoad = () => {
        const iframe = (document.getElementById("unitregiframe")as HTMLIFrameElement);
        const newLocation = iframe.contentWindow.location.href;
        if ((new Str(newLocation)).Contains("masterSchedule")) {
            this.html += iframe.contentWindow.document.body.innerHTML;
            if ((new Str(this.html)).Contains(`changePage('${this.currentPage + 1}')`)) {
                this.currentPage++;
                iframe.contentWindow.changePage(this.currentPage);
            } else {
                this.props.handleParseHtmlToSlot(this.html);
                this.setState({redirect: true});
            }
        }
    }

    public handleRefresh = () => {
        const iframe = (document.getElementById("unitregiframe")as HTMLIFrameElement);
        iframe.src = iframe.src;
    }

}
