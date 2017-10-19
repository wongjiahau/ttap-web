import * as React from "react";
import Subject from "../model/subject";
import {SubjectView} from "./subjectView";

export interface ISubjectListViewProps {
    subjects: Subject[];
}

export const SubjectListView = (props: ISubjectListViewProps) => {
    const subjects = props
        .subjects
        .map((s) => (<SubjectView subjectName={s.Name} subjectCode={s.Code}/>));

    return (
        <div>{subjects}
        </div>
    );
};
