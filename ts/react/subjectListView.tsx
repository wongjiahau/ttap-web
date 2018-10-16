import IconInfo from "material-ui-icons/Info";
import IconSlideShow from "material-ui-icons/Slideshow";
import Button from "material-ui/Button";
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from "material-ui/Dialog";
import Divider from "material-ui/Divider";
import Drawer from "material-ui/Drawer";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Tooltip from "material-ui/Tooltip";
import Typography from "material-ui/Typography";
import * as React from "react";

import { IconButton } from "material-ui";
import {Key} from "../enums/keyCodeEnum";
import {Subject} from "../model/subject";
import { ISubjectListState } from "../redux/reducers/subjectListState";
import { BeautifySubjectName } from "../util/beautifySubjectName";
import { GetInitial } from "../util/getInitial";
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

export interface ISubjectListViewDispatchProps {
    handleClose : () => void;
    handleSearch : (searchedText : string) => void;
    handleSelection : (subjectIndex : number) => void;
    handleToggleView : () => void;
    handleToggleShowFindTimetableAnimation: () => void;
    handleHideFindTimetableAnimation: () => void;
}

export interface ISubjectListViewProps extends ISubjectListState,
ISubjectListViewDispatchProps {}

export class SubjectListView extends React.Component < ISubjectListViewProps, {
    sectionStyle : React.CSSProperties,
} > {
    constructor(props : ISubjectListViewProps) {
        super(props);
        this.state = {
            sectionStyle: this.getSectionStyle(),
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
            .Subjects
            .map((s, index) => {
                if (s.IsVisible) {
                    return (
                        <div key={s.Code}>
                            <SubjectView
                                id={"sv" + index}
                                isLoading={this.props.IsShowingLoadingBar}
                                clashReport={s.ClashReport}
                                searchWord={this.props.SearchedText}
                                subjectName={BeautifySubjectName(s.Name)}
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
            .Subjects
            .filter((x) => x.IsVisible)
            .length === 0;

        const numberOfSelectedSubjects = this
            .props
            .Subjects
            .filter((s) => s.IsSelected)
            .length;

        const noSubjectIsSelected = numberOfSelectedSubjects === 0;

        return (
            <div>
                <div id="for-algo-visualization" style={{display: this.props.ShowAnimation ? "block" : "none"}}/>
                <Drawer elevation={16} open={this.props.IsOpen} onClose={this.handleClose}>
                    {/*  Semantic UI Sidebar  */} <link rel="stylesheet" href="https://cdn.rawgit.com/Semantic-Org/Semantic-UI-CSS/4b65000a/components/sidebar.min.css"/>
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
                            <StackPanel orientation="horizontal" horizontalAlignment="right">
                                <Tooltip title="Toggle animation" placement="top">
                                    <Button 
                                        color="primary"
                                        onClick={this.props.handleToggleShowFindTimetableAnimation}
                                        style={{marginRight: 25}}>
                                        <IconSlideShow style= {{marginRight: 5}}/>Animation
                                    </Button>
                                </Tooltip>
                                <Tooltip title={subjectListTipsContent()} placement="top">
                                    <IconInfo/>
                                </Tooltip>
                                <Button
                                    color="secondary"
                                    style={buttonStyle}
                                    disabled={noSubjectIsSelected}
                                    id="toggle-view-button"
                                    onClick={this.props.handleToggleView}>
                                    {this.props.IsShowingSelectedSubjectOnly
                                        ? "Show all subjects"
                                        : (noSubjectIsSelected
                                            ? "Show selected subjects"
                                            : `Show selected subjects (${numberOfSelectedSubjects})`)}
                                </Button>
                                <Button
                                    raised={true}
                                    color="primary"
                                    style={buttonStyle}
                                    disabled={noSubjectIsSelected || this.props.IsShowingLoadingBar}
                                    id="done-button"
                                    onClick={() => {
                                        this.props.handleClose();
                                        this.props.handleHideFindTimetableAnimation();
                                    }}>
                                    Done
                                </Button>
                            </StackPanel>
                        </footer>
                    </section>
                </Drawer>
            </div >
        );
    }

    public handleClose = () => {
        if (this.props.Subjects.some((x) => x.IsSelected)) {
            this.props.handleClose();
        }
    }

    public componentDidMount() {
        const searchbar  = (document.getElementById("searchbar")as HTMLInputElement);
        if (searchbar) {
            searchbar.focus();
        }
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
        let next = 0;
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
    const getRow = (key: string, description: string) => {
        return (
            <tr>
                <td><code>{key}</code></td>
                <td>&emsp;{description}</td>
            </tr>
        );
    };
    return (
        <table style={style}>
            <tbody>
                {getRow("↓ ↑", "Navigate through subjects" )}
                {getRow("Enter", "Toggle selection on focused subject" )}
                {getRow("Backspace", "Clear and focus the search bar" )}
            </tbody>
        </table>
    );
};
