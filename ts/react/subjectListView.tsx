import * as $ from "jquery";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import * as React from "react";
import * as S from "string";
import {Beautify, GetInitial} from "../helper";
import {Subject} from "../model/subject";
import {SubjectView} from "./subjectView";

const headerStyle : React.CSSProperties = {};

const divStyle : React.CSSProperties = {
    flex: "2",
    overflow: "auto"
};

const footerStyle : React.CSSProperties = {
    minHeight: "50px"
};

const fieldStyle : React.CSSProperties = {
    fontSize: "32",
    fontWeight: "bold"
};

export interface ISubjectListViewProps {
    subjects : Subject[];
    handleDone : () => void;
}

export interface ISubjectListViewState {
    searchedText
        ?
        : string;
    subjects : Subject[];
    showingSelectSubjectOnly : boolean;
    sectionStyle : React.CSSProperties;
}

export class SubjectListView extends React.Component < ISubjectListViewProps,
ISubjectListViewState > {
    private readonly allSubject : Subject[];
    constructor(props : ISubjectListViewProps) {
        super(props);
        this.state = {
            sectionStyle: this.getSectionStyle(),
            showingSelectSubjectOnly: false,
            subjects: props.subjects,
        };
        this.allSubject = props.subjects;
        $(window).on("resize", this.handleWindowResizing);
    }

    public handleWindowResizing = () => {
        this.setState({sectionStyle: this.getSectionStyle()});
    }

    public handleToggleView = () => {
        if (!this.state.showingSelectSubjectOnly) {
            this.setState({
                showingSelectSubjectOnly: true,
                subjects: this
                    .allSubject
                    .filter((s) => s.IsSelected),
            });
        } else {
            this.setState({subjects: this.allSubject, showingSelectSubjectOnly: false});
        }
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

    public handleSelection(subjectCode : string) {
        const allSubject = this
            .allSubject
            .slice();
        const matchedSubject = allSubject.filter((s) => s.Code === subjectCode)[0];
        matchedSubject.IsSelected = !matchedSubject.IsSelected;
        this.setState({subjects: allSubject});
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
                        subjectCode={s.Code + " [" + GetInitial(s.Name) + "]"}
                        handleSelection={() => this.handleSelection(s.Code)}
                        isSelected={s.IsSelected}/>
                </div>
            ));

        return (
            <section style={this.state.sectionStyle}>
                <header style={headerStyle}>
                    <h1>Select your subjects.</h1>
                    <TextField
                        style={fieldStyle}
                        onChange={this.handleSearchBoxOnChange}
                        hintText="e.g. he/hubungan etnik/mpu3113"
                        floatingLabelText="Search subjects"/>
                </header>
                <div style={divStyle}>
                    <Paper>
                        <br/> {subjects}
                    </Paper>
                </div>
                <footer style={footerStyle}>
                    <FlatButton
                        key="cancel-button"
                        label="Cancel"
                        primary={true}
                        onClick={this.props.handleDone}/>
                    <FlatButton
                        key="done-button"
                        label="Done"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.props.handleDone}/>
                    <FlatButton
                        key="toggle-view-button"
                        label={this.state.showingSelectSubjectOnly
                        ? "Show all subjects"
                        : "Show selected subjects"}
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.handleToggleView}/>
                </footer>
            </section>
        );
    }

    private getSectionStyle() : React.CSSProperties {
        return {
            display: "flex",
            flexFlow: "column",
            height: $(window).height()
        };
    }
}
