"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Button_1 = require("@material-ui/core/Button");
const KeyboardArrowLeft_1 = require("@material-ui/icons/KeyboardArrowLeft");
const KeyboardArrowRight_1 = require("@material-ui/icons/KeyboardArrowRight");
const React = require("react");
const react_router_1 = require("react-router");
const markdownPage_1 = require("./markdownPage");
const WIDTH = window.innerWidth;
const HEIGHT = 0.75 * window.innerHeight;
const skipButtonStyle = {
    fontSize: "12px",
    position: "fixed",
    right: "10px",
    bottom: "10px"
};
const leftRightButtonStyle = {
    height: HEIGHT,
    width: 0.05 * WIDTH
};
class Tutorial extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickLeft = () => {
            if (this.state.currentIndex === 0) {
                return;
            }
            this.setState({
                currentIndex: this.state.currentIndex - 1,
                currentUrl: this.downloadUrls[this.state.currentIndex - 1]
            });
        };
        this.handleClickRight = () => {
            if (this.state.currentIndex === this.downloadUrls.length - 1) {
                this.setState({ redirect: true });
            }
            this.setState({
                currentIndex: this.state.currentIndex + 1,
                currentUrl: this.downloadUrls[this.state.currentIndex + 1]
            });
        };
        this.handleSkip = () => {
            this.setState({ redirect: true });
        };
        this.state = {
            currentIndex: 0,
            maxIndex: 0,
            currentUrl: null,
            redirect: false,
        };
        this.downloadUrls = [];
        this.requestTutorialFiles();
    }
    render() {
        if (this.state.redirect) {
            return React.createElement(react_router_1.Redirect, { push: true, to: "/login" });
        }
        return (React.createElement("div", { style: { display: 'grid' } },
            React.createElement("div", { style: { display: 'grid', alignContent: 'center', justifyContent: 'center' } },
                React.createElement(core_1.Paper, null,
                    React.createElement(markdownPage_1.MarkdownPage, { id: "mdtut", src: this.state.currentUrl, width: 0.60 * WIDTH, height: HEIGHT }),
                    React.createElement(core_1.MobileStepper, { steps: this.state.maxIndex + 1, position: "static", activeStep: this.state.currentIndex, nextButton: React.createElement(Button_1.default, { size: "small", onClick: this.handleClickRight },
                            "Next",
                            React.createElement(KeyboardArrowRight_1.default, null)), backButton: React.createElement(Button_1.default, { size: "small", onClick: this.handleClickLeft, disabled: this.state.currentIndex === 0 },
                            React.createElement(KeyboardArrowLeft_1.default, null),
                            "Back") }))),
            React.createElement(Button_1.default, { style: skipButtonStyle, onClick: this.handleSkip }, "Skip tutorial")));
    }
    requestTutorialFiles() {
        fetch("https://api.github.com/repos/wongjiahau/ttap-web/contents/tutorials", {
            headers: {
                "User-Agent": "hou32hou"
            }
        })
            .then((response) => response.json())
            .then((result) => {
            const urls = result.map((x) => x.download_url);
            this.downloadUrls = urls;
            this.setState({
                currentUrl: urls[0],
                maxIndex: this.downloadUrls.length - 1,
            });
        });
    }
}
exports.Tutorial = Tutorial;
//# sourceMappingURL=tutorial.js.map