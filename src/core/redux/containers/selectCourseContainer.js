"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const selectCourseView_1 = require("../../react/selectCourseView");
const notifyDataLoaded_1 = require("../actions/notifyDataLoaded");
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleLoadSlot: (rawSlots) => dispatch(new notifyDataLoaded_1.NotifyDataLoaded(rawSlots))
    };
};
exports.SelectCourseViewContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(selectCourseView_1.SelectCourseView);
//# sourceMappingURL=selectCourseContainer.js.map