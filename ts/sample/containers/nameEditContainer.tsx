import { connect } from "react-redux";
import {DeleteUserProfileName} from "../actions/deleteUserProfileName";
import {UpdateUserProfileName} from "../actions/updateUserProfileName";
import { INameEditComponentProps, NameEditComponent } from "../components/nameEditor";

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) :  INameEditComponentProps => {
  return {
    onDeleteClick : () => dispatch(new DeleteUserProfileName().Action()),
    onUpdateClick : (name : string) => dispatch(new UpdateUserProfileName(name).Action()),
  };
};

export const NameEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NameEditComponent);
