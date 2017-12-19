import IconInfo from "material-ui-icons/Info";
import Button from "material-ui/Button";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import * as React from "react";
import * as S from "string";
import {Key} from "../enums/keyCodeEnum";
import {Beautify, GetInitial} from "../helper";
import {Subject} from "../model/subject";
import {StackPanel} from "./panels/stackPanel";
import {iconStyle} from "./styles";
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
    clashingSubjectPairs : Array < [Subject, Subject] >;
    isOpen : boolean;
    isShowingLoadingBar : boolean;
    isShowingSelectedSubjectOnly : boolean;
    searchWord : string;
    subjects : Subject[];
}

export interface ISubjectListViewDispatchProps {
    handleClose : () => void;
    handleSearch : (searchedText : string) => void;
    handleSelection : (subjectIndex : number) => void;
    handleToggleView : () => void;
}

export interface ISubjectListViewProps extends ISubjectListViewStateProps,
ISubjectListViewDispatchProps {}

export class SubjectListView extends React.Component < ISubjectListViewProps, {
    sectionStyle : React.CSSProperties
} > {
    constructor(props : ISubjectListViewProps) {
        super(props);
        this.state = {
            sectionStyle: this.getSectionStyle()
        };
    }

    public getSectionStyle(): React.CSSProperties {
        return {
            display: "flex",
            flexFlow: "column",
            height: window.innerHeight
        };
    }

    public handleSearchBoxOnChange = (event : object) => {
        const searchedText = (document.getElementById("searchbar") as HTMLInputElement).value;
        this.props.handleSearch(searchedText);
    }

    public render() {
        const subjectViews = this
            .props
            .subjects
            .map((s, index) => {
                if (s.IsVisible) {
                    return (
                        <div key={s.Code}>
                            <SubjectView
                                id={"sv" + index}
                                isLoading={this.props.isShowingLoadingBar}
                                clashReport={s.ClashReport}
                                searchWord={this.props.searchWord}
                                subjectName={Beautify(s.Name)}
                                subjectCode={s.Code + " [" + GetInitial(s.Name) + "]"}
                                handleSelection={() => this.props.handleSelection(index)}
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
            <Drawer open={this.props.isOpen}>
                <section onKeyUp={this.checkKeys} style={this.state.sectionStyle}>
                    <header style={headerStyle}>
                        <Typography gutterBottom={true} type="display1" color="primary">
                            Select your desired subjects.
                        </Typography>
                        <TextField
                            id="searchbar"
                            style={searchBoxStyle}
                            onChange={this.handleSearchBoxOnChange}
                            placeholder="example: he/hubungan etnik/mpu3113"
                            label=" Search . . ."/>
                    </header>
                    <Paper style={divStyle}>
                        <div id="subject-list-container">
                            {!showErrorMessage
                                ? subjectViews
                                : errorMessage}
                        </div>
                    </Paper>
                    <footer style={footerStyle}>
                        {this.props.isShowingLoadingBar
                            ? (
                                <Typography align="center" type="subheading">Finding possible timetables . . .</Typography>
                            )
                            : (
                                <StackPanel orientation="horizontal" horizontalAlignment="right">
                                    <Tooltip title={subjectListTipsContent()} placement="top">
                                        <IconInfo/>
                                    </Tooltip>
                                    <Button
                                        color="accent"
                                        style={buttonStyle}
                                        disabled={noSubjectIsSelected}
                                        key="toggle-view-button"
                                        onClick={this.props.handleToggleView}>
                                        {this.props.isShowingSelectedSubjectOnly
                                            ? "Show all subjects"
                                            : (noSubjectIsSelected
                                                ? "Show selected subjects"
                                                : `Show selected subjects (${numberOfSelectedSubjects})`)}
                                    </Button>
                                    <Button
                                        raised={true}
                                        color="primary"
                                        style={buttonStyle}
                                        disabled={noSubjectIsSelected || this.props.isShowingLoadingBar}
                                        key="done-button"
                                        onClick={this.props.handleClose}>
                                        {this.props.isShowingLoadingBar
                                            ? "Loading . . ."
                                            : "Done"}
                                    </Button>
                                </StackPanel>
                            )}
                    </footer>
                </section>
            </Drawer>
        );
    }

    public componentDidMount() {
        (document.getElementById("searchbar")as HTMLInputElement).focus();
    }

    private checkKeys = (e) => {
        // refer
        // https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-ja
        // v ascript
        e = e || window.event;
        switch (e.keyCode) {
            case Key.DownArrow:
                this.Focus("next");
                break;
            case Key.UpArrow:
                this.Focus("previous");
                break;
            case Key.Tab:
            case Key.Backspace:
                if (document.activeElement.id === "searchbar") {
                    break;
                }
                const searchbar = document.getElementById("searchbar")as HTMLInputElement;
                searchbar.value = "";
                this.props.handleSearch("");
                searchbar.focus();
                break;
        }
    }

    private Focus = (where : "previous" | "next"): void => {
        const idOfFocusedSubjectView = document.activeElement.id;
        const subjectViews = document.getElementsByClassName("subjectview")as HTMLCollectionOf < HTMLDivElement >;
        const length = subjectViews.length;
        let next = null;
        for (let i = 0; i < length; i++) {
            if (subjectViews[i].id === idOfFocusedSubjectView) {
                if (where === "previous") {
                    next = i - 1;
                    if (next < 0) {
                        next = length - 1;
                    }
                } else {
                    next = i + 1;
                    if (next > length - 1) {
                        next = 0;
                    }
                }
                subjectViews[next].focus();
                return;
            }
        }
        subjectViews[0].focus();
    }
}

const subjectListTipsContent = () => {
    const style : React.CSSProperties = {
        fontSize:      "15px",
        paddingBottom: "5px",
        paddingTop:    "5px",
        textAlign:     "left",
    };
    return (
        <table style={style}>
            <tbody>
                <tr>
                    <td>
                        <code>↓ ↑</code>
                    </td>
                    <td>
                        &emsp;Navigate through subjects
                    </td>
                </tr>
                <tr>
                    <td>
                        <code>Enter</code>
                    </td>
                    <td>
                        &emsp;Toggle selection on focused subject
                    </td>
                </tr>
                <tr>
                    <td>
                        <code>Backspace</code>
                    </td>
                    <td>
                        &emsp;Clear and focus the search bar
                    </td>
                </tr>
            </tbody>
        </table>
    );
};
