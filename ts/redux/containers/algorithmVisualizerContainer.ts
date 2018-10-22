import {connect} from "react-redux";
import { IAlgorithmVisualizerViewDispatchProps, AlgorithmVisualizerView, IAlgorithmVisualizerViewStateProps } from "../../react/algorithmVisualizerView";
import { ToggleIsOpenOfAlgorithmVisualizerView } from "../actions/toggleIsOpenOfAlgorithmVisualizerView";
import { IAlgorithmVisualizerState } from "../reducers/algorithmVisualizerState";

const mapStateToProps = (state): IAlgorithmVisualizerViewStateProps => {
    const target = state.MasterStateReducer.AlgorithmVisualizerState as IAlgorithmVisualizerState;
    return {
        open: target.isOpen
    };
};

const mapDispatchToProps = (dispatch): IAlgorithmVisualizerViewDispatchProps => {
    return {
        handleClose: () => dispatch(new ToggleIsOpenOfAlgorithmVisualizerView(false))
    };
};

export const AlgorithmVisualizerViewContainer = connect(mapStateToProps, mapDispatchToProps)(AlgorithmVisualizerView);
