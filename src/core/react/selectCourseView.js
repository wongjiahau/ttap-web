"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CircularProgress_1 = require("@material-ui/core/CircularProgress");
const Dialog_1 = require("@material-ui/core/Dialog");
const React = require("react");
// @ts-ignore
const Autosuggest = require("react-autosuggest");
const Highlighter = require("react-highlight-words");
const react_router_1 = require("react-router");
const core_1 = require("@material-ui/core");
const Button_1 = require("@material-ui/core/Button");
const Typography_1 = require("@material-ui/core/Typography");
const constants_1 = require("../constants");
const rawSlot_1 = require("../model/rawSlot");
const parseJsonToRawSlot_1 = require("../parser/parseJsonToRawSlot");
const parseStudentHtmlToRawSlot_1 = require("../parser/parseStudentHtmlToRawSlot");
// import { HENG_2017_APR } from "../tests/testData/heng_2017_apr";
const str_1 = require("../util/str");
const stackPanel_1 = require("./panels/stackPanel");
const verticalAlign_1 = require("./panels/verticalAlign");
const GET_ALL_SLOTS = false;
class SelectCourseView extends React.Component {
    constructor(props) {
        super(props);
        this.allSuggestions = [];
        this.onChange = (event, { newValue }) => {
            this.setState({ value: newValue });
        };
        // The code below should be uncommented during development phase
        // public componentDidMount() {
        //     this.props.handleLoadSlot(HENG_2017_APR());
        //     this.setState({
        //         redirect: true
        //     });
        // }
        this.onSuggestionsFetchRequested = (event) => {
            const newSuggestions = this.allSuggestions.filter((x) => new str_1.Str(x.name.toLowerCase().split(".")[0]).Contains(event.value.toLowerCase()) &&
                !new str_1.Str(x.name).Contains("_") &&
                !new str_1.Str(x.name).Contains(".md") &&
                x.download_url !== null);
            this.setState({
                currentSuggestions: newSuggestions,
                suggestionIsFound: newSuggestions.length > 0
            });
        };
        this.onSuggestionsClearRequested = () => {
            this.setState({ currentSuggestions: [] });
        };
        this.onSuggestionSelected = (event, { suggestion }) => {
            this.tryLoadData(suggestion);
        };
        this.renderSuggestion = (suggestion) => {
            return (React.createElement(Highlighter, { textToHighlight: suggestion.name.split(".")[0], searchWords: [this.state.value] }));
        };
        this.tryLoadData = (apiObject) => {
            try {
                exports.LoadSlotsFromUrl(apiObject.download_url, apiObject.name.split(".")[1], () => this.setState({ loading: true }), (slots) => {
                    this.props.handleLoadSlot(slots);
                    this.setState({ redirect: true });
                }, () => this.setState({ openErrorDialog: true, loading: false }));
            }
            catch (e) {
                this.setState({
                    serverError: "'" + this.state.value + "' is not a valid course name. Please try other name."
                });
            }
        };
        this.handleReportBug = () => {
            this.setState({ openErrorDialog: false });
            window.open(constants_1.ReportLoadDataErrorFormUrl, "_blank");
        };
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
                exports.LoadSlotsFromUrl("https://raw.githubusercontent.com/wongjiahau/ttap-datahub/master/fes-all-slots.json", "json", () => this.setState({ loading: true }), (slots) => {
                    this.props.handleLoadSlot(slots);
                    this.setState({ redirect: true });
                }, () => this.setState({ openErrorDialog: true, loading: false }));
            }, 500);
            return;
        }
        this.RequestTestFiles();
    }
    render() {
        if (this.state.redirect) {
            return React.createElement(react_router_1.Redirect, { push: true, to: "/play" });
        }
        const inputProps = {
            placeholder: "Example: Software Engineering",
            value: this.state.value,
            onChange: this.onChange
        };
        if (!this.state.openErrorDialog && this.state.loading) {
            return getLoadingElement();
        }
        return (React.createElement(verticalAlign_1.VerticalAlign, null,
            React.createElement(stackPanel_1.StackPanel, { orientation: "vertical", horizontalAlignment: "center" },
                React.createElement(Dialog_1.default, { open: this.state.openErrorDialog },
                    React.createElement(core_1.DialogTitle, null, " Sorry :( "),
                    React.createElement(core_1.DialogContent, null,
                        React.createElement(core_1.DialogContentText, null,
                            "We faced some problem while trying to load the data for you. ",
                            React.createElement("br", null),
                            "Do you want to report this problem so that we might try to fix it?")),
                    React.createElement(core_1.DialogActions, null,
                        React.createElement(Button_1.default, { onClick: () => this.setState({ openErrorDialog: false }) }, "No, thanks"),
                        React.createElement(Button_1.default, { variant: "contained", onClick: this.handleReportBug, color: "primary" }, "Report problem"))),
                React.createElement(stackPanel_1.StackPanel, { orientation: "horizontal", horizontalAlignment: "center" },
                    React.createElement(Typography_1.default, { variant: "headline" }, "Type in your course name \u21E8 "),
                    React.createElement(Autosuggest, { suggestions: this.state.currentSuggestions, onSuggestionsFetchRequested: this.onSuggestionsFetchRequested, onSuggestionsClearRequested: this.onSuggestionsClearRequested, onSuggestionSelected: this.onSuggestionSelected, getSuggestionValue: (suggestion) => this.state.value, renderSuggestion: this.renderSuggestion, highlightFirstSuggestion: true, alwaysRenderSuggestions: true, inputProps: inputProps }),
                    ""),
                React.createElement(Button_1.default, { style: { visibility: this.state.suggestionIsFound ? "hidden" : "visible" }, onClick: openGetIdForm, color: "secondary", variant: "contained" }, "I can't find my course"),
                !this.state.serverError ? null : React.createElement("p", { style: { color: "Red" } }, this.state.serverError))));
    }
    RequestTestFiles() {
        const url = "https://api.github.com/repos/wongjiahau/ttap-datahub/contents/";
        fetch(url)
            .then((response) => {
            return response.json();
        })
            .then((data) => {
            this.setState({ loading: false });
            this.allSuggestions = data;
        })
            .catch((error) => {
            console.log(error);
            this.setState({ serverError: "Unable to fetch data from server. Please try again later.", loading: false });
        });
    }
}
exports.SelectCourseView = SelectCourseView;
function getLoadingElement() {
    return (React.createElement(verticalAlign_1.VerticalAlign, null,
        React.createElement(stackPanel_1.StackPanel, { orientation: "vertical", horizontalAlignment: "center" },
            React.createElement("br", null),
            React.createElement(CircularProgress_1.default, null))));
}
exports.getLoadingElement = getLoadingElement;
function openGetIdForm() {
    window.open(constants_1.CantFindMyCourseFormUrl, "_blank");
}
exports.LoadSlotsFromUrl = (downloadUrl, fileType, started, successed, failed) => {
    started();
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        // Only run if the request is complete
        if (xhr.readyState !== 4) {
            return;
        }
        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
            // What do when the request is successful
            let parser;
            if (fileType === "html") {
                parser = parseStudentHtmlToRawSlot_1.default;
            }
            else if (fileType === "json") {
                parser = parseJsonToRawSlot_1.ParseJsonToRawSlot;
            }
            else {
                throw new Error("Unknown file type: " + fileType);
            }
            try {
                const slots = parser(xhr.responseText).map(rawSlot_1.RawSlot.ResetUid);
                successed(slots);
            }
            catch (error) {
                console.log(error);
                failed(error);
            }
        }
        else {
            alert("Data loading is failed: STATUS " + xhr.status);
        }
    };
    xhr.open("GET", downloadUrl);
    xhr.send();
};
//# sourceMappingURL=selectCourseView.js.map