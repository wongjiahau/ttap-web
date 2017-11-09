import {saveAs} from "file-saver";
import {MuiThemeProvider} from "material-ui";
import * as React from "react";
import Highlighter = require("react-highlight-words");
import {RawSlot} from "../model/rawSlot";
import ParseHtmlToSlots from "../parser/parseHtmlToRawSlot";
import {ParseSlotToSubject} from "../parser/parseSlotToSubject";
import {MainFrameContainer} from "../redux/containers/mainFrameContainer";
import {SubjectListViewContainer} from "../redux/containers/subjectListViewContainer";
import {TimetableCreatorContainer} from "../redux/containers/timetableCreatorContainer";
import {heng_2017_sept} from "../tests/testData/heng_2017_sept";
import {SlotView} from "./slotView";
import {TimetableCreatorView} from "./timetableCreatorView";
import {TimetableView} from "./timetableView";

export interface IPlaygroundProps {
    id : number; // this line is just to surpress TSLint error on empty interface
}

export class Playground extends React.Component < IPlaygroundProps, {} > {
    public render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[]}
                        textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"/>
                    <TimetableCreatorContainer/>
                </div>
            </MuiThemeProvider>
        );
    }
}
