
export function DecToBin(digit: number, outputBinaryLength: number) {
    let out = "";
    while (outputBinaryLength--) {
        out += (digit >> outputBinaryLength) & 1;
    }
    return out;
}
