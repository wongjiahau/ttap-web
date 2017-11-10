import * as $ from "jquery";
import {LinearProgress} from "material-ui-next";
import Typography from "material-ui-next/Typography";
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

// region styles
const errorMessageStyle : React.CSSProperties = {
    marginTop: "10px",
    marginLeft: "10px"
};

const headerStyle : React.CSSProperties = {
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

// endregion
export interface ISubjectListViewStateProps {
    searchWord : string;
    subjects : Subject[];
    isShowingSelectedSubjectOnly : boolean;
    isShowingLoadingBar : boolean;
}

export interface ISubjectListViewDispatchProps {
    handleClose : () => void;
    handleSearch : (searchedText : string) => void;
    handleSelection : (subjectCode : string) => void;
    handleToggleView : () => void;
}

export interface ISubjectListViewProps extends ISubjectListViewStateProps,
ISubjectListViewDispatchProps {}

export class SubjectListView extends React.Component < ISubjectListViewProps, {
    sectionStyle : React.CSSProperties
} > {
    constructor(props : ISubjectListViewProps) {
        super(props);
        $(window).on("resize", this.handleWindowResizing);
        this.state = {
            sectionStyle: this.getSectionStyle()
        };
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
                        <div key={s.Code}>
                            <SubjectView
                                searchWord={this.props.searchWord}
                                subjectName={Beautify(s.Name)}
                                subjectCode={s.Code + " [" + GetInitial(s.Name) + "]"}
                                handleSelection={() => this.props.handleSelection(s.Code)}
                                isSelected={s.IsSelected}/>
                        </div>
                    );
                }
            });

        const errorMessage = (
            <Typography style={errorMessageStyle} type="subheading" gutterBottom={true}>
                No result is found . . .
            </Typography>
        );

        const showErrorMessage = this
            .props
            .subjects
            .filter((x) => x.IsVisible)
            .length === 0;

        const numberOfSelectedSubjects = this
            .props
            .subjects
            .filter((s) => s.IsSelected)
            .length;

        const noSubjectIsSelected = numberOfSelectedSubjects === 0;

        return (
            <section style={this.state.sectionStyle}>
                <header style={headerStyle}>
                    <Typography type="display2" color="primary">
                        Select your desired subjects.
                    </Typography>
                    <TextField
                        style={searchBoxStyle}
                        onChange={this.handleSearchBoxOnChange}
                        hintText="example: he/hubungan etnik/mpu3113"
                        floatingLabelText=" Search . . ."/>
                </header>
                <Paper style={divStyle}>
                    <div id="subject-list-container">
                        {!showErrorMessage
                            ? subjectViews
                            : errorMessage}
                    </div>
                </Paper>
                {this.props.isShowingLoadingBar
                    ? <LinearProgress/>
                    : ""
}
                <footer style={footerStyle}>
                    <FlatButton
                        icon={< IconEye />}
                        style={buttonStyle}
                        disabled={noSubjectIsSelected}
                        key="toggle-view-button"
                        label={this.props.isShowingSelectedSubjectOnly
                        ? "Show all subjects"
                        : (noSubjectIsSelected
                            ? "Show selected subjects"
                            : `Show selected subjects (${numberOfSelectedSubjects})`)}
                        secondary={true}
                        keyboardFocused={true}
                        onClick={this.props.handleToggleView}/>
                    <RaisedButton
                        icon={< IconTick />}
                        style={buttonStyle}
                        disabled={noSubjectIsSelected || this.props.isShowingLoadingBar}
                        key="done-button"
                        label={this.props.isShowingLoadingBar
                        ? "Loading . . ."
                        : "Done"}
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.props.handleClose}/>
                </footer>
            </section>
        );
    }

    private getSectionStyle(): React.CSSProperties {
        return {
            display: "flex",
            flexFlow: "column",
            height: $(window).height()
        };
    }
}
