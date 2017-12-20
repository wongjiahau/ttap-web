import Button from "material-ui/Button";
import CircularProgress from "material-ui/Progress/CircularProgress";
import * as React from "react";
import * as Autosuggest from "react-autosuggest";
import Highlighter = require("react-highlight-words");
import {Redirect} from "react-router";
import * as S from "string";
import { Key } from "../enums/keyCodeEnum";
import {IGithubApiObject} from "../interfaces/githubApiObject";
import {RawSlot} from "../model/rawSlot";
import ParseHtmlToRawSlot from "../parser/parseHtmlToRawSlot";
import {ParseJsonToRawSlot} from "../parser/parseJsonToRawSlot";
import {StackPanel} from "./panels/stackPanel";

export interface ISelectCourseViewDispatchProps {
    handleLoadSlot : (rawSlots : RawSlot[]) => void;
}

interface ISelectCourseViewState {
    apiObjects : IGithubApiObject[]; // modify this line for integrating UTAR API
    currentSuggestions : string[];
    redirect: boolean;
    value : string;
    error: string;
    loading: boolean;
}

export class SelectCourseView extends React.Component < ISelectCourseViewDispatchProps, ISelectCourseViewState > {
    private allSuggestions : string[];
    public constructor(props) {
        super(props);
        this.state = {
            apiObjects: null,
            currentSuggestions: [],
            redirect: false,
            value: "",
            error: null,
            loading: true
        };
        this.RequestTestFiles();
    }

    public onChange = (event, {newValue}) => {
        this.setState({value: newValue});
    }

    public render() {
        if (this.state.redirect) {
            return <Redirect push={true} to="/play"/>;
        }
        const inputProps = {
            placeholder: "Type your course name here",
            value: this.state.value,
            onChange: this.onChange
        };
        if (this.state.loading) {
            return getLoadingElement();
        }
        return (
            <div onKeyDown={handleKeyDown}>
                <StackPanel orientation="vertical" horizontalAlignment="center">
                    <StackPanel orientation="horizontal" horizontalAlignment="center">
                        <Autosuggest
                            suggestions={this.state.currentSuggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={(suggestion) => suggestion}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps}/>
                        <Button style={{ height: "50px" }}
                            id="gobtn"
                            raised={true}
                            onClick={this.handleOnClick}
                            color="accent">GO</Button>
                    </StackPanel>
                    {!this.state.error ? null :
                        <p style={{color: "Red"}}>{this.state.error}</p>}
                </StackPanel>
            </div>
        );
    }

    public onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            currentSuggestions: getSuggestions(value, this.allSuggestions)
        });
    }

    public onSuggestionsClearRequested = () => {
        this.setState({currentSuggestions: []});
    }

    public renderSuggestion = (suggestion) => {
        return (<div onClick={this.handleOnClick}>
                    <Highlighter
                        searchWords={[this.state.value]}
                        textToHighlight={suggestion}/>
                </div>);
    }

    public handleOnClick = () => {
        try {
            const download_url = this
                .state
                .apiObjects
                .filter((x) => x.name === this.state.value)[0]
                .download_url;
            this.LoadSelectedData(download_url, this.state.value.split(".")[1]);
        } catch (e) {
            this.setState({
                error:  "'" + this.state.value + "' is not a valid course name. Please try other name."
            });
        }
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
            this.setState({apiObjects: result, loading: false});
            this.allSuggestions = this
                .state
                .apiObjects
                .map((x) => x.name);
        });
    }

    private LoadSelectedData = (downloadUrl : string, fileType : string) : void => {
        this.setState({loading: true});
        const request = require("phin");
        const options = {
            url: downloadUrl,
            headers: {
                "User-Agent": "hou32hou"
            }
        };
        request(options, (error, response) => {
            if (error) {
                alert("Please retry again.");
                return;
            }
            if (fileType === "html") {
                this
                .props
                .handleLoadSlot(ParseHtmlToRawSlot(response.body.toString()));
            } else if (fileType === "json") {
                this
                .props
                .handleLoadSlot(ParseJsonToRawSlot(response.body.toString()));
            } else {
                throw new Error("Unknown file type: " + fileType);
            }
            this.setState({redirect: true});
        });

    }
}

function getSuggestions(value : string, basket : string[]) : string[] {
    const result = basket.filter((x) => S(x).contains(value));
    return result;
}

function handleKeyDown(e) {
    if (e.keyCode === Key.Enter) {
        (document.getElementById("gobtn") as HTMLButtonElement).click();
    }
}

function getLoadingElement() {
    return (
        <StackPanel orientation="vertical" horizontalAlignment="center">
            <br/>
            <CircularProgress/>
        </StackPanel>
    );
}
