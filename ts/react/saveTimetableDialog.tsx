import AddIcon from "material-ui-icons/Add";
import CloudIcon from "material-ui-icons/CloudUpload";
import FileIcon from "material-ui-icons/InsertDriveFile";
import PictureIcon from "material-ui-icons/InsertPhoto";
import Button from "material-ui-next/Button";
import Dialog, {DialogTitle} from "material-ui-next/Dialog";
import List, {ListItem, ListItemIcon, ListItemText} from "material-ui-next/List";
import * as React from "react";

const cancelButtonStyle : React.CSSProperties = {
    marginBottom: "7px",
    marginLeft: "7px"
};

export interface ISaveTimetableDialogStateProps {
    isOpen: boolean;
}

export interface ISaveTimetableDialogDispatchProps {
    handleClose: () => void;
    handleSaveAsTextFile: () => void;
    handleSaveAsPicture: () => void;
    handleSaveToGoogleCalendar: () => void;
}

export interface ISaveTimetableDialogProps extends ISaveTimetableDialogStateProps,
ISaveTimetableDialogDispatchProps {}

export class SaveTimetableDialog extends React.Component < ISaveTimetableDialogProps, {} > {
    public render() {
        return (
            <Dialog open={this.props.isOpen}>
                <DialogTitle>Save this timetable as . . .</DialogTitle>
                <div>
                    <List>
                        <ListItem button={true} onClick={this.props.handleSaveAsPicture}>
                            <ListItemIcon>
                                <FileIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Text file (*.txt)"}/>
                        </ListItem>
                        <ListItem button={true} onClick={this.props.handleSaveAsPicture}>
                            <ListItemIcon>
                                <PictureIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Picture (*.png)"}/>
                        </ListItem>
                        <ListItem button={true} onClick={this.props.handleSaveAsPicture}>
                            <ListItemIcon>
                                <CloudIcon/>
                            </ListItemIcon>
                            <ListItemText primary={"Google Calendar"}/>
                        </ListItem>
                    </List>
                    <Button color="primary" style={cancelButtonStyle} onClick={this.props.handleClose}>cancel</Button>
                </div>
            </Dialog>
        );
    }
}
