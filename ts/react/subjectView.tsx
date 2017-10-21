import Checkbox from "material-ui/Checkbox";
import {ListItem} from "material-ui/List";
import * as React from "react";

export interface ISubjectViewProps {
    subjectName : string;
    subjectCode : string;
    isSelected : boolean;
    handleSelection : () => void;
}

const whenSelectedStyle : React.CSSProperties = {};
const whenDeselectedStyle : React.CSSProperties = {};

export class SubjectView extends React.Component < ISubjectViewProps, {} > {
    constructor(props : ISubjectViewProps) {
        super(props);
    }

    public render() {
        return (
            <ListItem
                leftCheckbox={< Checkbox checked={this.props.isSelected} onClick={this.props.handleSelection}/>}
                primaryText={this.props.subjectName}
                secondaryText={this.props.subjectCode}
                />
        );
    }
}

export default SubjectView;
