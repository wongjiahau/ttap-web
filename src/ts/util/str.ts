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

  public IsAlphaNumeric() {
    return !/[^0-9a-z\xDF-\xFF]/.test(this.str.toLowerCase());
  }

  public ReplaceAll(oldStr: string, newStr: string): Str {
    const s = this.str.split(oldStr).join(newStr);
    return new Str(s);
  }

  public Count(substr: string): number {
    let count = 0;
    let pos = this.str.indexOf(substr);
    while (pos >= 0) {
      count += 1;
      pos = this.str.indexOf(substr, pos + 1);
    }
    return count;
  }
}
