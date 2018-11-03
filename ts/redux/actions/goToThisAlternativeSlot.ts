import {MasterStateAction} from "../reducers/masterState";
import {IMasterState} from "../reducers/masterState";

export class GoToThisAlternativeSlot extends MasterStateAction {
    public constructor(private destinationSlotUid: number) {
        super();
    }
    public TypeName() : string {return `go to this alternate slot (uid=${this.destinationSlotUid}) `; }

    protected GenerateNewState(state : IMasterState) : IMasterState {
        if (state.TimetableListState.ShowingAlternateSlotOf === null) {
            return state;
        }
        const timetables = state.TimetableListState.FiltrateTimetables;
        const indexOfPossibleDestinations: number[] = [];
        for (let i = 0; i < timetables.length; i++) {
            const t = state.TimetableListState.FiltrateTimetables[i];
            for (let j = 0; j < t.ListOfSlotUids.length; j++) {
                if (t.ListOfSlotUids[j].indexOf(this.destinationSlotUid) > -1) {
                    indexOfPossibleDestinations.push(i);
                }
            }
        }

        const currentTimetable = timetables[state.TimetableListState.CurrentIndex];

        let indexOfDestinationTimetable = -1; // indexOfPossibleDestinations[0];

        const destinationTimetableUids = [...currentTimetable.ListOfSlotUids[0]];
        const destinationTimetableSlotNumbers = new Set(
            state.TimetableListState.SlotViewModelStore.GetBunch(
                destinationTimetableUids
            ).map((x) => x.SlotNumber)
        );

        destinationTimetableSlotNumbers.delete(state.TimetableListState.ShowingAlternateSlotOf.SlotNumber);
        destinationTimetableSlotNumbers.add(
            state.TimetableListState.SlotViewModelStore.GetOne(this.destinationSlotUid).SlotNumber
        );

        for (let i = 0; i < indexOfPossibleDestinations.length; i++) {
            const index = indexOfPossibleDestinations[i];
            const t = timetables[index];
            if (setEqual(
                    destinationTimetableSlotNumbers,
                    new Set(
                        state.TimetableListState.SlotViewModelStore.GetBunch(
                            t.ListOfSlotUids[0]
                        ).map((x) => x.SlotNumber)
                    )
                )) {
                indexOfDestinationTimetable = index;
                break;
            }
        }

        // in case the indexOfDestinationTimetable can't be found (which is a bug that should be fix)
        if (indexOfDestinationTimetable < 0) {
            throw new Error();
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

function setEqual<T>(as: Set<T>, bs: Set<T>): boolean {
    if (as.size !== bs.size) { return false; }
    for (const a of as) { if (!bs.has(a)) { return false; } }
    return true;
}
