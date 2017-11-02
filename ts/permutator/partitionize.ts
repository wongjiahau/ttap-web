import {
    ISlot,
    Slot
} from "../model/slot";

export function Partitionize(input: ISlot[]): ISlot[][] {
    const result = new Array < ISlot[] > ();
    let column = new Array < ISlot > ();
    const copy = input.slice();
    while (copy.length > 0) {
        column.push(copy[0]);
        let i = 1;
        while (i < copy.length) {
            let failed = false;
            for (let j = 0; j < column.length; j++) {
                if (copy[i].SubjectCode !== column[j].SubjectCode || copy[i].Type !== column[j].Type ||
                    copy[i].Group === column[j].Group) {
                    i++;
                    failed = true;
                    break;
                }
            }
            if (!failed) {
                column.push(copy[i]);
                copy.splice(i, 1);
            }
        }
        result.push(column.slice());
        column = [];
        copy.splice(0, 1);
    }
    return result;
}
