import {
    Beautify
} from "../helper";
import {
    PartitionizeByKey
} from "../permutator/partitionize";
import {
    RawSlot
} from "./rawSlot";
import {
    Timetable
} from "./timetable";

export class SubjectSummary {
    public readonly SubjectCode: string;
    public readonly SubjectName: string;
    public readonly Lecture: string;
    public readonly Tutorial: string;
    public readonly Practical: string;
    public constructor(rawSlots: RawSlot[]) {
        this.SubjectCode = rawSlots[0].SubjectCode;
        this.SubjectName = Beautify(rawSlots[0].SubjectName);
        const lectureSlot = this.GetSlotOf(rawSlots, "L");
        this.Lecture = lectureSlot ? "L-" + lectureSlot.Group : "-";
        const tutorialSlot = this.GetSlotOf(rawSlots, "T");
        this.Tutorial = tutorialSlot ? "T-" + tutorialSlot.Group : "-";
        const practicalSlot = this.GetSlotOf(rawSlots, "P");
        this.Practical = practicalSlot ? "P-" + practicalSlot.Group : "-";
    }

    public ToString(): string {
        return this.SubjectCode +
            "\r\n" +
            this.SubjectName +
            "\r\n" +
            this.Lecture +
            " " +
            this.Tutorial +
            " " +
            this.Practical +
            "\r\n";
    }

    private GetSlotOf(rawSlots: RawSlot[], slotType: string) {
        return rawSlots.filter((s) => s.Type === slotType)[0];
    }

}

export class TimetableSummary {
    public readonly SubjectSummaries: SubjectSummary[];
    public constructor(timetable: Timetable) {
        this.SubjectSummaries = [];
        const rawSlots = RawSlot.GetBunch(timetable.HashIds);
        const subjects = PartitionizeByKey(rawSlots, "SubjectCode");
        subjects.forEach((partition) => {
            this.SubjectSummaries.push(new SubjectSummary(partition));
        });
    }

    public ToString() : string {
        let result = "";
        this.SubjectSummaries.forEach((s) => {
            result += s.ToString();
            result += "\r\n";
        });
        return result;
    }
}
