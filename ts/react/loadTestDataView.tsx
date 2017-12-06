import * as React from "react";
import * as S from "string";

interface IApiObject {
    name : string;
    path : string;
    sha : string;
    size : string;
    url : string;
    html_url : string;
    git_url : string;
    download_url : string;
    type : string;
    _links : string;
}

export interface ILoadTestDataViewProps {
    handleLoadDemo : (html : string) => void;
}

export interface ILoadTestDataViewState {
    testFiles : IApiObject[];
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
                            return ( <button key={index} onClick={() => this.handleClick(x.download_url)}>{x.name}</button> );
                        }
                    })};
            </div>
        );
    }

    private handleClick = (downloadUrl : string) : void => {
        const request = require("request");
        const options = {
            url: downloadUrl,
            headers: {
                "User-Agent": "hou32hou"
            }
        };
        request(options, (error, response, body) => {
            // console.log("error:", error); // Print the error if one occurred
            // console.log("statusCode:", response && response.statusCode); // Print the
            // response status code if a response was received console.log('body:', body);
            // // Print the HTML for the Google homepage.
            this
                .props
                .handleLoadDemo(body);
        });
    }

    private RequestTestFiles() : void {
        const request = require("request");
        const options = {
            url: "https://api.github.com/repos/wongjiahau/ttap-sample-data/contents/",
            headers: {
                "User-Agent": "hou32hou"
            }
        };
        request(options, (error, response, body) => {
            // console.log("error:", error); // Print the error if one occurred
            // console.log("statusCode:", response && response.statusCode); // Print the
            // response status code if a response was received console.log('body:', body);
            // // Print the HTML for the Google homepage.
            const result = JSON.parse(body);
            this.setState({testFiles: result});
        });
    }
}
