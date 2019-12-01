import { CircularProgress, MobileStepper, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconLeft from "@material-ui/icons/KeyboardArrowLeft";
import IconRight from "@material-ui/icons/KeyboardArrowRight";
import * as React from "react";
import {Redirect} from "react-router";
import {IGithubApiObject} from "../../interfaces/githubApiObject";
import {StackPanel} from "../panels/stackPanel";
import {MarkdownPage} from "./markdownPage";
const WIDTH = window.innerWidth;
const HEIGHT = 0.75 * window.innerHeight;
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
    maxIndex: number;
    redirect : boolean;
}

export class Tutorial extends React.Component < {},
ITutorialState > {
    private downloadUrls: string[];
    public constructor(props: {}) {
        super(props);
        this.state = {
            currentIndex: 0,
            maxIndex: 0,
            currentUrl: null,
            redirect: false,
        };
        this.downloadUrls = [];
        this.requestTutorialFiles();
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect push={true} to="/login"/>;
        }

        return (
            <div style={{display: 'grid'}}>
                <div style={{display: 'grid', alignContent: 'center', justifyContent: 'center'}}>
                    <Paper>
                        <MarkdownPage id="mdtut" src={this.state.currentUrl}
                            width={0.60 * WIDTH} height={HEIGHT}/>
                        <MobileStepper
                            steps={this.state.maxIndex + 1}
                            position="static"
                            activeStep={this.state.currentIndex}
                            nextButton={
                                <Button size="small" onClick={this.handleClickRight}>
                                    Next
                                    <IconRight />
                                </Button>}
                            backButton={
                                <Button size="small" onClick={this.handleClickLeft}
                                    disabled={this.state.currentIndex === 0}>
                                    <IconLeft />
                                    Back
                                </Button>}
                        />
                    </Paper>
                </div>
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
        fetch("https://api.github.com/repos/wongjiahau/ttap-web/contents/tutorials", {
            headers: {
                "User-Agent": "hou32hou"
            }
        })
        .then((response) => response.json())
        .then((result: IGithubApiObject[]) => {
            const urls = result.map((x) => x.download_url);
            this.downloadUrls = urls;
            this.setState({
                currentUrl: urls[0],
                maxIndex: this.downloadUrls.length - 1,
            });
        });
    }
}
