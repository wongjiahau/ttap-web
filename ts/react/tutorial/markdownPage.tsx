// term of service and privacy policy
import * as $ from "jquery";
import Paper from "material-ui/Paper";
import * as React from "react";
import * as ReactMarkdown from "react-markdown";

const divStyle : React.CSSProperties = {
    textAlign: "center",
};

const paperStyle : React.CSSProperties = {
    textAlign : "left",
    padding: "40px",
    margin: "20px",
    width: 0.7 * $(window).width(),
    height: 0.625 * $(window).height()
};

interface IMarkdownPageState {
    markdownSource: string;
}

interface IMarkdownPageProp {
    src: string;
}

export class MarkdownPage extends React.Component <IMarkdownPageProp, IMarkdownPageState> {
    constructor(props) {
        super(props);
        this.state = {
            markdownSource: "Loading ... ",
        };
    }

    public render() {
        return (
            <div style={divStyle} className="markdown-body">
                <Paper style={paperStyle}>
                    <ReactMarkdown source={this.state.markdownSource}/>
                </Paper>
            </div>
        );
    }

    public componentWillReceiveProps(nextProps: IMarkdownPageProp) {
        this.requestMarkdownSource(nextProps.src);
    }

    private requestMarkdownSource(src: string) {
        const http = require("http");
        const request = http.get(src, (response) => {
            response.on("data", (loadedData) => {
                    this.setState({markdownSource: loadedData.toString()});
                });
        });
    }
}
