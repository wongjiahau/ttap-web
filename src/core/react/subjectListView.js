"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("@material-ui/core/Button");
const Drawer_1 = require("@material-ui/core/Drawer");
const Paper_1 = require("@material-ui/core/Paper");
const TextField_1 = require("@material-ui/core/TextField");
const Tooltip_1 = require("@material-ui/core/Tooltip");
const Typography_1 = require("@material-ui/core/Typography");
const Info_1 = require("@material-ui/icons/Info");
const React = require("react");
const core_1 = require("@material-ui/core");
const keyCodeEnum_1 = require("../enums/keyCodeEnum");
const beautifySubjectName_1 = require("../util/beautifySubjectName");
const getInitial_1 = require("../util/getInitial");
const stackPanel_1 = require("./panels/stackPanel");
const subjectView_1 = require("./subjectView");
// region styles
const errorMessageStyle = {
    marginTop: "10px",
    marginLeft: "10px"
};
const headerStyle = {
    marginLeft: "15px",
    marginTop: "5px"
};
const divStyle = {
    flex: "2",
    overflow: "auto"
};
const footerStyle = {
    margin: "10px",
    minHeight: "36px",
    textAlign: "right"
};
const searchBoxStyle = {
    fontSize: "24px",
    fontWeight: "normal",
    marginBottom: "10px",
    marginTop: "-5px",
    width: "95%"
};
const buttonStyle = {
    marginLeft: "10px"
};
class SubjectListView extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchBoxOnChange = (e) => {
            this.props.handleSearch(e.target.value);
        };
        this.handleClose = () => {
            if (this.props.Subjects.some((x) => x.IsSelected)) {
                this.props.handleClose();
            }
        };
        this.checkKeys = (e) => {
            // refer
            // https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-ja
            // v ascript
            e = e || window.event;
            switch (e.keyCode) {
                case keyCodeEnum_1.Key.DownArrow:
                    this.Focus("next");
                    break;
                case keyCodeEnum_1.Key.UpArrow:
                    this.Focus("previous");
                    break;
                case keyCodeEnum_1.Key.Tab:
                case keyCodeEnum_1.Key.Backspace:
                    if (document.activeElement && document.activeElement.id === "searchbar") {
                        break;
                    }
                    const searchbar = document.getElementById("searchbar");
                    searchbar.value = "";
                    this.props.handleSearch("");
                    searchbar.focus();
                    break;
            }
        };
        this.Focus = (where) => {
            const idOfFocusedSubjectView = document.activeElement ? document.activeElement.id : "";
            const subjectViews = document.getElementsByClassName("subjectview");
            const length = subjectViews.length;
            let next = 0;
            for (let i = 0; i < length; i++) {
                if (subjectViews[i].id === idOfFocusedSubjectView) {
                    if (where === "previous") {
                        next = i - 1;
                        if (next < 0) {
                            next = length - 1;
                        }
                    }
                    else {
                        next = i + 1;
                        if (next > length - 1) {
                            next = 0;
                        }
                    }
                    subjectViews[next].focus();
                    return;
                }
            }
            subjectViews[0].focus();
        };
        this.state = {
            sectionStyle: this.getSectionStyle(),
        };
    }
    getSectionStyle() {
        return {
            display: "flex",
            flexFlow: "column",
            height: window.innerHeight
        };
    }
    render() {
        const subjectViews = this
            .props
            .Subjects
            .map((s, index) => {
            if (s.IsVisible) {
                return (React.createElement("div", { key: s.Code },
                    React.createElement(subjectView_1.SubjectView, { id: "sv" + index, isLoading: this.props.IsShowingLoadingBar, clashReport: s.ClashReport, searchWord: this.props.SearchedText, subjectName: beautifySubjectName_1.BeautifySubjectName(s.Name), subjectCode: s.Code + " [" + getInitial_1.GetInitial(s.Name) + "]", handleSelection: () => this.props.handleSelection(index), isSelected: s.IsSelected })));
            }
        });
        const errorMessage = (React.createElement(Typography_1.default, { style: errorMessageStyle, variant: "subheading", gutterBottom: true }, "No result is found . . ."));
        const showErrorMessage = this
            .props
            .Subjects
            .filter((x) => x.IsVisible)
            .length === 0;
        const numberOfSelectedSubjects = this
            .props
            .Subjects
            .filter((s) => s.IsSelected)
            .length;
        const noSubjectIsSelected = numberOfSelectedSubjects === 0;
        return (React.createElement(Drawer_1.default, { elevation: 16, open: this.props.IsOpen, onClose: this.handleClose },
            React.createElement("section", { onKeyUp: this.checkKeys, style: this.state.sectionStyle },
                React.createElement("header", { style: headerStyle },
                    React.createElement(Typography_1.default, { gutterBottom: true, variant: "display1", color: "primary", style: { marginRight: "10px" } }, "Select your desired subjects."),
                    React.createElement(TextField_1.default, { id: "searchbar", variant: "outlined", style: searchBoxStyle, margin: "dense", onChange: this.handleSearchBoxOnChange, placeholder: "example: he/hubungan etnik/mpu3113", label: "\uD83D\uDD0E Search . . ." })),
                React.createElement(Paper_1.default, { style: divStyle },
                    React.createElement("div", { id: "subject-list-container" }, !showErrorMessage
                        ? subjectViews
                        : errorMessage)),
                React.createElement("footer", { style: footerStyle },
                    React.createElement(stackPanel_1.StackPanel, { orientation: "horizontal", horizontalAlignment: "right" },
                        React.createElement(core_1.FormControlLabel, { control: React.createElement(core_1.Switch, { color: "secondary", checked: this.props.IsAlgorithmVisualizerEnabled, onChange: this.props.handleToggleIsEnabledOfFindTimetableVisualization }), label: "Visualization" }),
                        React.createElement(Tooltip_1.default, { title: subjectListTipsContent(), placement: "top" },
                            React.createElement(Info_1.default, null)),
                        React.createElement(Button_1.default, { color: "secondary", style: buttonStyle, disabled: noSubjectIsSelected, id: "toggle-view-button", onClick: this.props.handleToggleView }, this.props.IsShowingSelectedSubjectOnly
                            ? "Show all subjects"
                            : (noSubjectIsSelected
                                ? "Show selected subjects"
                                : `Show selected subjects (${numberOfSelectedSubjects})`)),
                        React.createElement(Button_1.default, { variant: "contained", color: "primary", style: buttonStyle, disabled: noSubjectIsSelected || this.props.IsShowingLoadingBar, id: "done-button", onClick: () => {
                                this.props.handleClose();
                            } }, "Done"))))));
    }
    componentDidMount() {
        const searchbar = document.getElementById("searchbar");
        if (searchbar) {
            searchbar.focus();
        }
    }
}
exports.SubjectListView = SubjectListView;
const subjectListTipsContent = () => {
    const style = {
        fontSize: "15px",
        paddingBottom: "5px",
        paddingTop: "5px",
        textAlign: "left",
    };
    const getRow = (key, description) => {
        return (React.createElement("tr", null,
            React.createElement("td", null,
                React.createElement("code", null, key)),
            React.createElement("td", null,
                "\u2003",
                description)));
    };
    return (React.createElement("table", { style: style },
        React.createElement("tbody", null,
            getRow("↓ ↑", "Navigate through subjects"),
            getRow("Enter", "Toggle selection on focused subject"),
            getRow("Backspace", "Clear and focus the search bar"))));
};
//# sourceMappingURL=subjectListView.js.map