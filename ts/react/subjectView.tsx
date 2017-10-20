import Checkbox from "material-ui/Checkbox";
import {ListItem} from "material-ui/List";
import * as React from "react";

export interface ISubjectViewProps {
    subjectName : string;
    subjectCode : string;
}

export interface ISubjectViewStates {
    isSelected : boolean;
}

const whenSelectedStyle : React.CSSProperties = {};
const whenDeselectedStyle : React.CSSProperties = {};

export class SubjectView extends React.Component < ISubjectViewProps,
ISubjectViewStates > {
    constructor(props : ISubjectViewProps) {
        super(props);
        this.state = {
            isSelected: false
        };

    }
    public handleClick = () => {
        this.setState({
            isSelected: !this.state.isSelected
        });
    }

    public render() {
        return (
            <ListItem
                leftCheckbox={< Checkbox />}
                primaryText={this.props.subjectName}
                secondaryText={this.props.subjectCode}
                onClick={this.handleClick}/>
        );
    }
}

export default SubjectView;
