function colorhash(seed: number) {
    return new (require("color-hash") as any)({
        // lightness: 0.75,
        // saturation: 0.5,
        hash: (x: string) => customHashFunction(x, seed),
    });
}

// Memoization to improve performance
const memo: {[key: string]: string} = {};
export function ColorHash(input: string, seed: number = 32, memoize = true): string  {
    // why the default seed is 32?
    // it is based on heuristics, a test is run to try numbers between 1 - 999
    // and the number 32 resulted in the least duplciated hashes
    // that's why the seed is defaulted to 32
    // refer seedThatResultedInTheLeastHashesDuplicates from _colorhash.test.ts
    const result = memo[input];
    if (memoize && result) {
        return result;
    } else {
        const temp = colorhash(seed).hex(input); // eslint-disable-line no-undef
        memo[input] = temp;
        return temp;
    }
}

export function customHashFunction(input: string, seed: number): number {
    const seed2 = 137;
    let hash = 0;
    // make hash more sensitive for short string like 'a', 'b', 'c'
    const str = input;
    for (let i = 0; i < str.length; i++) {
        if (hash > Number.MAX_SAFE_INTEGER) {
            hash = hash / seed2 + hash % seed2;
        } else {
            hash = hash * seed + str.charCodeAt(i);
        }
    }
    return hash;
}
