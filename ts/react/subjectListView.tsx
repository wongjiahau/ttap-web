import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import * as React from "react";
import * as S from "string";
import {Beautify, GetInitial} from "../helper";
import {Subject} from "../model/subject";
import {SubjectView} from "./subjectView";

const divStyle : React.CSSProperties = {
    margin: "auto"
};

const paperStyle : React.CSSProperties = {
    height: "500px",
    overflow: "scroll"
};

const fieldStyle : React.CSSProperties = {
    fontSize: "32",
    fontWeight: "bold"
};

export interface ISubjectListViewProps {
    subjects : Subject[];
    style : React.CSSProperties;
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
            .map((s) => (
                <div>
                    <Divider/>
                    <SubjectView
                        subjectName={Beautify(s.Name)}
                        subjectCode={s.Code + " [" + GetInitial(s.Name) + "]"}/>
                </div>
            ));

        return (
            <div style={this.props.style}>
                <div style={divStyle}>
                    <TextField
                        style={fieldStyle}
                        onChange={this.handleSearchBoxOnChange}
                        hintText="e.g. he/hubungan etnik/mpu3113"
                        floatingLabelText="Search subjects"/>
                    < Paper style={paperStyle}>
                        <br/> {subjects}
                    </Paper>
                </div>
            </div>
        );
    }
}
