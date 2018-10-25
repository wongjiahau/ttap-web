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
    fullSearchPathCount: number;
    timeTaken: number;
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
                <p style={{marginLeft: 15, position: "absolute", left: 0, bottom: 0}}>
                    Hit rate = {this.props.expectedHitCount} / {this.props.actualHitCount} = <b>{percentage}%</b>
                    <br/>
                    Brute force search paths = <b>{this.props.fullSearchPathCount}</b>
                    <br/>
                    Reduced search paths = {this.props.fullSearchPathCount} - {this.props.actualHitCount}{" = "}
                    {this.props.fullSearchPathCount - this.props.actualHitCount}{" = "}
                    <b>{((this.props.fullSearchPathCount - this.props.actualHitCount) /
                        this.props.fullSearchPathCount * 100).toFixed(2)}%</b>
                    <br/>
                    Time taken: <b>{(this.props.timeTaken / 1000).toFixed(2)} seconds</b>
                </p>
            </Dialog>
        );
    }
}
