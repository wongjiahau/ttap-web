import Drawer from "material-ui/Drawer";
import RaisedButton from "material-ui/RaisedButton";
import IconList from "material-ui/svg-icons/action/list";
import * as React from "react";
import {Subject} from "../model/subject";
import {SubjectListViewContainer} from "../redux/containers/subjectListViewContainer";
import { TimetableListContainer } from "../redux/containers/timetableListContainer";

const selectSubjectButtonStyle : React.CSSProperties = {
    marginBottom: "10px",
    marginLeft: "10px"
};

export interface ITimetableCreatorViewStateProps {
    isSubjectListViewVisible : boolean;
}

export interface ITimetableCreatorViewDispatchProps {
    handleToggleVisibilityOfSubjectListView : () => void;
}

interface ITimetableCreatorViewProps extends ITimetableCreatorViewStateProps,
ITimetableCreatorViewDispatchProps {}

export class TimetableCreatorView extends React.Component < ITimetableCreatorViewProps, {} > {
    public render() {
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
            </div>
        );
    }

    public componentDidMount() {
        this.setState({isSelectSubjectPanelOpened: true});
    }
}
