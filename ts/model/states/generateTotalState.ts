import * as S from "string";
import {
    DecToBin
} from "../../helper";
import {
    Timetable
} from "./../timetable";
import {
    State,
    StateKind
} from "./state";

export function GenerateTotalState(timetables: Timetable[]): State[] {
    const result = [];
    const definitelyOccupiedState = GetDefinitelyOccupiedState(timetables); // dos
    const definitelyUnoccupiedState = GetDefinitelyUnoccupiedState(timetables); // dus
    const maybeOccupiedState = GetMaybeOccupiedState(definitelyOccupiedState, definitelyUnoccupiedState); // mos
    for (let day = 0; day < 7; day++) {
        // dos = definitelyOccupiedState in binary
        const dos = definitelyOccupiedState[day].toString(2).split("").reverse().join("");
        for (let j = 0; j < dos.length; j++) {
            if (dos[j] === "1") {
                const timeperiod = parseInt("1" + new Array(j + 1).join("0"), 2);
                result.push(new State(StateKind.DefinitelyOccupied, day, timeperiod, j));
            }

        }
    }
    for (let day = 0; day < 7; day++) {
        // dus = definitelyUnoccupiedState in binary
        const totalNumberOfHalfHourPerDay = 26;
        const dus = DecToBin(definitelyUnoccupiedState[day], totalNumberOfHalfHourPerDay).split("").reverse().join("");
        for (let j = 0; j < dus.length; j++) {
            if (dus[j] === "0") {
                result.push(new State(StateKind.DefinitelyUnoccupied, day, null, j));
            }
        }
    }
    for (let day = 0; day < 7; day++) {
        // mos = maybeOccupiedState in binary
        const mos = maybeOccupiedState[day].toString(2).split("").reverse().join("");
        for (let j = 0; j < mos.length; j++) {
            if (mos[j] === "1") {
                const timeperiod = parseInt("1" + new Array(j + 1).join("0"), 2);
                result.push(new State(StateKind.MaybeOccupied, day, timeperiod, j));
            }
        }
    }
    return result;
}

export function GetDefinitelyOccupiedState(timetables: Timetable[]): number[ /*7*/ ] {
    const result = [-1, -1, -1, -1, -1, -1, -1];
    timetables.forEach((x) => {
        for (let i = 0; i < 7; i++) {
            result[i] &= x.State[i];
        }
    });
    return result;
}

export function GetDefinitelyUnoccupiedState(timetables: Timetable[]): number[ /*7*/ ] {
    const result = [0, 0, 0, 0, 0, 0, 0];
    timetables.forEach((x) => {
        for (let i = 0; i < 7; i++) {
            result[i] |= x.State[i];
        }
    });
    return result;
}

export function GetMaybeOccupiedState(definitelyOccupiedState: number[], definitelyUnoccupiedState: number[]): number[ /*7*/ ] {
    const result = definitelyOccupiedState.slice();
    for (let i = 0; i < 7; i++) {
        result[i] ^= definitelyUnoccupiedState[i];
    }
    return result;
}

export function StringifyTotalState(totalState: State[]): string {
    const data = [
        "..........................".split(""),
        "..........................".split(""),
        "..........................".split(""),
        "..........................".split(""),
        "..........................".split(""),
        "..........................".split(""),
        "..........................".split(""),
    ];
    totalState.forEach((state) => {
        data[state.Day][state.X] = state.Kind.toString();
    });
    const result =
        S(
            data.map((row) => {
                return row.join("");
            })
            .join("\n")
        )
        .replaceAll("0", "*") // * = definitely occupied
        .replaceAll("1", "-") // - = definitely unoccupied
        .replaceAll("2", "O") // O = maybe occupied
        .replaceAll("3", "X") // X = clicked
        .s;
    return "\n" + result;
}
