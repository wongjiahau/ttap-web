export const ColorHash: (input: string) => string =
    (x) => (new (require("color-hash") as any)({
        lightness: 0.78,
    })).hex(x.length.toString() + x + x[0]);
