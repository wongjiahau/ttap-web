import {Beautify} from "../helper";
import {PartitionizeByKey} from "../permutator/partitionize";
import {IGeneralizedSlot} from "./generalizedSlot";

export class SubjectSummary {
    public readonly SubjectCode : string;
    public readonly SubjectName : string;
    public readonly Lecture : string;
    public readonly Tutorial : string;
    public readonly Practical : string;
    public constructor(slots : IGeneralizedSlot[]) {
        this.SubjectCode = slots[0].SubjectCode;
        this.SubjectName = Beautify(slots[0].SubjectName);
        const lectureSlot = this.GetSlotOf(slots, "L");
        this.Lecture = lectureSlot
            ? "L-" + lectureSlot.Group[lectureSlot.CurrentChoice]
            : "-";
        const tutorialSlot = this.GetSlotOf(slots, "T");
        this.Tutorial = tutorialSlot
            ? "T-" + tutorialSlot.Group[lectureSlot.CurrentChoice]
            : "-";
        const practicalSlot = this.GetSlotOf(slots, "P");
        this.Practical = practicalSlot
            ? "P-" + practicalSlot.Group[lectureSlot.CurrentChoice]
            : "-";
    }

    public ToString() : string {
        return this.SubjectCode + "\r\n" + this.SubjectName + "\r\n" + this.Lecture + " " + this.Tutorial + " " + this.Practical + "\r\n";
    }

    private GetSlotOf(slots : IGeneralizedSlot[], slotType : string) {
        return slots.filter((s) => s.Type === slotType)[0];
    }

}

export class TimetableSummary {
    public readonly SubjectSummaries : SubjectSummary[];
    public constructor(slots : IGeneralizedSlot[]) {
        this.SubjectSummaries = [];
        const subjects = PartitionizeByKey(slots, "SubjectCode");
        subjects.forEach((partition) => {
            if (partition.length > 0) {
                this
                    .SubjectSummaries
                    .push(new SubjectSummary(partition));
            }
        });
    }

    public ToString() : string {
        let result = "";
        this
            .SubjectSummaries
            .forEach((s) => {
                result += s.ToString();
                result += "\r\n";
            });
        return result;
    }
}
