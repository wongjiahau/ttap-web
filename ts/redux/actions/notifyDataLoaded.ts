const isEqual = require("lodash.isequal");
import {FindClashes} from "../../clashFinder/findClashes";
import {ObjectStore} from "../../dataStructure/objectStore";
import {RawSlot} from "../../model/rawSlot";
import {ParseSlotToSubject} from "../../parser/parseSlotToSubject";
import {GeneralizeSlot} from "../../permutator/generalizeSlot";
import {IMasterState, MasterStateAction} from "../reducers/masterState";
import {NewSubjectListState} from "../reducers/subjectListState";

export class NotifyDataLoaded extends MasterStateAction {
    public constructor(private rawSlots : RawSlot[]) {
        super();
    }
    public TypeName() : string {return "notify data loaded"; }
    protected GenerateNewState(state : IMasterState) : IMasterState {
        const ungeneralizedRawSlotStore = new ObjectStore(this.rawSlots);
        const generalizedRawSlotStore = new ObjectStore(GeneralizeSlot(this.rawSlots));
        const currentRawSlotStore = state.SettingsState.SearchByConsideringWeekNumber
            ? ungeneralizedRawSlotStore
            : generalizedRawSlotStore;
        const subjects = ParseSlotToSubject(this.rawSlots);
        FindClashes(subjects);
        return {
            ...state,
            DataState: {
                UngeneralizedRawSlotStore: ungeneralizedRawSlotStore,
                GeneralizedRawSlotStore: generalizedRawSlotStore,
                CurrentRawSlotStore: currentRawSlotStore
            },
            TimetableCreatorState: {
                ...state.TimetableCreatorState,
                IsSlotLoaded: true
            },
            SubjectListState: {
                ...NewSubjectListState(subjects),
                IsOpen: true
            }
        };
    }
}
