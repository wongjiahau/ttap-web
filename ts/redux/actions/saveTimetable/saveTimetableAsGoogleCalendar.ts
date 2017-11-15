/* global gapi */
declare var gapi : any;
import {Timetable} from "../../../model/timetable";
import {SaveTimetable} from "./saveTimetable";

export class SaveTimetableAsGoogleCalendar extends SaveTimetable {
    private loginAlready = false;
    private CLIENT_ID = "747215402741-95mierrdvdvh2ap8vn5jdk2i0u2totia.apps.googleusercontent.com";
    // TODO: Encrypt this
    private API_KEY = "AIzaSyAoizTbHtbJAyEtwumZDvNd_-DvybawDtw";
    private DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    private SCOPES = "https://www.googleapis.com/auth/calendar";
    protected Save(timetable : Timetable) {
        this.loadClient();
    }
    protected SaveType() : string {return "google calendar";}

    private loadClient = () => {
        // alert(window.location.href);
        gapi.load("client:auth2", this.initClient); // eslint-disable-line
        console.log("handleClientLoad()");
    }

    private initClient = () => {
        gapi // eslint-disable-line
            .client
            .init({apiKey: this.API_KEY, clientId: this.CLIENT_ID, discoveryDocs: this.DISCOVERY_DOCS, scope: this.SCOPES})
            .then(() => {
                console.log("initClient() success");
                // Listen for sign-in state changes.
                gapi // eslint-disable-line
                    .auth2
                    .getAuthInstance()
                    .isSignedIn
                    .listen(this.updateSigninStatus);

                // Handle the initial sign-in state.
                this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()); // eslint-disable-line
            });
    }

    private updateSigninStatus = (isSignedIn) => {
        console.log("updateSigninState() where isSignedIn = " + isSignedIn);
        if (isSignedIn) {
            // this.listUpcomingEvents();
            this.addEvents();
            this.handleSignoutClick();
            this.loginAlready = true;
        } else {
            if (!this.loginAlready) {
                this.handleAuthClick();
            }
        }
    }

    private addEvents() {
        gapi // eslint-disable-line
            .client
            .calendar
            .events
            .insert({
                calendarId: "primary",
                resource: {
                    summary: "test event",
                    location: "test location",
                    description: "test description",
                    start: {
                        dateTime: "2017-11-15T03:30:00+08:00", // +08:00 means UTC+08:00

                        timeZone: "UTC+08:00"
                    },
                    end: {
                        dateTime: "2017-11-15T04:30:00+08:00",
                        timeZone: "UTC+08:00"
                    }
                }
            })
            .execute((event) => {
                // TODO: Implement snackbar confirmation.
            });
    }

    private handleAuthClick = () => {
        gapi // eslint-disable-line
            .auth2
            .getAuthInstance()
            .signIn();
    }

    private handleSignoutClick = () => {
        gapi // eslint-disable-line
            .auth2
            .getAuthInstance()
            .signOut();
    }

    private listUpcomingEvents = () => {
        gapi // eslint-disable-line
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
