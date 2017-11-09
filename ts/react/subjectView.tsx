import Checkbox from "material-ui-next/Checkbox";
import List, {ListItem, ListItemSecondaryAction, ListItemText} from "material-ui-next/List";
import * as React from "react";
import Highlighter = require("react-highlight-words");

export interface ISubjectViewProps {
    searchWord: string;
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
        const primary = (<Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={[this.props.searchWord]}
            textToHighlight={this.props.subjectName}/>);

        const secondary = (<Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={[this.props.searchWord]}
            textToHighlight={this.props.subjectCode}/>);
        return (
            <ListItem button={true} onClick={this.props.handleSelection}>
                <Checkbox checked={this.props.isSelected} tabIndex={-1} disableRipple={true}/>
                <ListItemText
                    primary={primary}
                    secondary={secondary}/>
            </ListItem>
        );
    }
}

export default SubjectView;
