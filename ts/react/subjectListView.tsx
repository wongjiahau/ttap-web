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

export interface ISubjectListViewStateProps {
    subjects : Subject[];
    isShowingSelectedSubjectOnly : boolean;
}

export interface ISubjectListViewDispatchProps {
    handleSearch : (searchedText : string) => void;
    handleSelection : (subjectCode : string) => void;
    handleToggleView : () => void;
}

export interface ISubjectListViewProps extends ISubjectListViewStateProps,
ISubjectListViewDispatchProps {}

export class SubjectListView extends React.Component < ISubjectListViewProps, {} > {
    constructor(props : ISubjectListViewProps) {
        super(props);
        $(window).on("resize", this.handleWindowResizing);
    }

    public handleWindowResizing = () => {
        this.setState({
            sectionStyle: this.getSectionStyle()
        });
    }

    public handleSearchBoxOnChange = (event : object, newValue : string) => {
        this
            .props
            .handleSearch(newValue);
    }

    public render() {
        const subjectViews = this
            .props
            .subjects
            .map((s) => {
                if (s.IsVisible) {
                    return (
                        <div>
                            <Divider/>
                            <SubjectView
                                key={s.Code}
                                subjectName={Beautify(s.Name)}
                                subjectCode={s.Code + " [" + GetInitial(s.Name) + "]"}
                                handleSelection={() => this.props.handleSelection(s.Code)}
                                isSelected={s.IsSelected}/>
                            <Divider/>
                        </div>
                    );
                }
            });

        return (
            <section>
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
                        .props
                        .subjects
                        .filter((s) => s.IsSelected)
                        .length === 0}
                        key="toggle-view-button"
                        label={this.props.isShowingSelectedSubjectOnly
                        ? "Show all subjects"
                        : "Show selected subjects"}
                        secondary={true}
                        keyboardFocused={true}
                        onClick={this.props.handleToggleView}/>
                    <RaisedButton
                        icon={< IconTick />}
                        style={buttonStyle}
                        key="done-button"
                        label="Done"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.handleDone}/>
                </footer>
            </section>
        );
    }

    public handleDone = () => {
        alert("Not implemented yet");
    }

    private getSectionStyle(): React.CSSProperties {
        return {
            display: "flex",
            flexFlow: "column",
            height: $(window).height()
        };
    }
}
