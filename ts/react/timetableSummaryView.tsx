const find = require("lodash.find");
import * as React from "react";
import {ISlotState} from "../model/generalizedSlot";
import {SubjectSummary, TimetableSummary} from "../model/timetableSummary";
import {Colors} from "./colors/colors";
import {GenerateColorScheme} from "./colors/generateColorScheme";

interface ITimetableSummaryViewProps {
    slots : ISlotState[];
}

export class TimetableSummaryView extends React.Component < ITimetableSummaryViewProps, {} > {
    public render() {
        if (!this.props.slots) {
            return false;
        }
        const subjectSummaries = new TimetableSummary(this.props.slots).SubjectSummaries;
        const colorSchemes = GenerateColorScheme(this.props.slots);
        const tableStyle : React.CSSProperties = {
            border: "1px solid black",
            borderCollapse: "collapse"
        };
        return (
            <table cellPadding="0" cellSpacing="0" style={tableStyle} border="1">
                <tbody>
                    <tr>
                        {getTd("Code")}
                        {getTd("Name")}
                        {getTd("Lecture")}
                        {getTd("Tutorial")}
                        {getTd("Practical")}
                    </tr>
                    {colorSchemes.map((c, index) => {
                        return this.generateSubjectSummaryView(find(subjectSummaries, {SubjectCode: c.SubjectCode}), c.Color, index);
                    })
}</tbody>
            </table>
        );
    }

    private generateSubjectSummaryView(x : SubjectSummary, backgroundColor : Colors, index : number) {
        const style : React.CSSProperties = {
            backgroundColor: backgroundColor.toString()
        };
        return (
            <tr key={index.toString()} style={style}>
                {getTd(x.SubjectCode)}
                {getTd(x.SubjectName)}
                {getTd(x.Lecture)}
                {getTd(x.Tutorial)}
                {getTd(x.Practical)}
            </tr>
        );
    }

}

function getTd(content) {
    const style : React.CSSProperties = {
        textAlign: "center",
        padding: "5px",
        fontFamily: "roboto"
    };
    return (
        <td style={style}>{content}</td>
    );
}
