import IconLeft from "material-ui-icons/KeyboardArrowLeft";
import IconRight from "material-ui-icons/KeyboardArrowRight";
import Button from "material-ui/Button";
import * as React from "react";
import {Redirect} from "react-router";
import {IGithubApiObject} from "../../interfaces/githubApiObject";
import {StackPanel} from "../panels/stackPanel";
import {MarkdownPage} from "./markdownPage";
const WIDTH = window.innerWidth;
const HEIGHT = 0.83 * window.innerHeight;
const skipButtonStyle : React.CSSProperties = {
    fontSize: "12px",
    position: "fixed",
    right: "10px",
    bottom: "10px"
};

const leftRightButtonStyle : React.CSSProperties = {
    height: HEIGHT,
    width: 0.05 * WIDTH
};

interface ITutorialState {
    currentIndex : number; // zero-based
    currentUrl : string | null;
    redirect : boolean;
}

export class Tutorial extends React.Component < {},
ITutorialState > {
    private downloadUrls: string[];
    public constructor(props: {}) {
        super(props);
        this.state = {
            currentIndex: 0,
            currentUrl: null,
            redirect: false
        };
        this.downloadUrls = [];
        this.requestTutorialFiles();
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect push={true} to="/select"/>;
        }
        return (
            <div>
                <StackPanel orientation="horizontal" horizontalAlignment="center">
                    <Button
                        onClick={this.handleClickLeft}
                        style={leftRightButtonStyle}><IconLeft/></Button>
                    <MarkdownPage id="mdtut" src={this.state.currentUrl} width={0.65 * WIDTH} height={HEIGHT}/>
                    <Button
                        onClick={this.handleClickRight}
                        style={leftRightButtonStyle}><IconRight/></Button>
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
        const request = require("phin");
        const options = {
            url: "https://api.github.com/repos/wongjiahau/ttap-web/contents/tutorials",
            headers: {
                "User-Agent": "hou32hou"
            }
        };
        request(options, (error: any, response: any) => {
            const result = JSON.parse(response.body.toString())as IGithubApiObject[];
            const urls = result.map((x) => x.download_url);
            this.downloadUrls = urls;
            this.setState({currentUrl: urls[0]});
        });
    }
}
