import * as React from "react";
import * as S from "string";
import { IGithubApiObject } from "../interfaces/githubApiObject";
import {RawSlot} from "../model/rawSlot";
import ParseHtmlToRawSlot from "../parser/parseHtmlToRawSlot";
import { ParseJsonToRawSlot } from "../parser/parseJsonToRawSlot";

export interface ILoadTestDataViewProps {
    handleLoadDemo : (rawSlots : RawSlot[]) => void;
}

export interface ILoadTestDataViewState {
    testFiles : IGithubApiObject[];
}

export class LoadTestDataView extends React.Component < ILoadTestDataViewProps,
ILoadTestDataViewState > {
    public constructor(props : ILoadTestDataViewProps) {
        super(props);
        this.state = {
            testFiles: []
        };
        this.RequestTestFiles();
    }

    public render() {
        return (
            <div>
                {this
                    .state
                    .testFiles
                    .map((x, index) => {
                        if (S(x.name).endsWith(".html")) {
                            return (
                                <button key={index} onClick={() => this.handleClick(x.download_url, "html")}>{x.name}</button>
                            );
                        } else if (S(x.name).endsWith(".json")) {
                            return (
                                <button key={index} onClick={() => this.handleClick(x.download_url, "json")}>{x.name}</button>
                            );
                        }
                    })};
            </div>
        );
    }

    private handleClick = (downloadUrl : string, fileType : "html" | "json") : void => {
        const request = require("phin");
        const options = {
            url: downloadUrl,
            headers: {
                "User-Agent": "hou32hou"
            }
        };
        request(options, (error, response) => {
            if (fileType === "html") {
                this
                    .props
                    .handleLoadDemo(ParseHtmlToRawSlot(response.body.toString()));
            } else if (fileType === "json") {
                this.props.handleLoadDemo(ParseJsonToRawSlot(response.body.toString()));
            }
        });
    }

    private RequestTestFiles() : void {
        const request = require("phin");
        const options = {
            url: "https://api.github.com/repos/wongjiahau/ttap-sample-data/contents/",
            headers: {
                "User-Agent": "hou32hou"
            }
        };
        request(options, (error, response) => {
            // console.log("error:", error); // Print the error if one occurred
            // console.log("statusCode:", response && response.statusCode); // Print the
            // response status code if a response was received console.log('body:', body);
            // // Print the HTML for the Google homepage.
            const result = JSON.parse(response.body.toString());
            this.setState({testFiles: result});
        });
    }
}
