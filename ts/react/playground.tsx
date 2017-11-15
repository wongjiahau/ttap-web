/* global gapi */
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
declare var gapi : any;

export interface IPlaygroundProps {
    id : number; // this line is just to surpress TSLint error on empty interface
}

export class Playground extends React.Component < IPlaygroundProps, {} > {
    private CLIENT_ID = "747215402741-95mierrdvdvh2ap8vn5jdk2i0u2totia.apps.googleusercontent.com";
    private API_KEY = "AIzaSyAoizTbHtbJAyEtwumZDvNd_-DvybawDtw";
    private DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    private SCOPES = "https://www.googleapis.com/auth/calendar";
    public render() {
        const debugging = true;
        const content = debugging
            ? ""
            : (<TimetableCreatorContainer/>);
        return (
            <div>
                <MuiThemeProvider>
                    <div>{content}</div>
                </MuiThemeProvider>
                <div>
                    <p>Google Calendar API Quickstart</p>
                    <button id="authorize-button" onClick={this.handleAuthClick}>Authorize</button>
                    <button id="signout-button" onClick={this.handleSignoutClick}>Sign Out</button>
                </div>
            </div>
        );
    }
    // Client ID and API key from the Developer Console
    public componentWillMount() {
        this.handleClientLoad();
        //
    }

    private handleClientLoad = () => {
        gapi.load("client:auth2", this.initClient);
        console.log("handleClientLoad()");
    }

    private initClient = () => {
        gapi
            .client
            .init({apiKey: this.API_KEY, clientId: this.CLIENT_ID, discoveryDocs: this.DISCOVERY_DOCS, scope: this.SCOPES})
            .then(() => {
                console.log("initClient() success");
                // Listen for sign-in state changes.
                gapi
                    .auth2
                    .getAuthInstance()
                    .isSignedIn
                    .listen(this.updateSigninStatus);

                // Handle the initial sign-in state.
                this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            });
    }
    private updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
            // authorizeButton.style.display = 'none'; signoutButton.style.display =
            // "block";
            this.listUpcomingEvents();
        } else {
            // authorizeButton.style.display = 'block'; signoutButton.style.display =
            // 'none';
        }
        console.log("updateSigninState()");
    }

    private handleAuthClick = (event) => {
        try {
            gapi
                .auth2
                .getAuthInstance()
                .signIn();
        } catch (e) {
            alert(e);
        }
    }

    private handleSignoutClick = (event) => {
        gapi
            .auth2
            .getAuthInstance()
            .signOut();
    }

    private listUpcomingEvents = () => {
        gapi
            .client
            .calendar
            .events
            .list({
                calendarId: "primary",
                timeMin: (new Date()).toISOString(),
                showDeleted: false,
                singleEvents: true,
                maxResults: 10,
                orderBy: "startTime"
            })
            .then((response) => {
                const events = response.result.items;
                console.log("Upcoming events:");

                if (events.length > 0) {
                    for (let i = 0; i < events.length; i++) {
                        const event = events[i];
                        let when = event.start.dateTime;
                        if (!when) {
                            when = event.start.date;
                        }
                        console.log(event.summary + " (" + when + ")");
                    }
                } else {
                    console.log("No upcoming events found.");
                }
            });
    }
}
