"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const React = require("react");
const ReactMarkdown = require("react-markdown");
class MarkdownPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdownSource: null,
        };
        if (this.props.src) {
            this.requestMarkdownSource(this.props.src);
        }
    }
    render() {
        const paperStyle = Object.assign({ overflowY: "auto", paddingTop: "15px", paddingRight: "40px", paddingLeft: "40px", width: this.props.width, height: this.props.height }, (this.state.markdownSource === null ? {
            display: "grid",
            placeContent: "center"
        } : {}));
        return (React.createElement("div", { id: this.props.id, className: "markdown-body" },
            " ",
            React.createElement("link", { rel: "stylesheet", href: "github-markdown.min.css" }),
            React.createElement("div", { style: paperStyle }, this.state.markdownSource === null ?
                React.createElement(core_1.CircularProgress, { size: 50 }) :
                React.createElement(ReactMarkdown, { source: this.state.markdownSource }))));
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ markdownSource: null });
        this.requestMarkdownSource(nextProps.src);
    }
    requestMarkdownSource(src) {
        const http = require("http");
        const request = http.get(src, (response) => {
            response.on("data", (loadedData) => {
                this.setState({ markdownSource: loadedData.toString() });
            });
        });
    }
}
exports.MarkdownPage = MarkdownPage;
//# sourceMappingURL=markdownPage.js.map