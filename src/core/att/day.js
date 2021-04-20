"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ParseDay(input) {
    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    return days.indexOf(input.toLowerCase()) + 1;
}
exports.ParseDay = ParseDay;
//# sourceMappingURL=day.js.map