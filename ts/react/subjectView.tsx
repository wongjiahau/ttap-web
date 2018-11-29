import { ListItem, ListItemText } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import * as React from "react";
import Highlighter = require("react-highlight-words");
import {ClashReport} from "../model/subject";
import {Colors} from "./colors/colors";

const clashReportStyle : React.CSSProperties = {
    background: Colors.DarkRed,
    color: Colors.White,
    fontSize: "14px",
    overflowY: "hidden",
    padding: "10px",
    width: "200px"
};

export interface ISubjectViewProps {
    id:              string;
    clashReport:     ClashReport | null;
    isLoading:       boolean;
    isSelected:      boolean;
    searchWord:      string;
    subjectCode:     string;
    subjectName:     string;
    handleSelection: () => void;
}

export class SubjectView extends React.Component < ISubjectViewProps, {} > {
    constructor(props : ISubjectViewProps) {
        super(props);
    }

    public render() {
        const divStyle : React.CSSProperties = {
            background: this.props.isSelected
                ? Colors.Azure
                : Colors.White
        };
        const primary = (<Highlighter
            searchWords={[this.props.searchWord]}
            textToHighlight={this.props.subjectName}/>);

        const secondary = (<Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={[this.props.searchWord]}
            textToHighlight={this.props.subjectCode}/>);

        const gotClashReport = this.props.clashReport !== null;
        const listItemStyle = {cursor: this.props.isLoading ?  "wait" : "default"};
        return (
            <div className="ui pushable" style={{overflowY: "hidden"}}>
                <div style={clashReportStyle}
                    className={"ui " + (gotClashReport ? "visible" : "") + " right overlay sidebar"}>
                    {getClashReport(this.props.clashReport)}
                </div>
                <div
                    className={(gotClashReport
                    ? "dimmed"
                    : "") + " pusher"}>
                    <div style={divStyle}>
                        <ListItem
                            id={this.props.id}
                            className="subjectview"
                            style={listItemStyle}
                            button={true}
                            divider={true}
                            onClick={this.props.handleSelection}
                            >
                            <Checkbox checked={this.props.isSelected} tabIndex={-1} disableRipple={true}/>
                            <ListItemText primary={primary} secondary={secondary}/>
                        </ListItem>
                    </div>
                </div>
            </div>
        );
    }
}

const getClashReport = (x : ClashReport | null) => {
    if (x) {
        if (x.Type === "single") {
            return (
                <div>Cannot select this subject as it clashes with : <br/>
                    <b>{x.TargetName}</b>
                </div>
            );

        } else if (x.Type === "group") {
            return (
                <div>Cannot select this subject as it clashes with the subject(s) you selected previously.</div>
            );
        }
    } else {
        return "";
    }
};
export default SubjectView;
