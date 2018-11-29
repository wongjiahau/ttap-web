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
        // tslint:disable-next-line:array-type
        const indexOfPossibleDestinations: [number, number][] = [];
        for (let i = 0; i < timetables.length; i++) {
            const t = state.TimetableListState.FiltrateTimetables[i];
            for (let j = 0; j < t.ListOfSlotUids.length; j++) {
                if (t.ListOfSlotUids[j].indexOf(this.destinationSlotUid) > -1) {
                    indexOfPossibleDestinations.push([i, j]);
                }
            }
        }

        const currentTimetable = timetables[state.TimetableListState.CurrentIndex];

        let indexOfDestinationTimetable: [/*index*/ number, /*subindex*/ number] =
            [state.TimetableListState.CurrentIndex, state.TimetableListState.CurrentSubIndex];

        const destinationTimetableUids = [...currentTimetable.ListOfSlotUids[state.TimetableListState.CurrentSubIndex]];
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
            const dest = indexOfPossibleDestinations[i];
            const t = timetables[dest[0 /*index*/]];

            if (setEqual(
                    destinationTimetableSlotNumbers,
                    new Set(
                        state.TimetableListState.SlotViewModelStore.GetBunch(
                        t.ListOfSlotUids[dest[1 /*subindex*/]]
                        ).map((x) => x.SlotNumber)
                    )
                )) {
                indexOfDestinationTimetable = dest;
                break;
            }
        }

        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                CurrentIndex: indexOfDestinationTimetable[0],
                CurrentSubIndex: indexOfDestinationTimetable[1],
                AlternativeSlots: [],
                ShowingAlternateSlotOf: null
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
