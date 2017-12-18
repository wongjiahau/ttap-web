/* global gapi */
declare var gapi : any;
import {MuiThemeProvider} from "material-ui";
import * as React from "react";
import {RawSlot} from "../model/rawSlot";
import ParseHtmlToSlots from "../parser/parseHtmlToRawSlot";
import {ParseSlotToSubject} from "../parser/parseSlotToSubject";
import {SubjectListViewContainer} from "../redux/containers/subjectListViewContainer";
import {TimetableCreatorContainer} from "../redux/containers/timetableCreatorContainer";
import {heng_2017_sept} from "../tests/testData/heng_2017_sept";
import { GetTestTimetables1 } from "../tests/testDataGenerator";
import { GetSemStartDateDialog } from "./getSemStartDateDialog";
import {SlotView} from "./slotView";
import {TimetableCreatorView} from "./timetableCreatorView";
import { TimetableSummaryView } from "./timetableSummaryView";
import {TimetableView} from "./timetableView/timetableView";

export interface IPlaygroundProps {
    id : number; // this line is just to surpress TSLint error on empty interface
}

export class Playground extends React.Component < IPlaygroundProps, {} > {
    public render() {
        const debugging = false;
        const content = debugging
            ? ""
            : (<TimetableCreatorContainer/>);
        const timetable = GetTestTimetables1()[0];
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <TimetableSummaryView Timetable={timetable}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
