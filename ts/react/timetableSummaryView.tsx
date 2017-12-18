import {find} from "lodash";
import * as React from "react";
import {RawSlot} from "../model/rawSlot";
import {Timetable} from "../model/timetable";
import {SubjectSummary, TimetableSummary} from "../model/timetableSummary";
import { Colors } from "./colors/colors";
import {GenerateColorScheme} from "./colors/generateColorScheme";

interface ITimetableSummaryViewProps {
    Timetable : Timetable;
}

export class TimetableSummaryView extends React.Component < ITimetableSummaryViewProps, {} > {
    public render() {
        const subjectSummaries = new TimetableSummary(this.props.Timetable).SubjectSummaries;
        const colorSchemes = GenerateColorScheme(RawSlot.GetBunch(this.props.Timetable.HashIds));
        const tableStyle : React.CSSProperties = {
            border: "1px solid black",
            borderCollapse: "collapse"
        };
        return (
            <table cellPadding="0"cellSpacing="0" style={tableStyle} border="1">
                <tbody>
                    <tr>
                        {getTd("Code")}
                        {getTd("Name")}
                        {getTd("Lecture")}
                        {getTd("Tutorial")}
                        {getTd("Practical")}
                    </tr>
                {
                    colorSchemes.map((c) => {
                        return this.generateSubjectSummaryView(
                            find(subjectSummaries, {SubjectCode: c.SubjectCode}),
                            c.Color
                        );
                    })
                }</tbody>
            </table>
        );
    }

    private generateSubjectSummaryView(x : SubjectSummary, backgroundColor: Colors) {
        const style : React.CSSProperties = {
            backgroundColor: backgroundColor.toString()
        };
        return (
            <tr style={style}>
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
