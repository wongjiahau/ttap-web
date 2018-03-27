import {PartitionizeByKey} from "../permutator/partitionize";
import { BeautifySubjectName } from "../util/beautifySubjectName";
import {ISlotViewModel} from "./slotViewModel";

export class SubjectSummary {
    public readonly SubjectCode : string;
    public readonly SubjectName : string;
    public readonly Lecture : string;
    public readonly Tutorial : string;
    public readonly Practical : string;
    public constructor(slots : ISlotViewModel[]) {
        this.SubjectCode = slots[0].SubjectCode;
        this.SubjectName = BeautifySubjectName(slots[0].SubjectName);
        const extract = (type: string) => {
            const slot = this.GetSlotOf(slots, type);
            return slot
            ? `${type}-` + slot.Group[slot.CurrentChoice]
            : "-";
        };
        this.Lecture =  extract("L");
        this.Tutorial = extract("T");
        this.Practical = extract("P");
    }

    public ToString() : string {
        return this.SubjectCode + "\r\n" + this.SubjectName + "\r\n" + this.Lecture + " " + this.Tutorial + " " + this.Practical + "\r\n";
    }

    private GetSlotOf(slots : ISlotViewModel[], slotType : string) {
        return slots.filter((s) => s.Type === slotType)[0];
    }

}

export class TimetableSummary {
    public readonly SubjectSummaries : SubjectSummary[];
    public constructor(slots : ISlotViewModel[]) {
        this.SubjectSummaries = [];
        const subjects = PartitionizeByKey(slots, "SubjectCode");
        subjects.forEach((partition) => {
                this.SubjectSummaries.push(new SubjectSummary(partition));
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
