import { AppBar, Button, Dialog, IconButton, Toolbar } from "material-ui";
import CloseIcon from "material-ui-icons/Close";
import Typography from "material-ui/Typography";
import * as React from "react";

const innerDivStyle: React.CSSProperties = {
    position: "relative",
    background: "white",
    height: window.innerHeight,
};

export interface IAlgorithmVisualizerViewDispatchProps {
    handleClose: () => void;
}

export interface IAlgorithmVisualizerViewStateProps {
    open: boolean;
    expectedHitCount: number;
    actualHitCount: number;
}

export class AlgorithmVisualizerView extends React.Component<
    IAlgorithmVisualizerViewDispatchProps & IAlgorithmVisualizerViewStateProps, {}> {
    public render() {
        const percentage = (this.props.expectedHitCount / this.props.actualHitCount * 100).toFixed(2);
        return (
            <Dialog open={this.props.open} fullScreen={true}>
                <AppBar style={{position: "relative"}}>
                    <Toolbar>
                        <Typography type="title" color="inherit" style={{flex: 1}}>
                            Algorithm Visualizer
                        </Typography>
                        <IconButton color="inherit" onClick={this.props.handleClose} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {/* Don't modify the for-algo-visualization div below
                    as it is required by findTimetableVisualizer.ts */}
                <div id="for-algo-visualization" style={innerDivStyle}/>
                <p style={{marginLeft: 15}}>
                    Hit rate: {this.props.expectedHitCount} / {this.props.actualHitCount} = {percentage}%
                </p>
            </Dialog>
        );
    }
}
