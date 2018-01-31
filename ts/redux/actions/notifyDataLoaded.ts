import { DataRouter } from "./../../dataStructure/dataRouter";
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
        const route = state.SettingsState.SearchByConsideringWeekNumber
            ? "ungeneralized"
            : "generalized";
        const router = new DataRouter<ObjectStore<RawSlot>>();
        router.AddData("generalized", new ObjectStore(GeneralizeSlot(this.rawSlots)));
        router.AddData("ungeneralized", new ObjectStore(this.rawSlots));
        router.SetRouteTo(route);
        const subjects = ParseSlotToSubject(this.rawSlots);
        FindClashes(subjects, router.GetCurrentData());
        return {
            ...state,
            DataState: {
                RawSlotDataRouter: router
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
