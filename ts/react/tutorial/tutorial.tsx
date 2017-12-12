import {Button} from "material-ui-next";
import * as React from "react";
import {Redirect} from "react-router";
import {IGithubApiObject} from "../../interfaces/githubApiObject";
import {CounterView} from "../counterView";
import {StackPanel} from "../panels/stackPanel";
import {MarkdownPage} from "./markdownPage";

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
            <StackPanel orientation="vertical" horizontalAlignment="center">
                <MarkdownPage src={this.state.currentUrl}/>
                <CounterView
                    handleClickLeft={this.handleClickLeft}
                    handleClickRight={this.handleClickRight}
                    maxInclusive={this.downloadUrls.length}
                    current={this.state.currentIndex + 1}/>
                <Button style={skipButtonStyle} onClick={this.handleSkip}>Skip tutorial</Button>
            </StackPanel>
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
