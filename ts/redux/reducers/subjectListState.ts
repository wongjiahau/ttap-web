import {
    Subject
} from "../../model/subject";
import {
    GetTestSubjects1
} from "./../../tests/testDataGenerator";
import {
    SearchSubjectList
} from "./../actions/searchSubjectList";
import { SelectSubject } from "./../actions/selectSubject";
import {
    ToggleSubjectListViewingOptions
} from "./../actions/toggleSubjectListViewingOption";
import {
    GenereteReducer
} from "./GenerateReducer";

export interface ISubjectListState {
    SearchedText: string;
    Subjects: Subject[];
    IsShowingSelectedSubjectOnly: boolean;
}

export class SubjectListState implements ISubjectListState {
    public SearchedText: string;
    public Subjects: Subject[];
    public IsShowingSelectedSubjectOnly: boolean;
    public constructor(subject = GetTestSubjects1()) {
        this.SearchedText = "";
        this.Subjects = subject;
        this.IsShowingSelectedSubjectOnly = false;
    }
}

const typesOfAcceptedActions = [
    new SearchSubjectList(null).TypeName(),
    new ToggleSubjectListViewingOptions().TypeName(),
    new SelectSubject(null).TypeName()
];
export const SubjectListReducer = GenereteReducer(new SubjectListState(), typesOfAcceptedActions);
