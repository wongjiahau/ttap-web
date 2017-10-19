import Paper from "material-ui/Paper";
import * as React from "react";
import {Beautify, GetInitial} from "../helper";
import Subject from "../model/subject";
import {SubjectView} from "./subjectView";

const style = {
    paper: {
        margin: "auto",
        width: "50%",
    },
};

export interface ISubjectListViewProps {
    subjects: Subject[];
}

export const SubjectListView = (props: ISubjectListViewProps) => {
    const subjects = props
        .subjects
        .map((s) => (
                <SubjectView
                    subjectName={Beautify(s.Name)}
                    subjectCode={s.Code + " [" + GetInitial(s.Name) + "]"} />
        ));

    return (
        <Paper style={style.paper}>{subjects}
        </Paper>
    );
};
