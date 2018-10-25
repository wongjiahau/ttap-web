import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from "material-ui/Dialog";
import CircularProgress from "material-ui/Progress/CircularProgress";
import * as React from "react";
import * as Autosuggest from "react-autosuggest";
import Highlighter = require("react-highlight-words");
import {Redirect} from "react-router";

import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import { CantFindMyCourseFormUrl, ReportLoadDataErrorFormUrl } from "../constants";
import { Key } from "../enums/keyCodeEnum";
import {IGithubApiObject} from "../interfaces/githubApiObject";
import {IRawSlot, RawSlot} from "../model/rawSlot";
import ParseHtmlToRawSlot from "../parser/parseHtmlToRawSlot";
import {ParseJsonToRawSlot} from "../parser/parseJsonToRawSlot";
// import { HENG_2017_APR } from "../tests/testData/heng_2017_apr";
import { Str } from "../util/str";
import {StackPanel} from "./panels/stackPanel";
import { VerticalAlign } from "./panels/verticalAlign";

export interface ISelectCourseViewDispatchProps {
    handleLoadSlot : (rawSlots : RawSlot[]) => void;
}

interface ISelectCourseViewState {
    currentSuggestions : IGithubApiObject[];
    redirect: boolean;
    value : string;
    serverError: string;
    loading: boolean;
    suggestionIsFound: boolean;
    openErrorDialog: boolean;
}

const GET_ALL_SLOTS = false;

export class SelectCourseView extends React.Component < ISelectCourseViewDispatchProps, ISelectCourseViewState > {
    private allSuggestions : IGithubApiObject[];
    private selectedSuggestion: IGithubApiObject;
    public constructor(props) {
        super(props);
        this.state = {
            currentSuggestions: [],
            redirect: false,
            value: "",
            serverError: null,
            loading: true,
            suggestionIsFound: true,
            openErrorDialog: false
        };

        if (GET_ALL_SLOTS) {
            setTimeout(() => {
                LoadSlotsFromUrl(
                    "https://raw.githubusercontent.com/wongjiahau/ttap-datahub/master/fes-all-slots.json",
                    "json",
                    ()      =>  this.setState({loading: true}),
                    (slots) => {
                        this.props.handleLoadSlot(slots);
                        this.setState({redirect: true});
                    },
                    ()      => this.setState({openErrorDialog: true, loading: false}),
                );
            }, 500);
            return;
        }

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
            placeholder: "Example: Software Engineering",
            value: this.state.value,
            onChange: this.onChange
        };
        if (!this.state.openErrorDialog && this.state.loading) {
            return getLoadingElement();
        }
        return (
            <VerticalAlign>
                <StackPanel orientation="vertical" horizontalAlignment="center">
                    <Dialog open={this.state.openErrorDialog}>
                        <DialogTitle> Sorry :( </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                We faced some problem while trying to load the data for you. <br/>
                                Do you want to report this problem so that we might try to fix it?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.setState({openErrorDialog: false})}>
                                No, thanks
                            </Button>
                            <Button raised={true} onClick={this.handleReportBug} color="primary">
                                Report problem
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <StackPanel orientation="horizontal" horizontalAlignment="center">
                        <Typography type="headline">Type in your course name ⇨ </Typography>
                        <Autosuggest
                            suggestions={this.state.currentSuggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            onSuggestionSelected={this.onSuggestionSelected}
                            getSuggestionValue={(suggestion) => this.state.value}
                            renderSuggestion={this.renderSuggestion}
                            highlightFirstSuggestion={true}
                            alwaysRenderSuggestions={true}
                            inputProps={inputProps}/>
                            {""}
                    </StackPanel>
                    <Button style={{visibility: this.state.suggestionIsFound ? "hidden" : "visible" }}
                        onClick={openGetIdForm}
                        color="secondary" raised={true}>I can't find my course</Button>
                    {!this.state.serverError ? null : <p style={{color: "Red"}}>{this.state.serverError}</p>}

                </StackPanel>
            </VerticalAlign>
        );
    }

    // public componentDidMount() {
    //     this.props.handleLoadSlot(HENG_2017_APR());
    //     this.setState({
    //         redirect: true
    //     });
    // }

    public onSuggestionsFetchRequested = (event) => {
        const newSuggestions =
                this.allSuggestions.filter((x) =>
                new Str(x.name.toLowerCase().split(".")[0]).Contains(event.value.toLowerCase()) &&
                !new Str(x.name).Contains("_") &&
                !new Str(x.name).Contains(".md") &&
                x.download_url !== null
            );
        this.setState({
            currentSuggestions: newSuggestions,
            suggestionIsFound: newSuggestions.length > 0
        });
    }

    public onSuggestionsClearRequested = () => {
        this.setState({currentSuggestions: []});
    }

    public onSuggestionSelected = (event, {suggestion}) => {
        this.tryLoadData(suggestion);
    }

    public renderSuggestion = (suggestion) => {
        return (<Highlighter textToHighlight={suggestion.name.split(".")[0]} searchWords={[this.state.value]} />);
    }

    public tryLoadData = (apiObject: IGithubApiObject) => {
        try {
            LoadSlotsFromUrl(
                apiObject.download_url,
                apiObject.name.split(".")[1],
                ()      =>  this.setState({loading: true}),
                (slots) => {
                    this.props.handleLoadSlot(slots);
                    this.setState({redirect: true});
                },
                ()      => this.setState({openErrorDialog: true, loading: false}),
            );
        } catch (e) {
            this.setState({
                serverError:  "'" + this.state.value + "' is not a valid course name. Please try other name."
            });
        }
    }

    private RequestTestFiles() : void {
        const url = "https://api.github.com/repos/wongjiahau/ttap-datahub/contents/";
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({loading: false});
            this.allSuggestions = data;
        })
        .catch((error) => {
            console.log(error);
            this.setState({serverError: "Unable to fetch data from server. Please try again later.", loading: false});
        });
    }

    private handleReportBug = () => {
        this.setState({openErrorDialog: false});
        window.open(ReportLoadDataErrorFormUrl, "_blank");
    }

}

export function getLoadingElement() {
    return (
        <VerticalAlign>
            <StackPanel orientation="vertical" horizontalAlignment="center">
                <br/>
                <CircularProgress/>
            </StackPanel>
        </VerticalAlign>
    );
}

function openGetIdForm() {
    window.open(CantFindMyCourseFormUrl, "_blank");
}

export const LoadSlotsFromUrl = (
    downloadUrl : string,
    fileType : string,
    started : () => void,
    successed : (loadedSlots: IRawSlot[]) => void,
    failed : (error: any) => void
) : void => {
    started();

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {

        // Only run if the request is complete
        if (xhr.readyState !== 4) { return; }

        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
            // What do when the request is successful
            let parser : (src: string) => RawSlot[];
            if (fileType === "html") {
                parser = ParseHtmlToRawSlot;
            } else if (fileType === "json") {
                parser = ParseJsonToRawSlot;
            } else {
                throw new Error("Unknown file type: " + fileType);
            }
            try {
                const slots = parser(xhr.responseText).map(RawSlot.ResetUid);
                successed(slots);
            } catch (error) {
                console.log(error);
                failed(error);
            }
        } else {
            alert("Data loading is failed: STATUS " + xhr.status);
        }

    };
    xhr.open("GET", downloadUrl);
    xhr.send();
};
