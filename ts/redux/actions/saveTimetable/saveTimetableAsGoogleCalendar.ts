/* global gapi */
declare let gapi: any;
import * as moment from "moment";
import {
    ParseDay
} from "../../../att/day";
import {
    Time
} from "../../../att/time";
import {
    Beautify
} from "../../../helper";
import {
    RawSlot
} from "../../../model/rawSlot";
import {
    Timetable
} from "../../../model/timetable";
import {
    TimePeriod
} from "./../../../att/timePeriod";
import {
    Week
} from "./../../../att/week";
import {
    SaveTimetable
} from "./saveTimetable";

export class SaveTimetableAsGoogleCalendar extends SaveTimetable {
    private loginAlready = false;
    private rawSlots: RawSlot[];
    private CLIENT_ID = "747215402741-95mierrdvdvh2ap8vn5jdk2i0u2totia.apps.googleusercontent.com";
    // TODO: Encrypt this
    private API_KEY = "AIzaSyAoizTbHtbJAyEtwumZDvNd_-DvybawDtw";
    private DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    private SCOPES = "https://www.googleapis.com/auth/calendar";
    protected Save(timetable: Timetable) {
        this.rawSlots = RawSlot.GetBunch(timetable.HashIds);
        this.loadClient();
    }
    protected SaveType(): string {
        return "google calendar";
    }

    private loadClient = () => {
        // alert(window.location.href);
        gapi.load("client:auth2", this.initClient); // eslint-disable-line
        console.log("handleClientLoad()");
    }

    private initClient = () => {
        gapi // eslint-disable-line
            .client
            .init({
                apiKey: this.API_KEY,
                clientId: this.CLIENT_ID,
                discoveryDocs: this.DISCOVERY_DOCS,
                scope: this.SCOPES
            })
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
        if (!this.loginAlready && isSignedIn) {
            // this.listUpcomingEvents();
            this.addTimetable();
            this.handleSignoutClick();
            this.loginAlready = true;
        } else {
            if (!this.loginAlready) {
                this.handleAuthClick();
            }
        }
    }

    private addTimetable() {
        this.rawSlots.forEach((s) => {
            this.addEvents(s);
        });
        this.addWeekNumberHeader();
    }

    private addWeekNumberHeader() {
        // TODO: Add week number header for each week
    }

    private addEvents(slot: RawSlot) {
        const calenderEvent = CreateEvent(slot, new Date(2017, 10, 15));
        gapi // eslint-disable-line
            .client
            .calendar
            .events
            .insert({
                calendarId: "primary",
                resource: calenderEvent
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

function sampleAddEvent() {
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
                    dateTime: "2017-11-15T05:30:00+08:00",
                    timeZone: "UTC+08:00"
                },
                // Recur on 2017-11-22 3:30 am, 2017-11-29 3:30 am
                recurrence: [`RDATE;TZID=Asia/Kuala_Lumpur:20171122T033000,20171129T033000`]
            }
        })
        .execute((event) => {
            // TODO: Implement snackbar confirmation.
        });

}

export function CreateEvent(slot: RawSlot, semesterStartDate: Date) {
    if (semesterStartDate.getDay() !== 1) {
        throw new Error("Expected semesterStartDay to be Monday but was " + semesterStartDate.toString());
    }
    const t = TimePeriod.Parse(slot.TimePeriod);
    const w = Week.Parse(slot.WeekNumber);
    semesterStartDate.setHours(t.StartTime.Hour);
    semesterStartDate.setMinutes(t.StartTime.Minute);
    semesterStartDate.setDate(semesterStartDate.getDate() + ParseDay(slot.Day) - 1);
    const dates = GetListOfDates(semesterStartDate, w.WeekNumberList);
    const startDate = moment(dates[0]).format("YYYY-MM-DD");
    const recurrence = GetRecurrence(dates.slice(1));
    const event = {
        summary: `${Beautify(slot.SubjectName)} (${slot.Type}-${slot.Group})`,
        location: slot.Room,
        description: `Subject code : ${slot.SubjectCode}, Week : ${slot.WeekNumber}`,
        start: {
            // dateTime: "2017-11-15T03:30:00+08:00", // +08:00 means UTC+08:00
            dateTime: startDate + "T" + t.GetStartTimeInIsoFormat() + ":00+08:00",
            timeZone: "UTC+08:00"
        },
        end: {
            dateTime: startDate + "T" + t.GetEndTimeInIsoFormat() + ":00+08:00",
            timeZone: "UTC+08:00"
        },
        recurrence: [recurrence]
    };
    return event;
}

export function AddByWeek(date: Date, numberOfWeeks: number): Date {
    const numberOfDaysPerWeek = 7;
    const clone = new Date(date.getTime());
    clone.setDate(clone.getDate() + numberOfWeeks * 7);
    return clone;
}

export function GetRecurrence(dates: Date[]): string {
    let header = "RDATE;TZID=Asia/Kuala_Lumpur:";
    dates.forEach((x) => {
        header += ToPureIsoString(x) + ",";
    });
    return header.substring(0, header.length - 1);
}

export function GetListOfDates(startDate: Date, week: number[]): Date[] {
    const result: Date[] = [];
    week.forEach((x) => {
        result.push(AddByWeek(startDate, x - 1));
    });
    return result;
}

export function ToPureIsoString(date: Date): string {
    function pad(input: number): string {
        if (input < 10) {
            return "0" + input;
        }
        return input.toString();
    }
    return date.getFullYear() +
        pad(date.getMonth() + 1) +
        pad(date.getDate()) + "T" +
        pad(date.getHours()) +
        pad(date.getMinutes()) +
        pad(date.getSeconds());
}
