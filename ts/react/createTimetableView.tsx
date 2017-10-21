import Drawer from 'material-ui/Drawer';
import RaisedButton from "material-ui/RaisedButton";
import * as React from "react";
import {Subject} from "../model/subject";
import {SubjectListView} from "./subjectListView";

export interface ICreateTimetableViewProps {
    allSubjects : Subject[];
}
export interface ICreateTimetableViewStates {
    isSelectSubjectPanelOpened : boolean;
}
export class CreateTimetableView extends React.Component < ICreateTimetableViewProps,
ICreateTimetableViewStates > {
    private allSubjects : Subject[];
    constructor(props : ICreateTimetableViewProps) {
        super(props);
        this.state = {
            isSelectSubjectPanelOpened: false
        };
        this.allSubjects = props.allSubjects;
    }
    public handleOpen = () => {
        this.setState({isSelectSubjectPanelOpened: true});
    }

    public handleDone = () => {
        this.setState({isSelectSubjectPanelOpened: false});
    }

    public render() {
        return (
            <div>
                <RaisedButton label="Select subjects" onClick={this.handleOpen}/>
                <Drawer docked={false} width={550} open={this.state.isSelectSubjectPanelOpened}>
                    <SubjectListView subjects={this.allSubjects} handleDone={this.handleDone}/>

                </Drawer>
            </div>
        );
    }

    public componentDidMount() {
        this.setState({isSelectSubjectPanelOpened: true});
    }
}
