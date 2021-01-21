"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const fgoView_1 = require("../../react/fgoView");
const notifyDataLoaded_1 = require("../actions/notifyDataLoaded");
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleLoadSlot: (rawSlots) => dispatch(new notifyDataLoaded_1.NotifyDataLoaded(rawSlots))
    };
};
exports.FgoViewContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(fgoView_1.FgoView);
//# sourceMappingURL=fgoViewContainer.js.map