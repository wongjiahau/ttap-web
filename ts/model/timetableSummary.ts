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

        // According to Dr. Madhavan,
        // the credit hour can be obtained from the last digit of the subject code
        const creditHour = this.SubjectCode.slice(-1)[0];

        this.CreditHour = parseFloat(creditHour ? creditHour : "0.0");
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
