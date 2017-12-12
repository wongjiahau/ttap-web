import * as $ from "jquery";
import {Button} from "material-ui-next";
import IconLeft from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import IconRight from "material-ui/svg-icons/hardware/keyboard-arrow-right";
import * as React from "react";
import {Redirect} from "react-router";
import {IGithubApiObject} from "../../interfaces/githubApiObject";
import {StackPanel} from "../panels/stackPanel";
import {MarkdownPage} from "./markdownPage";
const width = 0.7 * $(window).width();
const height = 0.825 * $(window).height();
const skipButtonStyle : React.CSSProperties = {
    position: "absolute",
    right: "10px",
    bottom: "10px"
};

interface ITutorialState {
    currentIndex : number; // zero-based
    currentUrl : string;
    redirect : boolean;
}

export class Tutorial extends React.Component < {},
ITutorialState > {
    private downloadUrls: string[];
    public constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            currentUrl: "",
            redirect: false
        };
        this.downloadUrls = [];
        this.requestTutorialFiles();
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect push={true} to="/play"/>;
        }
        return (
            <div>
                <StackPanel orientation="horizontal" horizontalAlignment="center">
                    <Button
                        onClick={this.handleClickLeft}
                        style={{ height}}><IconLeft/></Button>
                    <MarkdownPage id="mdtut" src={this.state.currentUrl} width={width} minHeight={height}/>
                    <Button
                        onClick={this.handleClickRight}
                        style={{ height }}><IconRight/></Button>
                </StackPanel>
                <Button style={skipButtonStyle} onClick={this.handleSkip}>Skip tutorial</Button>
            </div>
        );

    }

    private handleClickLeft = () => {
        if (this.state.currentIndex === 0) {
            return;
        }
        this.setState({
            currentIndex: this.state.currentIndex - 1,
            currentUrl: this.downloadUrls[this.state.currentIndex - 1]
        });
    }

    private handleClickRight = () => {
        if (this.state.currentIndex === this.downloadUrls.length - 1) {
            this.setState({redirect: true});
        }
        this.setState({
            currentIndex: this.state.currentIndex + 1,
            currentUrl: this.downloadUrls[this.state.currentIndex + 1]
        });
    }

    private handleSkip = () => {
        this.setState({redirect: true});
    }

    private requestTutorialFiles(): void {
        const request = require("request");
        const options = {
            url: "https://api.github.com/repos/wongjiahau/ttap-web/contents/tutorials",
            headers: {
                "User-Agent": "hou32hou"
            }
        };
        request(options, (error, response, body) => {
            const result = JSON.parse(body)as IGithubApiObject[];
            const urls = result.map((x) => x.download_url);
            this.downloadUrls = urls;
            this.setState({currentUrl: urls[0]});
        });
    }
}
