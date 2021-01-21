"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addWeeks = require("date-fns/add_weeks");
const format = require("date-fns/format");
const addDays = require("date-fns/add_days");
const max = require("lodash.max");
/* global gapi */
const day_1 = require("../../../att/day");
const beautifySubjectName_1 = require("../../../util/beautifySubjectName");
const timePeriod_1 = require("./../../../att/timePeriod");
const week_1 = require("./../../../att/week");
const saveTimetable_1 = require("./saveTimetable");
const NUMBER_OF_DAYS_PER_WEEK = 7;
class SaveTimetableAsGoogleCalendar extends saveTimetable_1.SaveTimetable {
    constructor(semStartDate) {
        super();
        this.semStartDate = semStartDate;
        this.loginAlready = false;
        this.rawSlots = [];
        this.updateSigninStatus = (isSignedIn) => {
            if (!this.loginAlready && isSignedIn) {
                this.loginAlready = true;
                this.addTimetable();
                this.handleSignoutClick();
                alert("The timetable is successfully added to your Google Calendar!");
            }
            else {
                if (!this.loginAlready) {
                    this.handleAuthClick();
                }
            }
        };
        this.handleAuthClick = () => {
            gapi // eslint-disable-line
                .auth2
                .getAuthInstance()
                .signIn();
        };
        this.handleSignoutClick = () => {
            gapi // eslint-disable-line
                .auth2
                .getAuthInstance()
                .signOut();
        };
        // the gapi client is already initialized at index.html
    }
    Save(timetable, rawSlotStore) {
        this.rawSlots = rawSlotStore.GetBunch(timetable.SlotUids);
        gapi // eslint-disable-line
            .auth2
            .getAuthInstance()
            .isSignedIn
            .listen(this.updateSigninStatus);
        // Handle the initial sign-in state.
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()); // eslint-disable-line
    }
    SaveType() {
        return "google calendar";
    }
    addTimetable() {
        const semStartDate = this.semStartDate;
        this.rawSlots.forEach((s) => {
            this.addEvents(CreateEvent(s, semStartDate));
        });
        GetWeekNumberHeaders(semStartDate, GetMaxWeek(this.rawSlots)).forEach((event) => {
            this.addEvents(event);
        });
        window.open("https://calendar.google.com/");
    }
    addEvents(calenderEvent) {
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
}
exports.SaveTimetableAsGoogleCalendar = SaveTimetableAsGoogleCalendar;
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
                dateTime: "2017-11-15T03:30:00+08:00",
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
function CreateEvent(slot, semesterStartDate) {
    const semStartDate = new Date(semesterStartDate.getTime());
    if (semStartDate.getDay() !== 1) {
        throw new Error("Expected semesterStartDay to be Monday but was " + semStartDate.toString());
    }
    const t = timePeriod_1.TimePeriod.Parse(slot.TimePeriod);
    const w = week_1.Week.Parse(slot.WeekNumber);
    semStartDate.setHours(t.StartTime.Hour);
    semStartDate.setMinutes(t.StartTime.Minute);
    semStartDate.setDate(semStartDate.getDate() + day_1.ParseDay(slot.Day) - 1);
    const dates = GetListOfDates(semStartDate, w.WeekNumberList);
    const startDate = format(dates[0], "YYYY-MM-DD");
    const recurrence = GetRecurrence(dates.slice(1));
    const event = {
        summary: `${beautifySubjectName_1.BeautifySubjectName(slot.SubjectName)} (${slot.Type}-${slot.Group})`,
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
exports.CreateEvent = CreateEvent;
function AddByWeek(date, numberOfWeeks) {
    const clone = new Date(date.getTime());
    clone.setDate(clone.getDate() + numberOfWeeks * NUMBER_OF_DAYS_PER_WEEK);
    return clone;
}
exports.AddByWeek = AddByWeek;
function GetRecurrence(dates) {
    let header = "RDATE;TZID=Asia/Kuala_Lumpur:";
    dates.forEach((x) => {
        header += ToPureIsoString(x) + ",";
    });
    return header.substring(0, header.length - 1);
}
exports.GetRecurrence = GetRecurrence;
function GetListOfDates(startDate, week) {
    const result = [];
    week.forEach((x) => {
        result.push(AddByWeek(startDate, x - 1));
    });
    return result;
}
exports.GetListOfDates = GetListOfDates;
function ToPureIsoString(date) {
    function pad(input) {
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
exports.ToPureIsoString = ToPureIsoString;
function GetMaxWeek(slots) {
    return max(slots.map((s) => max(week_1.Week.Parse(s.WeekNumber).WeekNumberList)));
}
exports.GetMaxWeek = GetMaxWeek;
function GetWeekNumberHeaders(semStartDate, maxWeek) {
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
exports.GetWeekNumberHeaders = GetWeekNumberHeaders;
//# sourceMappingURL=saveTimetableAsGoogleCalendar.js.map