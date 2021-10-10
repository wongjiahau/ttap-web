import { connect } from "react-redux";
import { FgoView, IFgoViewDispatchProps } from "../../react/fgoView";
import { NotifyDataLoaded } from "../actions/notifyDataLoaded";

const mapStateToProps = (state: any): {} => {
  return {};
};

const mapDispatchToProps = (dispatch: any): IFgoViewDispatchProps => {
  return {
    handleLoadSlot: (rawSlots) => dispatch(new NotifyDataLoaded(rawSlots)),
  };
};

export const FgoViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FgoView);
