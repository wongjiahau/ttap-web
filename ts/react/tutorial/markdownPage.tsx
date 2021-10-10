import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import * as ReactMarkdown from "react-markdown";

interface IMarkdownPageState {
  markdownSource: string | null;
}

interface IMarkdownPageProp {
  id?: string;
  src: string | null;
  width: number;
  height: number;
}

export class MarkdownPage extends React.Component<
  IMarkdownPageProp,
  IMarkdownPageState
> {
  constructor(props: IMarkdownPageProp) {
    super(props);
    this.state = {
      markdownSource: null,
    };
    if (this.props.src) {
      this.requestMarkdownSource(this.props.src);
    }
  }

  public render() {
    const paperStyle: React.CSSProperties = {
      overflowY: "auto",
      paddingTop: "15px",
      paddingRight: "40px",
      paddingLeft: "40px",
      width: this.props.width,
      height: this.props.height,
      ...(this.state.markdownSource === null
        ? {
            display: "grid",
            placeContent: "center",
          }
        : {}),
    };
    return (
      <div id={this.props.id} className="markdown-body">
        {/* Markdown css */}{" "}
        <link rel="stylesheet" href="github-markdown.min.css" />
        <div style={paperStyle}>
          {this.state.markdownSource === null ? (
            <CircularProgress size={50} />
          ) : (
            <ReactMarkdown source={this.state.markdownSource} />
          )}
        </div>
      </div>
    );
  }

  public componentWillReceiveProps(nextProps: IMarkdownPageProp) {
    this.setState({ markdownSource: null });
    this.requestMarkdownSource(nextProps.src);
  }

  private requestMarkdownSource(src: string | null) {
    const http = require("http");
    const request = http.get(src, (response: any) => {
      response.on("data", (loadedData: any) => {
        this.setState({ markdownSource: loadedData.toString() });
      });
    });
  }
}
