import * as React from "react";
import { SaveTimetableDialogContainer } from "../redux/containers/saveTimetableDialogContainer";
import { SetTimeConstraintContainer } from "../redux/containers/setTimeConstraintContainer";
import { SlotsTableContainer } from "../redux/containers/slotsTableContainer";
import { SnackbarContainer } from "../redux/containers/snackbarContainer";
import { SubjectListViewContainer } from "../redux/containers/subjectListViewContainer";
import { TimetableCreatorContainer } from "../redux/containers/timetableCreatorContainer";

export class MasterView extends React.Component<{}, {}> {
    public render() {
        return (
            <TimetableCreatorContainer/>
        );

    }
}
