"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const Button_1 = require("@material-ui/core/Button");
const Switch_1 = require("@material-ui/core/Switch");
const List_1 = require("@material-ui/icons/List");
const React = require("react");
const react_router_1 = require("react-router");
const algorithmVisualizerContainer_1 = require("../redux/containers/algorithmVisualizerContainer");
const saveTimetableDialogContainer_1 = require("../redux/containers/saveTimetableDialogContainer");
const setTimeConstraintContainer_1 = require("../redux/containers/setTimeConstraintContainer");
const slotsTableContainer_1 = require("../redux/containers/slotsTableContainer");
const snackbarContainer_1 = require("../redux/containers/snackbarContainer");
const subjectListViewContainer_1 = require("../redux/containers/subjectListViewContainer");
const timetableListContainer_1 = require("../redux/containers/timetableListContainer");
const turnOnSBCWDialogContainer_1 = require("../redux/containers/turnOnSBCWDialogContainer");
const styles_1 = require("./styles");
const switchStyle = {
    marginRight: 0.03 * window.innerWidth
};
class TimetableCreatorView extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggleSBCW = (event, checked) => {
            if (checked) {
                this.props.handleOpenSbcwDialog();
            }
            else {
                this.props.handleTurnOffSBCW();
            }
        };
        this.handleToggleDisableClashChecking = (event, checked) => {
            if (checked) {
                this.setState({ isDccDialogOpen: true });
            }
            else {
                this.props.handleToggleDisableClashChecking(false);
            }
        };
        this.state = {
            isDccDialogOpen: false
        };
    }
    render() {
        // const DEBUGGING = false; // Please change to false during production
        // if (DEBUGGING) {
        //     this.props.handleSlotLoaded(HENG_2017_APR());
        //     alert("WARNING! You are in a debugging session.");
        // } else
        if (!this.props.isSlotLoaded) {
            return React.createElement(react_router_1.Redirect, { push: true, to: "/select" });
        }
        return (React.createElement("div", { style: { display: 'grid', gridTemplateRows: 'auto 1fr auto' } },
            React.createElement("div", { style: { display: 'grid', gridTemplateColumns: 'auto auto', alignItems: 'start', padding: '18px 18px 0 18px' } },
                React.createElement(Button_1.default, { style: { justifySelf: 'start' }, variant: "contained", color: "secondary", onClick: this.props.handleOpenSubjectListView },
                    React.createElement(List_1.default, { style: styles_1.iconStyle }),
                    "Select subjects"),
                React.createElement("div", { style: { justifySelf: 'end' } },
                    React.createElement("div", { style: { display: 'grid' } },
                        React.createElement(core_1.FormControlLabel, { label: "Disable clash-checking", control: React.createElement(Switch_1.default, { style: switchStyle, color: "primary", checked: this.props.isDccTurnedOn, onChange: this.handleToggleDisableClashChecking }) }),
                        React.createElement(core_1.FormControlLabel, { style: { display: "none" }, label: "Search by considering week number", control: React.createElement(Switch_1.default, { style: switchStyle, color: "primary", checked: this.props.isSbcwTurnedOn, onChange: this.handleToggleSBCW }) }),
                        "" /*This is for overcoming a bug of StackPanel */))),
            React.createElement(core_1.Dialog, { open: this.state.isDccDialogOpen },
                React.createElement(core_1.DialogTitle, null, "Disable clash-checking?"),
                React.createElement(core_1.DialogContent, null,
                    React.createElement(core_1.DialogContentText, null,
                        "Turning on this feature might cause TTAP to generate ",
                        React.createElement("b", null, "invalid"),
                        " timetables.",
                        React.createElement("br", null),
                        React.createElement("br", null),
                        "You should only turn on this feature if you want to to visualize clashes between different subjects.",
                        React.createElement("br", null),
                        React.createElement("br", null),
                        "WARNING: This will also ",
                        React.createElement("b", null,
                            React.createElement("i", null, "slow")),
                        " down the search process.")),
                React.createElement(core_1.DialogActions, null,
                    React.createElement(Button_1.default, { onClick: () => this.setState({ isDccDialogOpen: false }), color: "primary" }, "cancel"),
                    React.createElement(Button_1.default, { onClick: () => {
                            this.setState({ isDccDialogOpen: false });
                            this.props.handleToggleDisableClashChecking(true);
                        }, color: "primary" }, "Turn on"))),
            React.createElement(timetableListContainer_1.TimetableListContainer, null),
            React.createElement(saveTimetableDialogContainer_1.SaveTimetableDialogContainer, null),
            React.createElement(turnOnSBCWDialogContainer_1.SBCWDialogContainer, null),
            React.createElement(setTimeConstraintContainer_1.SetTimeConstraintContainer, null),
            React.createElement(slotsTableContainer_1.SlotsTableContainer, null),
            React.createElement(snackbarContainer_1.SnackbarContainer, null),
            React.createElement(subjectListViewContainer_1.SubjectListViewContainer, null),
            React.createElement(algorithmVisualizerContainer_1.AlgorithmVisualizerViewContainer, null)));
    }
}
exports.TimetableCreatorView = TimetableCreatorView;
//# sourceMappingURL=timetableCreatorView.js.map