import { Str } from "./str";

export function BeautifySubjectName(input: string): string {
    return input
        .toLowerCase()
        .replace("dan", "&")
        .replace("and", "&")
        .split(" ")
        .map((word) => new Str(word).Capitalize().Value())
        .join(" ")
        .replace("Ii", "II")
        .replace("IIi", "III")
        ;
}
