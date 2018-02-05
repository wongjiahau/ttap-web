export class Str {
    public constructor(private str: string) {}
    public Value() {
        return this.str;
    }
    public Contains(substr: string) {
        return this.str.indexOf(substr) !== -1;
    }
    public Capitalize() {
        function capitalizer(s: string) {
            return s[0].charAt(0).toUpperCase() + s.slice(1);
        }
        const next = this.str.split(" ").map(capitalizer).join(" ");
        return new Str(next);
    }
}
