const colorhash = new (require("color-hash") as any)({
        // lightness: 0.75,
        saturation: 0.5,
});

// Memoization to improve performance
const memo: {[key: string]: string} = {};
export const ColorHash: (input: string) => string =
    (x) => {
        const result = memo[x];
        if (result) {
            return result;
        } else {
            const temp = colorhash.hex(x); // eslint-disable-line no-undef
            memo[x] = temp;
            return temp;
        }
    };
