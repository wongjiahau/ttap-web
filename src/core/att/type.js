"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ParseType(group) {
    switch (group.toUpperCase()) {
        case "L":
            return 0;
        case "T":
            return 1;
        case "P":
            return 2;
        default:
            throw new Error("Expected group to be L/T/P only, but received : " + group);
    }
}
exports.ParseType = ParseType;
var Type;
(function (Type) {
    Type[Type["LECTURE"] = 0] = "LECTURE";
    Type[Type["TUTORIAL"] = 1] = "TUTORIAL";
    Type[Type["PRACTICAL"] = 2] = "PRACTICAL";
})(Type = exports.Type || (exports.Type = {}));
//# sourceMappingURL=type.js.map