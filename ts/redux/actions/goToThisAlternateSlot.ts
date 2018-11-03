import {MasterStateAction} from "../reducers/masterState";
import {IMasterState} from "./../reducers/masterState";

export class GoToThisAlternateSlot extends MasterStateAction {
    public constructor(private slotUid: number) {
        super();
    }
    public TypeName() : string {return `go to this alternate slot (uid=${this.slotUid}) `; }

    protected GenerateNewState(state : IMasterState) : IMasterState {
        if (state.TimetableListState.ShowingAlternateSlotOf === null) {
            return state;
        }
        const timetables = state.TimetableListState.FiltrateTimetables;
        const indexOfPossibleDestinations: number[] = [];
        for (let i = 0; i < timetables.length; i++) {
            const t = state.TimetableListState.FiltrateTimetables[i];
            if (t.ListOfSlotUids[0].indexOf(this.slotUid) > -1) {
                indexOfPossibleDestinations.push(i);
            }
        }

        const currentTimetable = timetables[state.TimetableListState.CurrentIndex];

        let indexOfDestinationTimetable = -1; // indexOfPossibleDestinations[0];
        let destinationTimetableUids = [...currentTimetable.ListOfSlotUids[0]];
        destinationTimetableUids[destinationTimetableUids.indexOf(state.TimetableListState.ShowingAlternateSlotOf.Uid)] = this.slotUid;
        destinationTimetableUids = destinationTimetableUids.sort();

        for (let i = 0; i < indexOfPossibleDestinations.length; i++) {
            const index = indexOfPossibleDestinations[i];
            const t = timetables[index];
            if (arrayEqual(destinationTimetableUids, t.ListOfSlotUids[0].sort())) {
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
                CurrentSubIndex: 0,
                AlternativeSlots: []
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
