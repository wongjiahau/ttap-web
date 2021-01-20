import { ParseDay } from "../../att/day";
import { TimePeriod } from "../../att/timePeriod";
import { Week } from "../../att/week";
import { ObjectStore } from "../../dataStructure/objectStore";
import { IGroupedTimetable } from "../../model/groupedTimetable";
import { RawSlot } from "../../model/rawSlot";
import { CreateSlotFromRaw } from "../../model/slot";
import { CreateSlotViewModel, FromSlotViewModelToRawSlot, ISlotViewModel } from "../../model/slotViewModel";
import { ParseRawSlotToSlot } from "../../parser/parseRawSlotToSlot";
import { ParseSlotToBigSlot } from "../../parser/parseSlotToBigSlot";
import { GetDayTimeMatrixOfBigSlot, IBigSlot, newBigSlot } from "../../permutator/bigSlot";
import { AppendMatrix, GotIntersection } from "../../permutator/matrix";
import { MasterStateAction } from "../reducers/masterState";
import { TinySlot } from "./../../permutator/tinySlot";
import { IMasterState } from "./../reducers/masterState";

/**
 * CurrentSlots means the slots that are being displayed at the moment.
 * So, this function is to search for all the alternative slots for each CurrentSlots
 */
export class FindAlternativeSlotsOfCurrentSlots extends MasterStateAction {
    public TypeName(): string { return "find alternative slots of current slots"; }

    protected GenerateNewState(state: IMasterState): IMasterState {
        // Due to performance issues, don't calculate if there are too many timetables
        if(state.TimetableListState.FiltrateTimetables.length > 7000) {
            return {
                ...state,
                SnackbarState: {
                    ...state.SnackbarState,
                    IsOpen: true,
                    Message: [
                        "Not calculating alternative slots due to performance reason,", 
                        " because there are more than 7000 possible timetables. ",
                        "\nTo allow the calculation, use Set Time Constraint feature",
                        " to decrease the number of possible timetables.",
                    ].join("")
                }
            }
        }

        const currentTimetable = state.TimetableListState.FiltrateTimetables[state.TimetableListState.CurrentIndex];
        if (!currentTimetable) {
            return state
        }
        const slotStore = state.TimetableListState.SlotViewModelStore
        const currentTimetableSlots = slotStore.GetBunch(
            currentTimetable.ListOfSlotUids[state.TimetableListState.CurrentSubIndex]
        )

        const filtrateTimetables = state.TimetableListState.FiltrateTimetables
            .map((timetable, index) => ({
                index,
                subtimetables: timetable.ListOfSlotUids
                    .map((slotUids, subIndex) => ({
                        subIndex,
                        slotUids
                    }))
            }))

        const slots = currentTimetableSlots.reduce(({ filtrateTimetables, resultSlots }, slot) => {
            const newSlots = findAlternativeSlot({
                targetSlot: slot,
                currentTimetableSlots,
                slotStore,
                filtrateTimetables
            })
            return {
                filtrateTimetables: filtrateTimetables.map(timetable => {
                    return {
                        ...timetable,

                        // This filter is important to reduce search space for the next iteration
                        subtimetables: timetable.subtimetables.filter(subtimetable =>
                            subtimetable.slotUids.some(uid => uid === slot.Uid)
                        )
                    }
                }),
                resultSlots: resultSlots.concat(newSlots)
            }
        }, { filtrateTimetables, resultSlots: [] } as {
            filtrateTimetables: typeof filtrateTimetables,
            resultSlots: ReturnType<typeof findAlternativeSlot>[]
        })
            .resultSlots


        const resultSlots = slots.map(({ slot, alternativeTimetables }) => {
            return {
                ...slot,
                AlternativeSlots: alternativeTimetables
                    .map(({ alternativeSlots, timetableIndex, timetableSubIndex }) =>
                        alternativeSlots.map(destinationSlot => ({
                            slot: { ...destinationSlot, SourceSlotUid: slot.Uid },
                            destinationTimetableIndex: timetableIndex,
                            destinationTimetableSubIndex: timetableSubIndex
                        }))
                    )
                    .reduce((a, b) => a.concat(b), [])
            }
        })

        const chosenSubjectSlots = state.TimetableListState.SlotViewModelStore.GetAll();
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                SlotViewModelStore: new ObjectStore(chosenSubjectSlots.map(slot => {
                    const matchingResultSlot = resultSlots.find(({ Uid }) => Uid === slot.Uid)
                    return matchingResultSlot ? matchingResultSlot : slot
                }))
            }
        };

    }
}

const sameKind = (a: ISlotViewModel, b: ISlotViewModel): boolean => {
    return a.Type === b.Type && a.SubjectCode === b.SubjectCode
}

export const findAlternativeSlot = ({
    targetSlot,
    currentTimetableSlots,
    slotStore,
    filtrateTimetables
}: {
    /**
     * The slot where we want to find the alternative slots of
     */
    targetSlot: ISlotViewModel
    currentTimetableSlots: ISlotViewModel[]
    slotStore: ObjectStore<ISlotViewModel>,
    filtrateTimetables: {
        index: number;
        subtimetables: {
            subIndex: number;
            slotUids: number[];
        }[];
    }[]
}) => {
    const slotsExceptCurrentSlotKind = currentTimetableSlots.filter((slot) =>
        !sameKind(slot, targetSlot)
    )
    type Timetable = (typeof filtrateTimetables)[0]

    const possibleDestinationTimetables = slotsExceptCurrentSlotKind
        .reduce<Timetable[]>((timetables, slot) => {
            return timetables.map(timetable => {
                const remainingSubtimetables = timetable.subtimetables
                    .filter(({ slotUids }) =>
                        !slotUids.some(Uid => Uid === targetSlot.Uid) &&
                        slotUids.some(Uid => Uid === slot.Uid)
                    )
                if (remainingSubtimetables.length > 0) {
                    return [{
                        ...timetable,
                        subtimetables: remainingSubtimetables
                    }]
                }
                else {
                    return []
                }
            })
                .reduce((a, b) => a.concat(b), [])
        }, filtrateTimetables)

    return {
        slot: targetSlot,
        alternativeTimetables: possibleDestinationTimetables.map(timetable => {
            return timetable.subtimetables.map(subtimetable => {
                return {
                    timetableIndex: timetable.index,
                    timetableSubIndex: subtimetable.subIndex,
                    alternativeSlots: slotStore.GetBunch(
                        subtimetable.slotUids.filter(uid =>
                            !slotsExceptCurrentSlotKind.some(slot => slot.Uid === uid)
                        )
                    )
                }
            })
        })
            .reduce((a, b) => a.concat(b), [])
    }

}