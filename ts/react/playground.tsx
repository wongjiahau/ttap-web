/* global gapi */
declare var gapi : any;
import {MuiThemeProvider} from "material-ui";
import * as React from "react";
import {RawSlot} from "../model/rawSlot";
import ParseHtmlToSlots from "../parser/parseHtmlToRawSlot";
import {ParseSlotToSubject} from "../parser/parseSlotToSubject";
import {MainFrameContainer} from "../redux/containers/mainFrameContainer";
import {SubjectListViewContainer} from "../redux/containers/subjectListViewContainer";
import {TimetableCreatorContainer} from "../redux/containers/timetableCreatorContainer";
import {heng_2017_sept} from "../tests/testData/heng_2017_sept";
import {SlotView} from "./slotView";
import {TimetableCreatorView} from "./timetableCreatorView";
import {TimetableView} from "./timetableView/timetableView";

export interface IPlaygroundProps {
    id : number; // this line is just to surpress TSLint error on empty interface
}

export class Playground extends React.Component < IPlaygroundProps, {} > {
    private CLIENT_ID = "747215402741-95mierrdvdvh2ap8vn5jdk2i0u2totia.apps.googleusercontent.com";
    private API_KEY = "AIzaSyAoizTbHtbJAyEtwumZDvNd_-DvybawDtw";
    private DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    private SCOPES = "https://www.googleapis.com/auth/calendar";
    public render() {
        const debugging = false;
        const content = debugging
            ? ""
            : (<TimetableCreatorContainer/>);
        return (
            <div>
                <MuiThemeProvider>
                    <div>{content}</div>
                </MuiThemeProvider>
            </div>
        );
    }
}
