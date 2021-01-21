"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Str {
    constructor(str) {
        this.str = str;
    }
    Value() {
        return this.str;
    }
    Contains(substr) {
        return this.str.indexOf(substr) !== -1;
    }
    Capitalize() {
        function capitalizer(s) {
            return s[0].charAt(0).toUpperCase() + s.slice(1);
        }
        const next = this.str.split(" ").map(capitalizer).join(" ");
        return new Str(next);
    }
    IsAlphaNumeric() {
        return !/[^0-9a-z\xDF-\xFF]/.test(this.str.toLowerCase());
    }
    ReplaceAll(oldStr, newStr) {
        const s = this.str.split(oldStr).join(newStr);
        return new Str(s);
    }
    Count(substr) {
        let count = 0;
        let pos = this.str.indexOf(substr);
        while (pos >= 0) {
            count += 1;
            pos = this.str.indexOf(substr, pos + 1);
        }
        return count;
    }
}
exports.Str = Str;
//# sourceMappingURL=str.js.map