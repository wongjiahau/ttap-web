import { connect } from "react-redux";
import { HelloWorldComponent } from "../components/helloWorld";

const mapStateToProps = (state) => {
  return {
    userName: state.userProfileReducer.firstname
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export const HelloWorldContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HelloWorldComponent);
