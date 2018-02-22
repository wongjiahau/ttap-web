// term of service and privacy policy
import Paper from "material-ui/Paper";
import { CircularProgress } from "material-ui/Progress";
import * as React from "react";
import * as ReactMarkdown from "react-markdown";

const divStyle : React.CSSProperties = {
    textAlign: "center",
};

interface IMarkdownPageState {
    markdownSource: string;
}

interface IMarkdownPageProp {
    id?: string;
    src: string;
    width: number;
    height: number;
}

export class MarkdownPage extends React.Component <IMarkdownPageProp, IMarkdownPageState> {
    constructor(props) {
        super(props);
        this.state = {
            markdownSource: null,
        };
        if (this.props.src) {
            this.requestMarkdownSource(this.props.src);
        }
    }

    public render() {
        if (this.state.markdownSource === null) {
            return <CircularProgress size={50}/>;
        }
        const paperStyle : React.CSSProperties = {
            overflowY: "auto",
            textAlign : "left",
            paddingTop: "15px",
            paddingRight: "40px",
            paddingLeft: "40px",
            width: this.props.width,
            height: this.props.height
        };
        return (
            <div id={this.props.id} style={divStyle} className="markdown-body">
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
