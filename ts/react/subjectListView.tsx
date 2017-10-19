import * as React from "react";
import {Beautify} from "../helper";
import Subject from "../model/subject";
import {SubjectView} from "./subjectView";

export interface ISubjectListViewProps {
    subjects: Subject[];
}

export const SubjectListView = (props: ISubjectListViewProps) => {
    const subjects = props
        .subjects
        .map((s) => (<SubjectView subjectName={Beautify(s.Name)} subjectCode={s.Code}/>));

    return (
        <div>{subjects}
        </div>
    );
};
