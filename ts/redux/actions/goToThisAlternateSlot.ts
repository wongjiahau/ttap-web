import {MasterStateAction} from "../reducers/masterState";
import {IMasterState} from "./../reducers/masterState";

export class GoToThisAlternateSlot extends MasterStateAction {
    public constructor(private slotUid: number) {
        super();
    }
    public TypeName() : string {return `go to this alternate slot (uid=${this.slotUid}) `; }

    protected GenerateNewState(state : IMasterState) : IMasterState {
        const timetables = state.TimetableListState.FiltrateTimetables;
        const indexOfPossibleDestinations: number[] = [];
        for (let i = 0; i < timetables.length; i++) {
            const t = state.TimetableListState.FiltrateTimetables[i];
            if (t.Uids.indexOf(this.slotUid) > -1) {
                indexOfPossibleDestinations.push(i);
            }
        }

        const currentTimetable = timetables[state.TimetableListState.CurrentIndex];

        let indexOfDestinationTimetable = -1; // indexOfPossibleDestinations[0];
        let destinationTimetableUids = [...currentTimetable.Uids];
        destinationTimetableUids[destinationTimetableUids.indexOf(state.TimetableListState.ShowingAlternateSlotOf.Uid)] = this.slotUid;
        destinationTimetableUids = destinationTimetableUids.sort();

        console.log(currentTimetable.Uids.sort());
        console.log(destinationTimetableUids);

        for (let i = 0; i < indexOfPossibleDestinations.length; i++) {
            const index = indexOfPossibleDestinations[i];
            const t = timetables[index];
            if (arrayEqual(destinationTimetableUids, t.Uids.sort())) {
                indexOfDestinationTimetable = index;
                break;
            }
        }

        // in case the indexOfDestinationTimetable can't be found (which is a bug that should be fix)
        if (indexOfDestinationTimetable < 0) {
            indexOfDestinationTimetable = indexOfPossibleDestinations[0];
        }

        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                CurrentIndex: indexOfDestinationTimetable,
                AlternateSlots: []
            },
            SnackbarState: {
                ...state.SnackbarState,
                IsOpen: false
            }
        };
    }
}

function arrayEqual<T>(xs: T[], ys: T[]): boolean {
    if (xs.length !== ys.length) {
        throw new Error("xs length should be equal to ys length");
    } else {
        for (let i = 0; i < xs.length; i++) {
            if (xs[i] !== ys[i]) {
                return false;
            }
        }
        return true;
    }
}
