import Drawer from 'material-ui/Drawer';
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import * as React from "react";
import {Subject} from "../model/subject";
import {SubjectListView} from "./subjectListView";

const dialogStyle : React.CSSProperties = {
    margin: "auto",
    width: "50%"
};

const subjectListViewStyle : React.CSSProperties = {
    marginTop: "-40px"
};

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

    public handleClose = () => {
        this.setState({isSelectSubjectPanelOpened: false});
    }

    public render() {
        const actions = [ < FlatButton key = "cancel-button" label = "Cancel" primary = {
                true
            }
            onClick = {
                this.handleClose
            } />, < FlatButton key = "done-button" label = "Done" primary = {
                true
            }
            keyboardFocused = {
                true
            }
            onClick = {
                this.handleClose
            } />
        ];
        return (
            <div>
                <RaisedButton label="Select subjects" onClick={this.handleOpen}/>
                <Drawer docked={false} width={550} open={this.state.isSelectSubjectPanelOpened}>
                    <SubjectListView style={subjectListViewStyle} subjects={this.allSubjects}/>
                    <FlatButton
                        key="cancel-button"
                        label="Cancel"
                        primary={true}
                        onClick={this.handleClose}/>
                    <FlatButton
                        key="done-button"
                        label="Done"
                        primary={true}
                        keyboardFocused={true}
                        onClick={this.handleClose}/>

                </Drawer>
            </div>
        );
    }

    public componentDidMount() {
        this.setState({isSelectSubjectPanelOpened: true});
    }
}
