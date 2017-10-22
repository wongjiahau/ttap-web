import * as $ from "jquery";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import IconTick from "material-ui/svg-icons/action/done";
import IconEye from "material-ui/svg-icons/image/remove-red-eye";
import TextField from "material-ui/TextField";
import * as React from "react";
import * as S from "string";
import {Beautify, GetInitial} from "../helper";
import {Subject} from "../model/subject";
import {SubjectView} from "./subjectView";

const headerStyle : React.CSSProperties = {
    fontSize: "42px",
    fontWeight: "bold",
    marginBottom: "-5px",
    marginLeft: "15px",
    marginTop: "5px"
};

const divStyle : React.CSSProperties = {
    flex: "2",
    overflow: "auto"
};

const footerStyle : React.CSSProperties = {
    margin: "10px",
    minHeight: "36px",
    textAlign: "right"
};

const searchBoxStyle : React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "normal",
    marginBottom: "10px",
    marginTop: "-10px",
    width: "480px"
};

const buttonStyle : React.CSSProperties = {
    marginLeft: "10px"
};

export interface ISubjectListViewProps {
    subjects : Subject[];
    handleDone : () => void;
}

export interface ISubjectListViewState {
    searchedText : string;
    subjects : Subject[];
    showingSelectSubjectOnly : boolean;
    sectionStyle : React.CSSProperties;
}

export class SubjectListView extends React.Component < ISubjectListViewProps,
ISubjectListViewState > {
    constructor(props : ISubjectListViewProps) {
        super(props);
        this.state = {
            searchedText: "",
            sectionStyle: this.getSectionStyle(),
            showingSelectSubjectOnly: false,
            subjects: props.subjects
        };
        $(window).on("resize", this.handleWindowResizing);
    }

    public handleWindowResizing = () => {
        this.setState({
            sectionStyle: this.getSectionStyle()
        });
    }

    public handleToggleView = () => {
        this.setState({
            showingSelectSubjectOnly: !this.state.showingSelectSubjectOnly
        });
    }

    public handleSearchBoxOnChange = (event : object, newValue : string) => {
        this.setState({searchedText: newValue, showingSelectSubjectOnly: false});
    }

    public getMatchingSubjects = () => {
        const searchedText : string = this.state.searchedText;
        return this
            .state
            .subjects
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
            .state
            .subjects
            .slice();
        const matchedSubject = allSubject.filter((s) => s.Code === subjectCode)[0];
        matchedSubject.IsSelected = !matchedSubject.IsSelected;
        this.setState({subjects: allSubject, showingSelectSubjectOnly: false});
    }

    public render() {
        let subjectsToBeDisplayed : Subject[];
        if (this.state.searchedText.length > 0) {
            subjectsToBeDisplayed = this.getMatchingSubjects();
        } else {
            subjectsToBeDisplayed = this.state.showingSelectSubjectOnly
                ? this
                    .state
                    .subjects
                    .filter((s) => s.IsSelected)
                : this.state.subjects;
        }

        const subjectViews = subjectsToBeDisplayed.map((s) => (
            <div>
                <Divider/>
                <SubjectView
                    key={s.Code}
                    subjectName={Beautify(s.Name)}
                    subjectCode={s.Code + " [" + GetInitial(s.Name) + "]"}
                    handleSelection={() => this.handleSelection(s.Code)}
                    isSelected={s.IsSelected}/>
                <Divider/>
            </div>
        ));

        return (
            <section style={this.state.sectionStyle}>
                <header style={headerStyle}>
                    Select your desired subjects.
                    <TextField
                        style={searchBoxStyle}
                        onChange={this.handleSearchBoxOnChange}
                        hintText="example: he/hubungan etnik/mpu3113"
                        floatingLabelText=" Search . . ."/>
                </header>
                <Paper style={divStyle}>
                    <div id="subject-list-container">
                        {subjectViews}
                    </div>
                </Paper>
                <footer style={footerStyle}>
                    <FlatButton
                        icon={< IconEye />}
                        style={buttonStyle}
                        disabled={this
                        .state
                        .subjects
                        .filter((s) => s.IsSelected)
                        .length === 0}
                        key="toggle-view-button"
                        label={this.state.showingSelectSubjectOnly
                        ? "Show all subjects"
                        : "Show selected subjects"}
                        secondary={true}
                        keyboardFocused={true}
                        onClick={this.handleToggleView}/>
                    <RaisedButton
                        icon={< IconTick />}
                        style={buttonStyle}
                        key="done-button"
                        label="Done"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.props.handleDone}/>
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
