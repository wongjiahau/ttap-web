import Checkbox from "material-ui-next/Checkbox";
import List, {ListItem, ListItemSecondaryAction, ListItemText} from "material-ui-next/List";
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
            <ListItem button={true} onClick={this.props.handleSelection}>
                <Checkbox checked={this.props.isSelected} tabIndex={-1} disableRipple={true}/>
                <ListItemText
                    primary={this.props.subjectName}
                    secondary={this.props.subjectCode}/>
            </ListItem>
        );
    }
}

export default SubjectView;
