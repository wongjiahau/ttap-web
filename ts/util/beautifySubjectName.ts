import { Str } from "./str";

export function BeautifySubjectName(input: string): string {
    return input
        .toLowerCase()
        .replace(/ dan /gi, " & ")
        .replace(/ and /gi, " & ")
        .split(" ")
        .map((word) => new Str(word).Capitalize().Value())
        .join(" ")
        .replace(/ ii/gi, " II")
        .replace(/ii /gi, "II ")
        .replace(/ iii/gi, " III")
        .replace(/iii /gi, "III ")
        ;
}
