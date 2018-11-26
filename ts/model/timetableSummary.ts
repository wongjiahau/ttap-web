import {PartitionizeByKey} from "../permutator/partitionize";
import { BeautifySubjectName } from "../util/beautifySubjectName";
import { RawSlot } from "./rawSlot";
import {ISlotViewModel} from "./slotViewModel";

export class SubjectSummary {
    public readonly SubjectCode : string;
    public readonly SubjectName : string;
    public readonly Lecture : string;
    public readonly Tutorial : string;
    public readonly Practical : string;
    public readonly CreditHour: number;
    public constructor(slots : ISlotViewModel[]) {
        this.SubjectCode = slots[0].SubjectCode;
        this.SubjectName = BeautifySubjectName(slots[0].SubjectName);
        const extract = (type: string) => {
            const slot = this.GetSlotOf(slots, type);
            return slot
            ? `${type}(${slot.Group[slot.CurrentChoice]})`
            : "-"; // dash means none
        };
        this.Lecture =  extract("L");
        this.Tutorial = extract("T");
        this.Practical = extract("P");
        this.CreditHour = parseFloat(slots[0].CreditHour ? slots[0].CreditHour : "0.0");
            // Why slots[0] ?
            // Actually it can be any slots, because the CreditHour of each slots
            // from the same subject will have the same value
            // This is a form of data denormalization
    }

    public ToString() : string {
        return this.SubjectCode + "\r\n" + this.SubjectName + "\r\n" + this.Lecture + " " + this.Tutorial + " " + this.Practical + "\r\n";
    }

    private GetSlotOf(slots : ISlotViewModel[], slotType : string) {
        return slots.filter((s) => s.Type === slotType)[0];
    }

}

export class TimetableSummary {
    public SubjectSummaries : SubjectSummary[];
    public constructor(chosenSlots : ISlotViewModel[]) {
        this.SubjectSummaries =
            PartitionizeByKey(chosenSlots, "SubjectCode")
            .map((partition) => new SubjectSummary(partition));
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

    public SortByScarcity(allSlots: RawSlot[]): TimetableSummary {
        this.SubjectSummaries = (this.SubjectSummaries.sort((x, y) => {
            const relatedSlots = (subject: SubjectSummary) =>
                allSlots.filter((s) => s.SubjectCode === subject.SubjectCode);

            return relatedSlots(x).length - relatedSlots(y).length;
        }));
        return this;
    }
}
