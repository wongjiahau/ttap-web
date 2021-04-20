"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateVisits() {
    if (typeof firebase === "undefined") {
        return;
    }
    const ref = firebase.database().ref("visits"); // eslint-disable-line no-undef
    ref.push().set({
        date: Date.now(),
        source: getSource()
    });
}
exports.updateVisits = updateVisits;
function getSource() {
    const x = window.navigator;
    return {
        os: x.platform,
        browser: x.userAgent
    };
}
exports.getSource = getSource;
//# sourceMappingURL=fire.js.map