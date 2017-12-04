import {
    RawSlot
} from "./rawSlot";

export class SubjectSchema {
    public GotLecture: boolean;
    public GotPractical: boolean;
    public GotTutorial: boolean;
    public SubjectCode: string;

    public constructor(gotLecture = false, gotTutorial = false, gotPractical = false, subjectCode = "") {
        this.GotLecture = gotLecture;
        this.GotTutorial = gotTutorial;
        this.GotPractical = gotPractical;
        this.SubjectCode = subjectCode;
    }

    public IsEqual(other: SubjectSchema): boolean {
        return this.SubjectCode === other.SubjectCode &&
            this.GotLecture === other.GotLecture &&
            this.GotTutorial === other.GotTutorial &&
            this.GotPractical === other.GotPractical;
    }
}

export function GenerateSubjectSchema(slots: RawSlot[]): SubjectSchema {
    const subjectCode = slots[0].SubjectCode;
    for (let i = 0; i < slots.length; i++) {
        if (slots[i].SubjectCode !== subjectCode) {
            throw new Error("Not all of the slots passed in are from the same subject.");
        }
    }
    const result = new SubjectSchema();
    result.SubjectCode = subjectCode;
    slots.forEach((s) => {
        switch (s.Type) {
            case "L":
                result.GotLecture = true;
                break;
            case "T":
                result.GotTutorial = true;
                break;
            case "P":
                result.GotPractical = true;
                break;
        }
    });
    return result;
}

export class DiffReport {
    public readonly SubjectCode: string;
    public readonly MissingSlotType: "L" | "T" | "P";
    public constructor(subjectCode: string, missingSlotType: "L" | "T" | "P") {
        this.SubjectCode = subjectCode;
        this.MissingSlotType = missingSlotType;
    }
}

export function GetDiff(x: SubjectSchema, y: SubjectSchema): DiffReport[] {
    const result: DiffReport[] = [];
    if (x.IsEqual(y)) {
        return null;
    }
    if (x.GotLecture !== y.GotLecture) {
        result.push(new DiffReport(x.SubjectCode, "L"));
    }
    if (x.GotTutorial !== y.GotTutorial) {
        result.push(new DiffReport(x.SubjectCode, "T"));
    }
    if (x.GotPractical !== y.GotPractical) {
        result.push(new DiffReport(x.SubjectCode, "P"));
    }
    return result;
}
