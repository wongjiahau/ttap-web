import Drawer from "material-ui/Drawer";
import RaisedButton from "material-ui/RaisedButton";
import IconClock from "material-ui/svg-icons/action/alarm";
import IconList from "material-ui/svg-icons/action/list";
import IconSave from "material-ui/svg-icons/content/save";
import * as React from "react";
import {Subject} from "../model/subject";
import {SubjectListViewContainer} from "../redux/containers/subjectListViewContainer";
import {CounterView} from "./counterView";
import {TimetableView} from "./timetableView";

const selectSubjectButtonStyle : React.CSSProperties = {
    marginBottom: "10px",
    marginLeft: "10px"
};

const centerDivStyle : React.CSSProperties = {
    margin: "auto",
    textAlign: "center"
};

const footerStyle : React.CSSProperties = {
    margin: "auto",
    textAlign: "center"
};

const footerButtonStyle : React.CSSProperties = {
    marginRight: "10px",
    marginTop: "10px"
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
                <div style={centerDivStyle}>
                    <TimetableView/>
                </div>
                <div style={footerStyle}>
                    <RaisedButton
                        primary={true}
                        style={footerButtonStyle}
                        icon={< IconClock />}
                        label="Set time constraint"/>
                    <CounterView maxInclusive={200}/>
                    <RaisedButton
                        primary={true}
                        style={footerButtonStyle}
                        icon={< IconSave />}
                        label="Save as . . ."/>
                </div>
            </div>
        );
    }

    public componentDidMount() {
        this.setState({isSelectSubjectPanelOpened: true});
    }
}
