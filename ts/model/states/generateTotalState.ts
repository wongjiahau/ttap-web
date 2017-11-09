import {
    Timetable
} from "./../timetable";
import {
    State
} from "./state";

export function GenerateTotalState(timetables: Timetable[]): State[] {
    const result = [];
    const definitelyOccupiedState = GetDefinitelyOccupiedState(timetables);
    const definitelyUnoccupiedState = GetDefinitelyUnoccupiedState(timetables);
    const maybeOccupiedState = GetMaybeOccupiedState(definitelyOccupiedState, definitelyUnoccupiedState);
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
