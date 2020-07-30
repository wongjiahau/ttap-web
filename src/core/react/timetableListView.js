"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("@material-ui/core/Button");
const Alarm_1 = require("@material-ui/icons/Alarm");
const GridOn_1 = require("@material-ui/icons/GridOn");
const Save_1 = require("@material-ui/icons/Save");
const ViewList_1 = require("@material-ui/icons/ViewList");
const React = require("react");
const keyCodeEnum_1 = require("../enums/keyCodeEnum");
const counterView_1 = require("./counterView");
const stackPanel_1 = require("./panels/stackPanel");
const setTimeConstraintView_1 = require("./setTimeConstraintView");
const styles_1 = require("./styles");
const timetableView_1 = require("./timetableView/timetableView");
class TimetableListView extends React.Component {
    constructor() {
        super(...arguments);
        this.checkKeys = (e) => {
            // refer
            // https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-ja
            // v ascript
            e = e || window.event;
            switch (e.keyCode) {
                case keyCodeEnum_1.Key.LeftArrow:
                    this.props.handleGoToPreviousTimetable();
                    break;
                case keyCodeEnum_1.Key.RightArrow:
                    this.props.handleGoToNextTimetable();
                    break;
                case keyCodeEnum_1.Key.DownArrow:
                    this.props.handleGoToNextSubTimetable();
                    break;
                case keyCodeEnum_1.Key.UpArrow:
                    this.props.handleGoToPreviousSubTimetable();
                    break;
                case keyCodeEnum_1.Key.R:
                    this.props.handleGoToRandomTimetable();
                    break;
            }
        };
    }
    render() {
        if (!this.props.slotViewModelStore) {
            return Logo();
        }
        const slotsToBeRendered = this.props.currentTimetable !== null ?
            this.props.slotViewModelStore.GetBunch(this.props.currentTimetable.ListOfSlotUids[this.props.currentSubIndex]) : [];
        return (React.createElement("div", { style: { display: 'grid' }, onKeyDown: this.checkKeys, tabIndex: 0 },
            " ",
            React.createElement("link", { rel: "stylesheet", href: "balloon.min.css" }),
            React.createElement("div", { style: { display: 'grid', gridGap: '12px', paddingTop: '12px' } },
                React.createElement(timetableView_1.TimetableView, { slots: slotsToBeRendered, alternateSlots: this.props.alternativeSlots, isShowingAlternativeSlots: this.props.alternativeSlots.length > 0, isShowingAlternativeSlotOf: this.props.isShowingAlternativeSlotOf, stcBoxes: null, handleDesetTimeContraintAt: setTimeConstraintView_1.NO_OPERATION, handleSetTimeContraintAt: setTimeConstraintView_1.NO_OPERATION, isSummaryOpen: this.props.isSummaryOpen, handleSelectSlotChoice: this.props.handleSelectSlotChoice, handleShowAlternateSlot: this.props.handleShowAlternateSlot, handleGoToThisAlternateSlot: this.props.handleGoToThisAlternateSlot, handleToggleIsOpenOfSummary: this.props.handleToggleIsOpenOfSummary }),
                React.createElement("div", { style: { display: 'grid', justifyContent: 'center', gridAutoFlow: 'column',
                        alignItems: 'center', gridGap: '8px', alignSelf: 'start' } },
                    React.createElement(Button_1.default, { variant: "contained", color: "primary", onClick: this.props.handleOpenSetTimeConstraintView },
                        React.createElement(Alarm_1.default, { style: styles_1.iconStyle }),
                        "Set time constraint"),
                    React.createElement(counterView_1.CounterView, { currentIndex: this.props.currentIndex + 1, currentSubIndex: this.props.currentSubIndex + 1, maxIndex: this.props.maxIndex + 1, leftTooltip: "Go to previous timetable (Left arrow)", middleTooltip: "Go to random timetable (R)", rightTooltip: "Go to next timetable (Right arrow)", upTooltip: "Go to previous similar timetable (Up arrow)", downTooltip: "Go to next similar timetable (Down arrow)", handleClickLeft: this.props.handleGoToPreviousTimetable, handleClickMiddle: this.props.handleGoToRandomTimetable, handleClickRight: this.props.handleGoToNextTimetable, handleClickUp: this.props.handleGoToPreviousSubTimetable, handleClickDown: this.props.handleGoToNextSubTimetable }),
                    React.createElement(Button_1.default, { variant: "contained", color: "primary", onClick: this.props.handleOpenSaveTimetableDialog },
                        React.createElement(Save_1.default, { style: styles_1.iconStyle }),
                        "Save as . . ."),
                    React.createElement(Button_1.default, { variant: "contained", color: "primary", onClick: this.props.handleOpenSlotsTable },
                        React.createElement(ViewList_1.default, { style: styles_1.iconStyle }),
                        "Show slots")))));
    }
}
exports.TimetableListView = TimetableListView;
function Logo() {
    const gridIconStyle = {
    // width: "50px", height: "50px",
    };
    const stackPanelStyle = {
        position: "absolute",
        right: "1%",
        bottom: "1%",
    };
    return (React.createElement(stackPanel_1.StackPanel, { orientation: "horizontal", style: stackPanelStyle },
        React.createElement(GridOn_1.default, { style: gridIconStyle }),
        "TTAP"));
}
//# sourceMappingURL=timetableListView.js.map