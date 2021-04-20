"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const React = require("react");
const Apps_1 = require("@material-ui/icons/Apps");
const Lock_1 = require("@material-ui/icons/Lock");
// @ts-ignore
const react_tippy_1 = require("react-tippy");
const beautifySubjectName_1 = require("../util/beautifySubjectName");
const getInitial_1 = require("../util/getInitial");
const invertColor_1 = require("../util/invertColor");
const react_archer_1 = require("react-archer");
const day_1 = require("../att/day");
const timePeriod_1 = require("../att/timePeriod");
class SlotView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            isMenuOpen: false,
        };
    }
    render() {
        const { slot, color, isShowingAlternativeSlot, isShowingAlternativeSlotsOfThisSlot } = this.props;
        let slotStyle = {
            color: invertColor_1.invertColor(color),
            backgroundColor: color,
            opacity: (isShowingAlternativeSlot && slot.SourceSlotUid === undefined && !isShowingAlternativeSlotsOfThisSlot)
                ? 0.5 : 1.0
        };
        if (slot.AlternativeSlots.length > 0) {
            slotStyle = Object.assign({}, slotStyle, { borderStyle: "dashed", cursor: "pointer" });
        }
        if (slot.SourceSlotUid !== undefined) { // add border glow
            slotStyle = Object.assign({}, slotStyle, { color: "white", backgroundColor: "black", border: "1px solid rgb(86, 180, 239)", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 8px rgba(82, 168, 236, 0.6)", cursor: "pointer" });
        }
        const { handleShowAlternateSlot, handleGoToThisAlternateSlot } = this.props;
        const clickHandler = (event) => {
            if (handleShowAlternateSlot !== undefined && slot.AlternativeSlots.length > 0) {
                handleShowAlternateSlot(slot);
                // The following code is to toggle display menu
                // Temporarily disabled because still not sure how to implement slot locking
                // this.setState({
                //     anchorEl: event.currentTarget,
                //     isMenuOpen: true
                // });
            }
            if (handleGoToThisAlternateSlot !== undefined && slot.SourceSlotUid !== undefined) {
                handleGoToThisAlternateSlot(slot.SourceSlotUid, slot.Uid);
            }
        };
        const className /* Refer index.css */ = "slot-view"
            + (slot.AlternativeSlots.length > 0 ? " hvr-glow get-user-attention" : "");
        const showPopover = false; // Currently this line is disable
        // Why popover is needed?
        //   it is for implementing slot-locking feature
        //   but I haven't figured out how to do it yet
        const venue = `${slot.Room[slot.CurrentChoice]}${slot.ClassMode ? ` [${[slot.ClassMode]}]` : ""}`;
        return (React.createElement(react_tippy_1.Tooltip, { arrow: true, position: "left", html: tooltipTitle(slot, isShowingAlternativeSlotsOfThisSlot) },
            React.createElement("div", { className: className, style: slotStyle, onClick: clickHandler, "aria-owns": Boolean(this.state.anchorEl) ? "popover" : undefined, "aria-haspopup": "true" },
                getSlotContent(slot),
                !isShowingAlternativeSlot &&
                    React.createElement(React.Fragment, null,
                        React.createElement("br", null),
                        " ",
                        venue,
                        " ",
                        React.createElement("br", null)),
                (isShowingAlternativeSlotsOfThisSlot || isShowingAlternativeSlot) &&
                    React.createElement(react_archer_1.ArcherElement, { id: 'slot' + slot.Uid.toString(), relations: isShowingAlternativeSlotsOfThisSlot
                            ? this.props.alternativeSlots.map(alternativeSlot => (Object.assign({ targetId: 'slot' + alternativeSlot.Uid.toString() }, (day_1.ParseDay(alternativeSlot.Day) > day_1.ParseDay(slot.Day)
                                ? {
                                    targetAnchor: 'top',
                                    sourceAnchor: 'bottom'
                                }
                                : day_1.ParseDay(alternativeSlot.Day) < day_1.ParseDay(slot.Day)
                                    ? {
                                        targetAnchor: 'bottom',
                                        sourceAnchor: 'top'
                                    }
                                    : timePeriod_1.TimePeriod.Parse(alternativeSlot.TimePeriod).StartTime.Hour
                                        > timePeriod_1.TimePeriod.Parse(slot.TimePeriod).StartTime.Hour
                                        ? {
                                            targetAnchor: 'left',
                                            sourceAnchor: 'right'
                                        }
                                        : {
                                            targetAnchor: 'right',
                                            sourceAnchor: 'left',
                                        }))))
                            : [] }, venue),
                slot.WeekNumber[slot.CurrentChoice]),
            !showPopover ? null :
                React.createElement(core_1.Popover, { id: "popover", open: this.state.isMenuOpen, anchorEl: this.state.anchorEl, anchorReference: "anchorEl", anchorPosition: { top: 200, left: 400 }, anchorOrigin: { vertical: "center", horizontal: "center", }, transformOrigin: { vertical: "top", horizontal: "left", }, onClose: () => this.setState({
                        anchorEl: null,
                        isMenuOpen: false,
                    }) },
                    React.createElement(core_1.Paper, null,
                        React.createElement(core_1.MenuList, null,
                            slot.AlternativeSlots.length === 0 ? null : (React.createElement(core_1.MenuItem, { onClick: () => {
                                    if (handleShowAlternateSlot) {
                                        handleShowAlternateSlot(slot);
                                        this.setState({
                                            anchorEl: null,
                                            isMenuOpen: false,
                                        });
                                    }
                                } },
                                React.createElement(core_1.ListItemIcon, null,
                                    React.createElement(Apps_1.default, null)),
                                React.createElement(core_1.ListItemText, { inset: true, primary: isShowingAlternativeSlot && isShowingAlternativeSlotsOfThisSlot ?
                                        "Hide alternative slots" :
                                        "Show alternative slots" }))),
                            React.createElement(core_1.MenuItem, { onClick: () => {
                                    this.setState({ anchorEl: null, isMenuOpen: false });
                                } },
                                React.createElement(core_1.ListItemIcon, null,
                                    React.createElement(Lock_1.default, null)),
                                React.createElement(core_1.ListItemText, { inset: true, primary: "Lock this slot" })))))));
    }
}
exports.SlotView = SlotView;
function tooltipTitle(s, isShowingAlternativeSlotOfThisSlot) {
    const style = {
        fontSize: "18px"
    };
    return (React.createElement("div", { style: style },
        beautifySubjectName_1.BeautifySubjectName(s.SubjectName),
        React.createElement("br", null),
        "[",
        s.SubjectCode,
        "]",
        React.createElement("br", null),
        " ",
        (s.SourceSlotUid !== undefined ? "(Click to go to this slot)" :
            (s.AlternativeSlots.length === 0 ? "" :
                (isShowingAlternativeSlotOfThisSlot ? "(Click to hide alternative slots)" :
                    "(Click show alternative slots)")))));
}
function getSlotContent(slot) {
    return `${getInitial_1.GetInitial(slot.SubjectName)} - ${slot.Type}(${slot.Group[slot.CurrentChoice]})`;
}
exports.getSlotContent = getSlotContent;
//# sourceMappingURL=slotView.js.map