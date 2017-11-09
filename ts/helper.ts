import * as S from "string";
export function Beautify(input: string): string {
    return input
        .toLowerCase()
        .replace("dan", "&")
        .replace("and", "&")
        .split(" ")
        .map((word) => {
            return S(word)
                .capitalize()
                .s;
        })
        .join(" ");
}

export function GetInitial(input: string): string {
    let result = Beautify(input).trim();
    if (S(result).contains("(")) {
        result = result
            .substring(0, result.indexOf("("))
            .trim();
    }
    return result
        .split(" ")
        .map((word) => {
            switch (word.toLowerCase()) {
                case "i":
                    return "1";
                case "ii":
                    return "2";
                default:
                    return word;

            }
        })
        .map((word) => (IsNonWhiteSpaceSymbols(word[0]) ?
            word[0] :
            ""))
        .join("");

    function IsNonWhiteSpaceSymbols(char: string): boolean {
        return char !== " " && S(char).isAlphaNumeric();
    }
}

export function DecToBin(digit: number, outputBinaryLength: number) {
    let out = "";
    while (outputBinaryLength--) {
        out += (digit >> outputBinaryLength) & 1;
    }
    return out;
}
