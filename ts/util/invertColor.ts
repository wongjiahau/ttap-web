import * as invert from "invert-color";

// Memoization to improve performance
const memo: {[color: string]: string} = {};
export function invertColor(color: string): string {
    const result = memo[color];
    if (result) {
        return result;
    } else {
        // @ts-ignore
        const temp = invert(color, true);
        memo[color] = temp;
        return temp;
    }
}
