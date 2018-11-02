import { ObjectStore } from "../../dataStructure/objectStore";
import { CreateSlotFromRaw } from "../../model/slot";
import { CreateSlotViewModel, FromSlotViewModelToRawSlot, ISlotViewModel } from "../../model/slotViewModel";
import { ParseRawSlotToSlot } from "../../parser/parseRawSlotToSlot";
import { ParseSlotToBigSlot } from "../../parser/parseSlotToBigSlot";
import { BigSlot, GetDayTimeMatrixOfBigSlot } from "../../permutator/bigSlot";
import { AppendMatrix, GotIntersection } from "../../permutator/matrix";
import {MasterStateAction} from "../reducers/masterState";
import { TinySlot } from "./../../permutator/tinySlot";
import {IMasterState} from "./../reducers/masterState";
import { TimePeriod } from "../../att/timePeriod";
import { Week } from "../../att/week";
import { ParseDay } from "../../att/day";
import { RawSlot } from "../../model/rawSlot";

/**
 * CurrentSlots means the slots that are being displayed at the moment.
 * So, this function is to search for all the alternative slots for each CurrentSlots
 * Note, this function did not use map/filter/reduce, because it needs a very high performance,
 *  as this function is invoked whenver user are browsing through timetables
 */
export class FindAlternativeSlotsOfCurrentSlots extends MasterStateAction {
    public TypeName() : string {return "go to next timetable"; }

    protected GenerateNewState(state : IMasterState) : IMasterState {
        const allSlots = state.DataState.RawSlotDataRouter.GetCurrentData().GetAll();
        const uidsOfFiltratedSlots = new Set<number>();
        // filtrated means not being removed, it also means the slots of of those currently selected subjects

        for (let i = 0; i < state.TimetableListState.FiltrateTimetables.length; i++) {
            const t = state.TimetableListState.FiltrateTimetables[i];
            for (let j = 0; j < t.Uids.length; j++) {
                uidsOfFiltratedSlots.add(t.Uids[j]);
            }
        }

        // get the state of the current timetable
        // Why not use currentTimetable.State? because it is already compressed (means only contain data for 1 week)
        const currentSlots = state.TimetableListState.SlotViewModelStore.GetAll();
        const currentTimetable = state.TimetableListState.FiltrateTimetables[state.TimetableListState.CurrentIndex];
        const currentTimetableState: number[] = (() => {
            let result: number[] = [];
            for (let i = 0; i < currentSlots.length; i++) {
                const x = currentSlots[i];
                if(currentTimetable.Uids.indexOf(x.Uid) > -1) {
                    result = AppendMatrix( 
                        GetDayTimeMatrixOfBigSlot(
                            ParseDay(x.Day),
                            Week.Parse(x.WeekNumber[0]).BinaryData,
                            TimePeriod.Parse(x.TimePeriod).BinaryData
                        ), result);
                }
            }
            return result;
        })();

        for (let i = 0; i < currentSlots.length; i++) {
            const targetSlot = currentSlots[i];
            let alternativeSlots = (() => {
                // alternativeSlots are slots that have the same SubjectCode and same Type but different UID
                // with the targetSlot
                // alternativeSlots are also those that do not clashes with the current timetable (that are displayed at that moment)
                const result: ISlotViewModel[] = [];
                for (let i = 0; i < allSlots.length; i++) {
                    const x = allSlots[i];
                    if (x.Uid !== targetSlot.Uid
                        && uidsOfFiltratedSlots.has(x.Uid)
                        && x.SubjectCode === targetSlot.SubjectCode
                        && x.Type === targetSlot.Type
                        && !GotIntersection(currentTimetableState, new BigSlot(CreateSlotFromRaw(x)).DayTimeMatrix)) {
                            const temp = CreateSlotViewModel(x);
                            temp.IsAlternativeSlot = true;
                            result.push(temp);
                        }
                }
                return result;
            })();

            // The following code is to patch issue #101
            // Refer https://github.com/wongjiahau/ttap-web/issues/101
            const numberOfSiblingSlots = currentSlots
                .filter((x) => x.SlotNumber === targetSlot.SlotNumber && /*but*/ x.Uid !== targetSlot.Uid).length;

            if (numberOfSiblingSlots > 0) {
                alternativeSlots = alternativeSlots
                    .sort((x, y) => x.SlotNumber > y.SlotNumber ? 1 : 0)
                    .filter(((x) => alternativeSlots
                        .filter((y) => y.SlotNumber === x.SlotNumber).length - 1 === numberOfSiblingSlots));
            }
            // end of patch

            targetSlot.AlternativeSlots = alternativeSlots;
        }

        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                SlotViewModelStore: new ObjectStore(currentSlots)
            }
        };
    }
}
