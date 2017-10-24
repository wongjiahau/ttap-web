import { connect } from "react-redux";
import {deleteUserProfileName} from "../actions/deleteUserProfileName";
import {updateUserProfileName} from "../actions/updateUserProfileName";
import { INameEditComponentProps, NameEditComponent } from "../components/nameEditor";

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) :  INameEditComponentProps => {
  return {
    onDeleteClick : () => dispatch(deleteUserProfileName()),
    onUpdateClick : (name : string) => dispatch(updateUserProfileName(name)),
  };
};

export const NameEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NameEditComponent);
