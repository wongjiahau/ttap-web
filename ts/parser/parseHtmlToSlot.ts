import Slot from "../model/slot";
export default function parser(html: string): Slot[] {
        const slots = new Array < Slot > ();
        const htmlDoc = new DOMParser().parseFromString(html, "text/html");
        const tableRows = htmlDoc
            .getElementById("overviewSector")
            .getElementsByTagName("table")[0]
            .getElementsByTagName("tbody")[0]
            .getElementsByTagName("tr");
        // i = 1 because we need to skip the first <tr> which is the header of the table
        let currentSubjectName: string;
        let currentSubjectCode: string;
        for (let i = 1; i < tableRows.length; i++) {
            const cells = tableRows[i].getElementsByTagName("td");
            if (cells.length === 1) {
                currentSubjectCode = cells[0].innerHTML.split("-")[0];
                currentSubjectName = cells[0].innerHTML.split("-")[1].split("[")[0].replace("&amp;", "&").trim();
                continue;
            }
            const newSlot = new Slot() ;
            newSlot.SubjectCode = currentSubjectCode;
            newSlot.SubjectName = currentSubjectName;
            for (let j = 0; j < cells.length; j++) {
                const cellValue = cells[j].innerHTML;
                switch (j) {
                    case 0: newSlot.Number = cellValue; break;
                    case 1: newSlot.Type = cellValue; break;
                    case 2: newSlot.Group = cellValue; break;
                    case 3: /*class size*/ break;
                    case 4: newSlot.Day = cellValue; break;
                    case 5: newSlot.TimePeriod = cellValue; break;
                    case 6: /*credit hour*/ break;
                    case 7: newSlot.WeekNumber = cellValue; break;
                    case 8: /*remark*/ break;
                    case 9: newSlot.Room = cellValue; break;
                }
            }
            slots.push(newSlot);
        }
        return slots;
}
