"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("@material-ui/core/Button");
const Dialog_1 = require("@material-ui/core/Dialog");
// import Slide from "@material-ui/core/transitions/Slide";
const Typography_1 = require("@material-ui/core/Typography");
const React = require("react");
const stcBox_1 = require("../model/matrix/stcBox");
const timetableView_1 = require("./timetableView/timetableView");
const core_1 = require("@material-ui/core");
exports.NO_OPERATION = () => { };
// region style
const typo1Style = {
    textAlign: 'left',
    marginBottom: '12px'
};
const divStyle = {
    display: 'grid',
    gridGap: '18px',
    textAlign: 'center',
    overflowY: "auto",
    padding: '18px',
    justifySelf: 'center',
    alignContent: 'start',
    marginTop: '36px'
};
const tableStyle = {
    width: "100%"
};
const legendFrameStyle = {
    height: "100px",
    margin: "0 auto",
    width: "400",
    border: "solid 1px lightgrey",
    padding: "10px"
};
const cancelButtonStyle = {
    marginRight: "10px"
};
const Legend = (props) => {
    const background = () => {
        switch (props.type) {
            case "red":
                return stcBox_1.ColorOfDefinitelyOccupied;
            case "grey":
                return stcBox_1.ColorOfDefinitelyUnoccupied;
            case "green":
                return stcBox_1.ColorOfMaybeOccupied;
        }
    };
    const legendSymbol = {
        marginRight: "10px",
        width: "30px",
        height: "20px",
        float: "left",
        background: background()
    };
    const legendLabel = {
        float: "left"
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: legendSymbol }),
        React.createElement("div", { style: legendLabel },
            React.createElement(Typography_1.default, null, props.label))));
};
class SetTimeConstraintView extends React.Component {
    render() {
        return (React.createElement(Dialog_1.default, { open: this.props.isOpen, fullScreen: true },
            React.createElement(core_1.DialogContent, { style: divStyle },
                React.createElement("div", { style: { display: 'grid', gridTemplate: 'auto auto / auto auto', width: '90%', justifySelf: 'center' } },
                    React.createElement(Typography_1.default, { variant: "title", style: typo1Style, gutterBottom: true, align: "center" }, "Set time constraint"),
                    React.createElement("div", { style: { display: 'grid', gridGap: '12px', gridTemplateColumns: 'auto auto',
                            alignContent: 'center', alignItems: 'center', textAlign: 'left', gridRow: 'auto / span 2',
                            justifyContent: 'start', justifySelf: 'end' } },
                        React.createElement(Legend, { type: "grey", label: "Definitely no class" }),
                        React.createElement(Legend, { type: "red", label: "Definitely have class" }),
                        React.createElement(Legend, { type: "green", label: "Click this if you don't want to have class here" })),
                    React.createElement("div", { style: { textAlign: 'left', display: 'grid', gridGap: '4px' } },
                        React.createElement(Typography_1.default, null, "What is this feature for?"),
                        React.createElement(Typography_1.default, { variant: 'caption' },
                            "1. Based on the subjects you chose, TTAP found ",
                            ' ',
                            this.props.numberOfRemainingTimetables + this.props.numberOfRemovedTimetables,
                            ' ',
                            " types of valid timetables."),
                        React.createElement(Typography_1.default, { variant: 'caption' }, "2. It might be quite difficult for you to pick a favourite timetable out of them."),
                        React.createElement(Typography_1.default, { variant: 'caption' }, "3. To overcome this problem, you can use this feature to greatly decrease the number of generated timetables."),
                        React.createElement(Typography_1.default, { variant: 'caption' }, "4. To do so, click on the green boxes shown below."),
                        React.createElement(Typography_1.default, { variant: 'caption' }, "5. Click as many as you can and make the green bar as long as possible!"))),
                React.createElement(timetableView_1.TimetableView, { slots: [], isShowingAlternativeSlots: false, alternateSlots: null, isShowingAlternativeSlotOf: null, stcBoxes: this.props.totalMatrix, handleSelectSlotChoice: exports.NO_OPERATION, handleGoToThisAlternateSlot: exports.NO_OPERATION, handleShowAlternateSlot: exports.NO_OPERATION, handleToggleIsOpenOfSummary: exports.NO_OPERATION, handleSetTimeContraintAt: this.props.handleSetTimeConstraintAt, handleDesetTimeContraintAt: this.props.handleDesetTimeConstraintAt }),
                React.createElement(Report, { numberOfRemovedTimetables: this.props.numberOfRemovedTimetables, numberOfRemainingTimetables: this.props.numberOfRemainingTimetables }),
                React.createElement("div", { style: { display: 'grid', justifyContent: 'center', gridGap: '12px', gridAutoFlow: 'column' } },
                    React.createElement(Button_1.default, { style: cancelButtonStyle, color: "default", onClick: this.props.handleCancel }, "Cancel"),
                    React.createElement(Button_1.default, { variant: "contained", color: "primary", onClick: this.props.handleCancel }, "Done")))));
    }
}
exports.SetTimeConstraintView = SetTimeConstraintView;
const Report = (props) => {
    const style = {
        fontSize: "14px",
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 2fr',
        alignItems: 'center',
        width: '90%',
        justifySelf: 'center',
        gridGap: '12px'
    };
    const barStyle = {
        height: '8px',
        borderRadius: '8px',
        transition: 'width 0.3s ease-in-out',
    };
    const total = props.numberOfRemainingTimetables + props.numberOfRemovedTimetables;
    return (React.createElement("div", { style: style },
        React.createElement("div", { style: Object.assign({}, barStyle, { background: 'indianred', width: `${props.numberOfRemainingTimetables / total * 100}%`, justifySelf: 'end' }) }),
        React.createElement("div", { style: { display: 'grid', gridAutoFlow: 'column', gridGap: '4px' } },
            props.numberOfRemainingTimetables,
            React.createElement("span", { style: { whiteSpace: 'nowrap' } },
                ' ',
                "timetables remaining."),
            props.numberOfRemovedTimetables,
            React.createElement("span", { style: { whiteSpace: 'nowrap' } },
                ' ',
                "timetables are removed.")),
        React.createElement("div", { style: Object.assign({}, barStyle, { background: 'greenyellow', width: `${props.numberOfRemovedTimetables / total * 100}%` }) })));
};
//# sourceMappingURL=setTimeConstraintView.js.map