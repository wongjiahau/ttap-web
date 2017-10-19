import Checkbox from "material-ui/Checkbox";
import {ListItem} from "material-ui/List";
import * as React from "react";

export interface ISubjectViewProps {
    subjectName: string;
    subjectCode: string;
}

export class SubjectView extends React.Component < ISubjectViewProps, {} > {
    public handleClick = () => {
        alert();
    }
    public render() {
        return (<ListItem
            primaryText={this.props.subjectName}
            secondaryText={this.props.subjectCode}
            onClick={this.handleClick}/>);
    }
}

export default SubjectView;
