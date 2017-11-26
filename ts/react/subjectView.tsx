import Checkbox from "material-ui-next/Checkbox";
import List, {ListItem, ListItemSecondaryAction, ListItemText} from "material-ui-next/List";
import * as React from "react";
import Highlighter = require("react-highlight-words");
import {ClashReport} from "../model/subject";
import {Colors} from "./colors/colors";

const clashReportStyle : React.CSSProperties = {
    background: Colors.DarkRed,
    color: Colors.White,
    font: "Roboto",
    fontSize: "14px",
    overflowY: "hidden",
    padding: "8px",
    width: "200px"
};

export interface ISubjectViewProps {
    clashReport : ClashReport;
    searchWord : string;
    subjectName : string;
    subjectCode : string;
    isSelected : boolean;
    handleSelection : () => void;
}

const whenSelectedStyle : React.CSSProperties = {};
const whenDeselectedStyle : React.CSSProperties = {};

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
                        <ListItem button={true} divider={true} onClick={this.props.handleSelection}>
                            {gotClashReport
                                ? ""
                                : <Checkbox checked={this.props.isSelected} tabIndex={-1} disableRipple={true}/>}
                            <ListItemText primary={primary} secondary={secondary}/>
                        </ListItem>
                    </div>
                </div>
            </div>
        );
    }
}

const getClashReport = (x : ClashReport) => {
    if (x) {
        if (x.Type === "single") {
            return (
                <div>Cannot select this subject as it clashes with : <br/>
                    <b>{x.TargetName}</b>
                </div>
            );

        } else if (x.Type === "group") {
            return (
                <div>Cannot select this subject as it causes <a>Group Clashing</a></div>
            );
        }
    } else {
        return "";
    }
};
export default SubjectView;
