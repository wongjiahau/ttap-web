"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = require("@material-ui/core/Button");
const React = require("react");
const timePeriod_1 = require("../../att/timePeriod");
const ReactGridLayout = require("../../modified_node_modules/react-grid-layout");
const timetableSummaryView_1 = require("../timetableSummaryView");
const generateSlotViewsAndDayColumn_1 = require("./generateSlotViewsAndDayColumn");
const generateStateView_1 = require("./generateStateView");
const skeleton_1 = require("./skeleton");
const react_archer_1 = require("react-archer");
const getTimetableViewWidth = () => 0.9 * window.innerWidth;
/* This component have two purpose
 *  1. To render TimetableView
 *  2. To render SetTimeConstraintView
 */
class TimetableView extends React.Component {
    constructor(props) {
        super(props);
        this.handleWindowResizing = () => {
            this.setState({ width: getTimetableViewWidth() });
        };
        this.previousOnResizeHandler = () => { };
        this.state = {
            width: getTimetableViewWidth(),
        };
    }
    render() {
        const skeleton = new skeleton_1.Skeleton();
        if (this.props.slots && this.props.alternateSlots) { // render timetable view
            const slotViewsAndDayColumn = generateSlotViewsAndDayColumn_1.GenerateSlotViewsAndDayColumn(this.props.slots.concat(this.props.alternateSlots), this.props.handleSelectSlotChoice, this.props.handleGoToThisAlternateSlot, this.props.handleShowAlternateSlot, this.props.isShowingAlternativeSlotOf);
            skeleton.Concat(slotViewsAndDayColumn);
            const horizontalDividers = exports.GenerateHorizontalDividers(skeleton);
            skeleton.Concat(horizontalDividers);
        }
        if (this.props.stcBoxes) { // render set time constraint view
            const stateViews = generateStateView_1.GenerateStateViews(this.props.stcBoxes, this.props.handleSetTimeContraintAt, this.props.handleDesetTimeContraintAt);
            skeleton.Concat(stateViews);
            skeleton.Layouts = skeleton
                .Layouts
                .concat(exports.GetStandardDayColumnLayout());
        }
        const divStyle = {
            backgroundColor: "WhiteSmoke" /* WhiteSmoke */,
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: "5px",
            fontFamily: "roboto",
            margin: "auto",
            position: "relative",
            width: this.state.width,
        };
        const buttonStyle = {
            bottom: "0",
            fontSize: "12px",
            position: "absolute",
            right: "0",
        };
        return (React.createElement("div", { id: "timetable-view", style: { padding: '12px 0', display: 'grid' } },
            " ",
            React.createElement("link", { rel: "stylesheet", href: "tippy.css" }),
            React.createElement("div", { style: { display: 'grid', gridGap: '12px' } },
                React.createElement("div", { style: divStyle },
                    React.createElement(react_archer_1.ArcherContainer, { strokeColor: 'red', arrowLength: 0, arrowThickness: 0 },
                        React.createElement(ReactGridLayout, { cols: ((timePeriod_1.TimePeriod.Max.Hour - timePeriod_1.TimePeriod.Min.Hour)) * 2 + 2, maxRows: 50, rowHeight: 50, width: this.state.width, layout: skeleton.Layouts, margin: [0, 0], isDraggable: false, isResizable: false, autoSize: true, verticalCompact: false }, skeleton.Children)),
                    this.props.slots.length > 0 ?
                        React.createElement(Button_1.default, { id: "summary-btn", variant: "contained", style: buttonStyle, onClick: this.props.handleToggleIsOpenOfSummary }, this.props.isSummaryOpen ? "hide summary" : "show summary")
                        : null),
                this.props.isSummaryOpen && React.createElement(timetableSummaryView_1.TimetableSummaryView, { slots: this.props.slots }))));
    }
    componentDidMount() {
        this.previousOnResizeHandler = window.onresize;
        window.onresize = this.handleWindowResizing;
    }
    componentWillUnmount() {
        // This is needed to fix issue #133
        // Refer https://github.com/wongjiahau/ttap-web/issues/133
        window.onresize = this.previousOnResizeHandler;
    }
}
exports.TimetableView = TimetableView;
exports.GetStandardDayColumnLayout = () => {
    const result = Array();
    const NUMBER_OF_DAY_PER_WEEK = 7;
    for (let j = 0; j <= NUMBER_OF_DAY_PER_WEEK; j++) {
        result.push({
            h: 1,
            i: ("d" + j),
            w: 2,
            x: 0,
            y: j
        });
    }
    return result;
};
exports.GenerateHorizontalDividers = (skeleton) => {
    const getDivider = (layoutId) => {
        const dividerStyle = {
            borderBottom: "1px dotted #666",
            width: "100%"
        };
        return (React.createElement("div", { key: layoutId, style: dividerStyle }));
    };
    const dividers = [];
    for (let i = 1; i <= 6; i++) {
        dividers.push(getDivider("divider" + i));
    }
    const dividersLayouts = [];
    for (let i = 1; i <= 6; i++) {
        dividersLayouts.push(Object.assign({}, skeleton.Layouts.filter((x) => x.i === "d" + i)[0], { i: ("divider" + i), w: (timePeriod_1.TimePeriod.Max.Hour - timePeriod_1.TimePeriod.Min.Hour) * 2, x: 2 }));
    }
    return {
        Children: dividers,
        Layouts: dividersLayouts
    };
};
/*
Note: For the horizontal borders to work, the synchronizeLayoutWithChildren function of ReactGirdLayout must be disabled,
It can be disabled by returning the initialLayout directly
in utils.js of ReactGridLayout folder
*/
//# sourceMappingURL=timetableView.js.map