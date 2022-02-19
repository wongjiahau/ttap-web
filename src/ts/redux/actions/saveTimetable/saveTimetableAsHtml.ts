import { saveAs } from "file-saver";
import { Timetable } from "../../../model/timetable";
import {
  ITimetableListState,
  TimetableListStateAction,
} from "../../reducers/timetableListState";
import { SaveTimetable } from "./saveTimetable";

export class SaveTimetableAsHtml extends SaveTimetable {
  protected Save(timetable: Timetable) {
    let html = (document.getElementById("timetable-view") as HTMLElement)
      .outerHTML;
    html = html.replace("display: none", "display: inline"); // display timetable summary
    const data = `
<!-- Roboto font -->
<html>
<body>
    <style>
        .arrow-down-button {
            display: none
        }
        .slot-view {
            border:        0.5px;
            border-radius: 5px;
            border-style: solid;
            font-family: "roboto";
            font-size: 13.5px;
            width: 100%;
            text-align: center;
        }
    </style>
    ${html}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
    <script language="javascript">
        var element = document.getElementById("summary-btn");
        element.parentNode.removeChild(element);
    </script>
</body>
</html>
`;
    const file = new File([data], "MyTimetable.html", {
      type: "text/plain;charset=utf-8",
    });
    saveAs(file);
  }
  protected SaveType(): string {
    return "html";
  }
}
