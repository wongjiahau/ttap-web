import { connect } from "react-redux";
import {deleteUserProfileName} from "../actions/deleteUserProfileName";
import {updateUserProfileName} from "../actions/updateUserProfileName";
import { NameEditComponent } from "../components/nameEditor";

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateClick : (name : string) => dispatch(updateUserProfileName(name)),
    onDeleteClick : () => dispatch(deleteUserProfileName())
  };
};

export const NameEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NameEditComponent);
