import {MuiThemeProvider} from "material-ui";
import * as React from "react";
import Slot from "../model/rawSlot";
import ParseHtmlToSlots from "../parser/parseHtmlToRawSlot";
import ParseSlotToSubject from "../parser/parseSlotToSubject";
import {SubjectListViewContainer} from "../redux/containers/subjectListViewContainer";
import {heng_2017_sept} from "../tests/testData/heng_2017_sept";
import {CreateTimetableView} from "./createTimetableView";
import {SlotView} from "./slotView";
import {TimetableView} from "./timetableView";

export interface IPlaygroundProps {
    id : number; // this line is just to surpress TSLint error on empty interface
}

export class Playground extends React.Component < IPlaygroundProps, {} > {
    public render() {
        const testSlot = new Slot();
        testSlot.SubjectName = "Test subject";
        testSlot.Room = "KB 204";
        testSlot.WeekNumber = "1-14";
        const subjects = ParseSlotToSubject(ParseHtmlToSlots(heng_2017_sept()));
        return (
            <MuiThemeProvider>
                <div>
                    <SubjectListViewContainer/>
                </div>
            </MuiThemeProvider>
        );
    }
}
