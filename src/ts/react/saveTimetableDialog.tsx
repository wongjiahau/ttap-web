import {
  DialogTitle,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import CloudIcon from "@material-ui/icons/CloudUpload";
import FileIcon from "@material-ui/icons/InsertDriveFile";
import PictureIcon from "@material-ui/icons/InsertPhoto";
import HtmlIcon from "@material-ui/icons/Web";
import * as React from "react";
import { GetSemStartDateDialog } from "./getSemStartDateDialog";

const cancelButtonStyle: React.CSSProperties = {
  marginBottom: "7px",
  marginLeft: "7px",
};

export interface ISaveTimetableDialogStateProps {
  isMainDialogOpen: boolean;
  isGetDateDialogOpen: boolean;
}

export interface ISaveTimetableDialogDispatchProps {
  handleClose: () => void;
  handleCloseGetDateDialog: () => void;
  handleOpenGetDateDialog: () => void;
  handleSaveAsHtml: () => void;
  handleSaveAsImage: () => void;
  handleSaveAsTextFile: () => void;
  handleSaveToGoogleCalendar: (semStartDate: Date) => void;
}

export interface ISaveTimetableDialogProps
  extends ISaveTimetableDialogStateProps,
    ISaveTimetableDialogDispatchProps {}

export class SaveTimetableDialog extends React.Component<
  ISaveTimetableDialogProps,
  {}
> {
  public render() {
    const getListItem = (text: string, icon: any, handler: any) => {
      return (
        <ListItem button={true} onClick={handler}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      );
    };
    return (
      <Dialog
        open={this.props.isMainDialogOpen}
        onBackdropClick={this.props.handleClose}
      >
        <DialogTitle>Save this timetable as . . .</DialogTitle>
        <div>
          <List>
            {getListItem(
              "Text file",
              <FileIcon />,
              this.props.handleSaveAsTextFile
            )}
            {getListItem("HTML", <HtmlIcon />, this.props.handleSaveAsHtml)}
            {getListItem(
              "Picture",
              <PictureIcon />,
              this.props.handleSaveAsImage
            )}
            {/* {getListItem("Google Calendar", <CloudIcon/>  , this.props.handleOpenGetDateDialog)} */}
          </List>
          <Button
            color="primary"
            style={cancelButtonStyle}
            onClick={this.props.handleClose}
          >
            cancel
          </Button>
        </div>
        <GetSemStartDateDialog
          isOpen={this.props.isGetDateDialogOpen}
          handleClose={this.props.handleCloseGetDateDialog}
          handleSaveToGoogleCalendar={this.props.handleSaveToGoogleCalendar}
        />
      </Dialog>
    );
  }
}
