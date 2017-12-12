// term of service and privacy policy
import Paper from "material-ui/Paper";
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
    minHeight: number;
}

export class MarkdownPage extends React.Component <IMarkdownPageProp, IMarkdownPageState> {
    constructor(props) {
        super(props);
        this.state = {
            markdownSource: "Loading ... ",
        };
    }

    public render() {
        const paperStyle : React.CSSProperties = {
            textAlign : "left",
            paddingTop: "15px",
            paddingRight: "40px",
            paddingLeft: "40px",
            width: this.props.width,
            minHeight: this.props.minHeight
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
