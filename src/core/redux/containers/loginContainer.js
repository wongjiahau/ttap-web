"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const login_1 = require("./../../react/login");
const notifyDataLoaded_1 = require("./../actions/notifyDataLoaded");
const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleLoadSlots: (rawSlots) => {
            dispatch(new notifyDataLoaded_1.NotifyDataLoaded(rawSlots));
        }
    };
};
exports.LoginContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(login_1.Login);
//# sourceMappingURL=loginContainer.js.map