"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoxKind;
(function (BoxKind) {
    BoxKind[BoxKind["DefinitelyOccupied"] = 0] = "DefinitelyOccupied";
    BoxKind[BoxKind["DefinitelyUnoccupied"] = 1] = "DefinitelyUnoccupied";
    BoxKind[BoxKind["MaybeOccupied"] = 2] = "MaybeOccupied";
    BoxKind[BoxKind["Clicked"] = 3] = "Clicked";
})(BoxKind = exports.BoxKind || (exports.BoxKind = {}));
/**
 * STCBox means SetTimeConstraintBox. It is used by SetTimeConstraintView
 * @export
 * @class STCBox
 */
class STCBox {
    constructor(kind, day, timeperiod, x) {
        this.Uid = "";
        this.Kind = kind;
        this.Day = day;
        this.TimePeriod = timeperiod;
        this.X = x;
        if (x !== null && day !== null) {
            this.Uid = day.toString() + x.toString();
        }
    }
}
exports.STCBox = STCBox;
exports.ColorOfDefinitelyOccupied = "DarkRed" /* DarkRed */;
exports.ColorOfDefinitelyUnoccupied = "DarkGrey" /* DarkGrey */;
exports.ColorOfMaybeOccupied = "LightGreen" /* LightGreen */;
exports.ColorOfClicked = "LightBlue" /* LightBlue */;
//# sourceMappingURL=stcBox.js.map