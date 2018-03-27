
import { TimePeriod } from "../../att/timePeriod";
import {DecToBin} from "../../util/decToBin";
import { Str } from "../../util/str";
import {
    Timetable
} from "./../timetable";
import {
    StateKind,
    STCBox
} from "./stcBox";

export function GenerateTotalState(timetables: Timetable[], uidsOfClickedState: string[] = []): STCBox[] {
    const result = new Array < STCBox > ();
    const definitelyOccupiedState = GetDefinitelyOccupiedState(timetables); // dos
    const definitelyUnoccupiedState = GetDefinitelyUnoccupiedState(timetables); // dus
    const maybeOccupiedState = GetMaybeOccupiedState(definitelyOccupiedState, definitelyUnoccupiedState); // mos
    for (let day = 0; day < 7; day++) {
        // dos = definitelyOccupiedState in binary
        const dos = definitelyOccupiedState[day].toString(2).split("").reverse().join("");
        for (let j = 0; j < dos.length; j++) {
            if (dos[j] === "1") {
                const timeperiod = parseInt("1" + new Array(j + 1).join("0"), 2);
                result.push(new STCBox(StateKind.DefinitelyOccupied, day, timeperiod, j));
            }

        }
    }
    for (let day = 0; day < 7; day++) {
        // dus = definitelyUnoccupiedState in binary
        const totalNumberOfHalfHourPerDay = TimePeriod.GetNumberOfHalfHours();
        const dus = DecToBin(definitelyUnoccupiedState[day], totalNumberOfHalfHourPerDay).split("").reverse().join("");
        for (let j = 0; j < dus.length; j++) {
            if (dus[j] === "0") {
                const timeperiod = parseInt("1" + new Array(j + 1).join("0"), 2);
                result.push(new STCBox(StateKind.DefinitelyUnoccupied, day, timeperiod, j));
            }
        }
    }
    for (let day = 0; day < 7; day++) {
        // mos = maybeOccupiedState in binary
        const mos = maybeOccupiedState[day].toString(2).split("").reverse().join("");
        for (let j = 0; j < mos.length; j++) {
            if (mos[j] === "1") {
                const timeperiod = parseInt("1" + new Array(j + 1).join("0"), 2);
                result.push(new STCBox(StateKind.MaybeOccupied, day, timeperiod, j));
            }
        }
    }

    for (let i = 0; i < uidsOfClickedState.length; i++) {
        // change to clicked based on uidsOfClickedState
        for (let j = 0; j < result.length; j++) {
            if (result[j].Uid === uidsOfClickedState[i]) {
                result[j].Kind = StateKind.Clicked;
            }
        }
    }

    return result;
}

export function GetDefinitelyOccupiedState(timetables: Timetable[]): number[ /*7*/ ] {
    const result = [-1, -1, -1, -1, -1, -1, -1];
    for (let i = 0; i < timetables.length; i++) {
        for (let j = 0; j < 7; j++) {
            result[j] &= timetables[i].State[j];
        }
    }
    return result;
}

export function GetDefinitelyUnoccupiedState(timetables: Timetable[]): number[ /*7*/ ] {
    const result = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < timetables.length; i++) {
        for (let j = 0; j < 7; j++) {
            result[j] |= timetables[i].State[j];
        }
    }
    return result;
}

export function GetMaybeOccupiedState(definitelyOccupiedState: number[], definitelyUnoccupiedState: number[]): number[ /*7*/ ] {
    const result = definitelyOccupiedState.slice();
    for (let i = 0; i < 7; i++) {
        result[i] ^= definitelyUnoccupiedState[i];
    }
    return result;
}

export function StringifyTotalState(totalState: STCBox[]): string {
    const getRow = () => Array(TimePeriod.GetNumberOfHalfHours());
    const data = [
        getRow(),
        getRow(),
        getRow(),
        getRow(),
        getRow(),
        getRow(),
        getRow()
    ];
    totalState.forEach((state) => {
        data[state.Day][state.X] = state.Kind.toString();
    });
    const result =
       new Str(
            data.map((row) => {
                return row.join("");
            })
            .join("\n")
        )
        .ReplaceAll("0", "*") // * = definitely occupied
        .ReplaceAll("1", "-") // - = definitely unoccupied
        .ReplaceAll("2", "O") // O = maybe occupied
        .ReplaceAll("3", "X") // X = clicked
        .Value();
    return "\n" + result;
}
