import * as typeName from "type-name";
import {Subject} from "../../model/subject";
import {ActionGenerator} from "../actions/actionGenerator";
import {GetTestSubjects1} from "./../../tests/testDataGenerator";
import {SearchSubjectList} from "./../actions/searchSubjectList";
import {SelectSubject} from "./../actions/selectSubject";
import {ToggleSubjectListViewingOptions} from "./../actions/toggleSubjectListViewingOption";
import {GenereteReducer} from "./generateReducer";

export interface ISubjectListState {
    SearchedText : string;
    Subjects : Subject[];
    IsShowingSelectedSubjectOnly : boolean;
}

export class SubjectListState implements ISubjectListState {
    public SearchedText : string;
    public Subjects : Subject[];
    public IsShowingSelectedSubjectOnly : boolean;
    public constructor(subject = GetTestSubjects1()) {
        this.SearchedText = "";
        this.Subjects = subject;
        this.IsShowingSelectedSubjectOnly = false;
    }
}

export abstract class SubjectListStateActionGenerator extends ActionGenerator < ISubjectListState > {
    public StateName() {
        return typeName(new SubjectListState());
    }
}

export const SubjectListReducer = GenereteReducer(new SubjectListState());
