declare let gapi: any;
const addWeeks = require("date-fns/add_weeks");
const format = require("date-fns/format");
const addDays = require("date-fns/add_days");
const max = require("lodash.max");
/* global gapi */
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

    public constructor(private semStartDate: Date) {
        super();
        // the gapi client is already initialized at index.html
    }

    protected Save(timetable: Timetable) {
        this.rawSlots = RawSlot.GetBunch(timetable.HashIds);

        gapi // eslint-disable-line
            .auth2
            .getAuthInstance()
            .isSignedIn
            .listen(this.updateSigninStatus);

        // Handle the initial sign-in state.
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()); // eslint-disable-line
    }

    protected SaveType(): string {
        return "google calendar";
    }

    private updateSigninStatus = (isSignedIn) => {
        if (!this.loginAlready && isSignedIn) {
            this.loginAlready = true;
            this.addTimetable();
            this.handleSignoutClick();
            alert("The timetable is successfully added to your Google Calendar!");
        } else {
            if (!this.loginAlready) {
                this.handleAuthClick();
            }
        }
    }

    private addTimetable() {
        const semStartDate = this.semStartDate;
        this.rawSlots.forEach((s) => {
            this.addEvents(CreateEvent(s, semStartDate));
        });
        GetWeekNumberHeaders(semStartDate, GetMaxWeek(this.rawSlots)).forEach((event) => {
            this.addEvents(event);
        });
        window.open("https://calendar.google.com/");
    }

    private addEvents(calenderEvent) {
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
    const semStartDate = new Date(semesterStartDate.getTime());
    if (semStartDate.getDay() !== 1) {
        throw new Error("Expected semesterStartDay to be Monday but was " + semStartDate.toString());
    }
    const t = TimePeriod.Parse(slot.TimePeriod);
    const w = Week.Parse(slot.WeekNumber);
    semStartDate.setHours(t.StartTime.Hour);
    semStartDate.setMinutes(t.StartTime.Minute);
    semStartDate.setDate(semStartDate.getDate() + ParseDay(slot.Day) - 1);
    const dates = GetListOfDates(semStartDate, w.WeekNumberList);
    const startDate = format(dates[0], "YYYY-MM-DD");
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

export function GetMaxWeek(slots: RawSlot[]) {
    return max(slots.map((s) => max(Week.Parse(s.WeekNumber).WeekNumberList)));
}

export function GetWeekNumberHeaders(semStartDate: Date, maxWeek: number): any[] {
    const numberOfDaysPerWeek = 7;
    const result = [];
    if (semStartDate.getDay() !== 1) {
        throw new Error("Semester start date must be a Monday");
    }
    let startDate = semStartDate;
    let endDate = addDays(semStartDate, 5);
    for (let i = 0; i < maxWeek; i++) {
        const event = {
            summary: "Week " + (i + 1),
            start: {
                date: format(startDate, "YYYY-MM-DD"),
                timeZone: "UTC+08:00"
            },
            end: {
                date: format(endDate, "YYYY-MM-DD"),
                timeZone: "UTC+08:00"
            }
        };
        result.push(event);
        startDate = addWeeks(startDate, 1);
        endDate = addWeeks(endDate, 1);
    }
    return result;
}
