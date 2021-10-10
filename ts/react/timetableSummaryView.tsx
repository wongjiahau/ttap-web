import * as React from "react";
import { ISlotViewModel } from "../model/slotViewModel";
import { SubjectSummary, TimetableSummary } from "../model/timetableSummary";
import { ColorHash } from "../util/colorhash";
import { invertColor } from "../util/invertColor";

interface ITimetableSummaryViewProps {
  slots: ISlotViewModel[];
}

export class TimetableSummaryView extends React.Component<
  ITimetableSummaryViewProps,
  {}
> {
  public render() {
    if (!this.props.slots) {
      return false;
    }
    const subjectSummaries = new TimetableSummary(this.props.slots)
      .SubjectSummaries;
    const tableStyle: React.CSSProperties = {
      border: "1px solid black",
      borderCollapse: "collapse",
      fontSize: "16px",
      justifySelf: "center",
      backgroundColor: "whitesmoke",
    };
    return (
      // @ts-ignore
      <table cellPadding="0" cellSpacing="0" style={tableStyle} border="1">
        <tbody>
          <tr>
            {getTd("Code")}
            {getTd("Name")}
            {getTd("Lecture")}
            {getTd("Tutorial")}
            {getTd("Practical")}
            {getTd("Credit Hour")}
          </tr>
          {subjectSummaries.map((x, i) => {
            return this.generateSubjectSummaryView(
              x,
              ColorHash(x.SubjectCode),
              i
            );
          })}
          <tr>
            {getTd("Total Credit Hour", "right", 5)}
            {getTd(
              subjectSummaries.reduce((x, y) => x + y.CreditHour, 0).toFixed(1)
            )}
          </tr>
        </tbody>
      </table>
    );
  }

  private generateSubjectSummaryView(
    x: SubjectSummary,
    backgroundColor: string,
    index: number
  ) {
    const style: React.CSSProperties = {
      color: invertColor(backgroundColor),
      backgroundColor,
    };
    return (
      <tr key={index.toString()} style={style}>
        {getTd(x.SubjectCode)}
        {getTd(x.SubjectName)}
        {getTd(x.Lecture)}
        {getTd(x.Tutorial)}
        {getTd(x.Practical)}
        {getTd(x.CreditHour.toFixed(1))}
      </tr>
    );
  }
}

function getTd(
  content: string,
  textAlign = "center" as "center" | "right",
  colSpan = 1
) {
  const style: React.CSSProperties = {
    textAlign,
    padding: "5px",
    fontFamily: "roboto",
  };
  return (
    <td style={style} colSpan={colSpan}>
      {content}
    </td>
  );
}
