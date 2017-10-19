import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import * as React from "react";
import * as S from "string";
import {Beautify, GetInitial} from "../helper";
import Subject from "../model/subject";
import {SubjectView} from "./subjectView";

const style = {
    paper: {
        margin: "auto",
        width: "50%"
    }
};

export interface ISubjectListViewProps {
    subjects : Subject[];
}

export interface ISubjectListViewState {
    searchedText
        ?
        : string;
    subjects : Subject[];
}

export class SubjectListView extends React.Component < ISubjectListViewProps,
ISubjectListViewState > {
    private readonly allSubject : Subject[];
    constructor(props : ISubjectListViewProps) {
        super(props);
        this.state = {
            subjects: props.subjects
        };
        this.allSubject = props.subjects;
    }
    public handleSearchBoxOnChange = (event : object, newValue : string) => {
        this.setState({
            subjects: this.getMatchingSubjects(newValue)
        });
    }

    public getMatchingSubjects = (searchedText : string) => {
        return this
            .allSubject
            .filter((subject) => S(GetSubjectBody(subject)).contains(searchedText.toLowerCase()));

        function GetSubjectBody(subject : Subject) : string {
            return subject
                .Name
                .toLowerCase() + subject
                .Code
                .toLowerCase() + GetInitial(subject.Name).toLowerCase();
        }
    }

    public render() {
        const subjects = this
            .state
            .subjects
            .map((s) => (<SubjectView
                subjectName={Beautify(s.Name)}
                subjectCode={s.Code + " [" + GetInitial(s.Name) + "]"}/>));

        return (
            <Paper style={style.paper}>
                <TextField
                    onChange={this.handleSearchBoxOnChange}
                    hintText="e.g. he/hubungan etnik/mpu3113"
                    floatingLabelText="Search subjects"/>
                <br/> {subjects}
            </Paper>
        );
    }
}
