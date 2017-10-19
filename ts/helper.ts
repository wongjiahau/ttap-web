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
