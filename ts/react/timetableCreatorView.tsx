import Button from "material-ui-next/Button";
import Snackbar from "material-ui-next/Snackbar";
import {Origin} from "material-ui-next/Snackbar";
import Drawer from "material-ui/Drawer";
import RaisedButton from "material-ui/RaisedButton";
import IconList from "material-ui/svg-icons/action/list";
import * as React from "react";
import {Subject} from "../model/subject";
import {SubjectListViewContainer} from "../redux/containers/subjectListViewContainer";
import {TimetableListContainer} from "../redux/containers/timetableListContainer";

const selectSubjectButtonStyle : React.CSSProperties = {
    marginBottom: "10px",
    marginLeft: "10px"
};

export interface ITimetableCreatorViewStateProps {
    isSubjectListViewVisible : boolean;
    isSnackbarVisible : boolean;
    snackbarMessage : string;
}

export interface ITimetableCreatorViewDispatchProps {
    handleToggleVisibilityOfSubjectListView : () => void;
    handleSnackbarAction : () => void;
}

interface ITimetableCreatorViewProps extends ITimetableCreatorViewStateProps,
ITimetableCreatorViewDispatchProps {}

let viewCount = 0;
export class TimetableCreatorView extends React.Component < ITimetableCreatorViewProps, {} > {
    public render() {
        viewCount++;
        const okButton = (
            <Button color="accent" dense={true} onClick={this.props.handleSnackbarAction}>
                Got it
            </Button>
        );
        const snackbarMessage = <span>{this.props.snackbarMessage}</span>;
        const anchorOrigin : Origin = {
            horizontal: "right",
            vertical: "bottom",
        };
        return (
            <div>
                <Drawer docked={false} width={520} open={this.props.isSubjectListViewVisible}>
                    <SubjectListViewContainer/>
                </Drawer>
                <RaisedButton
                    icon={< IconList />}
                    style={selectSubjectButtonStyle}
                    secondary={true}
                    label="Select subjects"
                    onClick={this.props.handleToggleVisibilityOfSubjectListView}/>
                <TimetableListContainer/>
                <Snackbar
                    action={okButton}
                    open={this.props.isSnackbarVisible && (viewCount % 2 === 0)}
                    anchorOrigin={anchorOrigin}
                    SnackbarContentProps={{
                    "aria-describedby": "message-id"
                }}
                    message={snackbarMessage}/>
                <Snackbar
                    action={okButton}
                    open={this.props.isSnackbarVisible && (viewCount % 2 === 1)}
                    anchorOrigin={anchorOrigin}
                    SnackbarContentProps={{
                    "aria-describedby": "message-id"
                }}
                    message={snackbarMessage}/>
            </div>
        );
    }

    public componentDidMount() {
        this.setState({isSelectSubjectPanelOpened: true});
    }
}
