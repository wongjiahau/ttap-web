"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BoundedInt {
    constructor(upperLimit, value) {
        this.UpperLimit = upperLimit;
        this.Value = value;
    }
    Duplicate() {
        return new BoundedInt(this.UpperLimit, this.Value);
    }
    Equals(other) {
        return this.Value === other.Value && this.UpperLimit === other.UpperLimit;
    }
    ToString() {
        return `UpperLimit : ${this.UpperLimit}, Value : ${this.Value}`;
    }
}
exports.BoundedInt = BoundedInt;
//# sourceMappingURL=boundedInt.js.map