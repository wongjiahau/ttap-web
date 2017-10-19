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
    let result = input.trim();
    if (S(result).contains("(")) {
        result = result
            .substring(0, result.indexOf("("))
            .trim();
    }
    return result
        .split(" ")
        .map((word) => (IsNonWhiteSpaceSymbols(word[0])
            ? word[0]
            : ""))
        .join("");

    function IsNonWhiteSpaceSymbols(char: string): boolean {
        return char !== " " && S(char).isAlphaNumeric();
    }
}
