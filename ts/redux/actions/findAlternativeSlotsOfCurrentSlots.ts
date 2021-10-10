import { ObjectStore } from "../../dataStructure/objectStore";
import { ISlotViewModel } from "../../model/slotViewModel";
import { MasterStateAction } from "../reducers/masterState";
import { IMasterState } from "./../reducers/masterState";

/**
 * CurrentSlots means the slots that are being displayed at the moment.
 * So, this function is to search for all the alternative slots for each CurrentSlots
 */
export class FindAlternativeSlotsOfCurrentSlots extends MasterStateAction {
  public constructor() {
    super();
  }
  public TypeName(): string {
    return "find alternative slots of current slots";
  }

  protected GenerateNewState(state: IMasterState): IMasterState {
    const currentTimetable =
      state.TimetableListState.FiltrateTimetables[
        state.TimetableListState.CurrentIndex
      ];
    if (!currentTimetable) {
      return state;
    }
    const slotStore = state.TimetableListState.SlotViewModelStore;

    const allSlots = slotStore.GetAll();
    const currentTimetableSlots = slotStore
      .GetBunch(
        currentTimetable.ListOfSlotUids[
          state.TimetableListState.CurrentSubIndex
        ]
      )
      .map((slot) => ({
        ...slot,

        /**
         * This means how many slots is the same kind with this slot.
         * For example FM2-T1 is the same kind as FM2-T2
         * but not the same as FM2-P1 or FM1-T1.
         *
         * This property is needed for sorting.
         * This sort is important in optimizing the reduction in the later iteration.
         * We want to reduce as much timetables as possible during the initial iteration.
         */
        sameKindLength: allSlots.filter((otherSlot) =>
          sameKind(otherSlot, slot)
        ).length,
      }))
      .sort((a, b) => b.sameKindLength - a.sameKindLength);

    const filtrateTimetables = (() => {
      let result: {
        timetableIndex: number;
        timetableSubIndex: number;
        slotUids: number[];
      }[] = [];

      const filtrateTimetables = state.TimetableListState.FiltrateTimetables;
      for (let index = 0; index < filtrateTimetables.length; index++) {
        const timetable = filtrateTimetables[index];
        for (
          let subIndex = 0;
          subIndex < timetable.ListOfSlotUids.length;
          subIndex++
        ) {
          result.push({
            slotUids: timetable.ListOfSlotUids[subIndex],
            timetableIndex: index,
            timetableSubIndex: subIndex,
          });
        }
      }
      return result;
    })();
    const slots = currentTimetableSlots.reduce(
      ({ filtrateTimetables, resultSlots }, slot) => {
        const { result, remainingTimetables } = findAlternativeSlot({
          targetSlot: slot,
          currentTimetableSlots,
          slotStore,
          filtrateTimetables,
        });

        // Uncomment the following line to see the timetable length reduction over each iteration.
        // This is related to the `sameKindLength` above.
        // console.log({
        //     filtrateTimetablesLength: filtrateTimetables.length,
        //     possibleTimetablesLength: result.alternativeTimetables.length
        // })
        return {
          filtrateTimetables: remainingTimetables,
          resultSlots: concat(resultSlots, [result]),
        };
      },
      { filtrateTimetables, resultSlots: [] } as {
        filtrateTimetables: typeof filtrateTimetables;
        resultSlots: ResultSlot[];
      }
    ).resultSlots;

    const resultSlots = slots.map(({ slot, alternativeTimetables }) => {
      return {
        ...slot,
        AlternativeSlots: alternativeTimetables
          .map(({ alternativeSlots, timetableIndex, timetableSubIndex }) =>
            alternativeSlots.map((destinationSlot) => ({
              slot: { ...destinationSlot, SourceSlotUid: slot.Uid },
              destinationTimetableIndex: timetableIndex,
              destinationTimetableSubIndex: timetableSubIndex,
            }))
          )
          .reduce((a, b) => concat(a, b), []),
      };
    });

    const chosenSubjectSlots =
      state.TimetableListState.SlotViewModelStore.GetAll();
    return {
      ...state,
      TimetableListState: {
        ...state.TimetableListState,
        SlotViewModelStore: new ObjectStore(
          chosenSubjectSlots.map((slot) => {
            const matchingResultSlot = resultSlots.find(
              ({ Uid }) => Uid === slot.Uid
            );
            return matchingResultSlot ? matchingResultSlot : slot;
          })
        ),
      },
    };
  }
}

const sameKind = (a: ISlotViewModel, b: ISlotViewModel): boolean => {
  return a.Type === b.Type && a.SubjectCode === b.SubjectCode;
};

type ResultSlot = {
  slot: ISlotViewModel;
  alternativeTimetables: {
    timetableIndex: number;
    timetableSubIndex: number;
    alternativeSlots: ISlotViewModel[];
  }[];
};
type Timetable = {
  timetableIndex: number;
  timetableSubIndex: number;
  slotUids: number[];
};
export const findAlternativeSlot = ({
  targetSlot,
  currentTimetableSlots,
  slotStore,
  filtrateTimetables,
}: {
  /**
   * The slot where we want to find the alternative slots of
   */
  targetSlot: ISlotViewModel;
  currentTimetableSlots: ISlotViewModel[];
  slotStore: ObjectStore<ISlotViewModel>;
  filtrateTimetables: {
    timetableIndex: number;
    timetableSubIndex: number;
    slotUids: number[];
  }[];
}): {
  result: ResultSlot;
  remainingTimetables: Timetable[];
} => {
  const slotsExceptCurrentSlotKind = currentTimetableSlots.filter(
    (slot) => !sameKind(slot, targetSlot)
  );
  const { possibleDestinationTimetables, remainingTimetables } =
    slotsExceptCurrentSlotKind.reduce(
      (result, slot) => {
        let possibleDestinationTimetables: Timetable[] = [];
        let remainingTimetables: Timetable[] = [];

        for (let i = 0; i < result.possibleDestinationTimetables.length; i++) {
          const timetable = result.possibleDestinationTimetables[i];
          if (timetable.slotUids.some((Uid) => Uid === targetSlot.Uid)) {
            remainingTimetables.push(timetable);
          } else if (timetable.slotUids.some((Uid) => Uid === slot.Uid)) {
            possibleDestinationTimetables.push(timetable);
          } else {
            // ditch this timetable
          }
        }

        return {
          possibleDestinationTimetables,
          remainingTimetables: concat(
            result.remainingTimetables,
            remainingTimetables
          ),
        };
      },
      {
        possibleDestinationTimetables: filtrateTimetables,
        remainingTimetables: [],
      } as {
        possibleDestinationTimetables: Timetable[];
        remainingTimetables: Timetable[];
      }
    );

  return {
    remainingTimetables,
    result: {
      slot: targetSlot,
      alternativeTimetables: possibleDestinationTimetables.map((timetable) => {
        return {
          timetableIndex: timetable.timetableIndex,
          timetableSubIndex: timetable.timetableSubIndex,
          alternativeSlots: slotStore.GetBunch(
            timetable.slotUids.filter(
              (uid) =>
                !slotsExceptCurrentSlotKind.some((slot) => slot.Uid === uid)
            )
          ),
        };
      }),
    },
  };
};

/**
 * Why use this instead of `Array.prototype.concat`?
 * Because `push` is much faster.
 * Refer https://dev.to/uilicious/javascript-array-push-is-945x-faster-than-array-concat-1oki
 */
function concat<T>(xs: T[], ys: T[]): T[] {
  let result = [...xs];
  for (let index = 0; index < ys.length; index++) {
    result.push(ys[index]);
  }
  return result;
}
