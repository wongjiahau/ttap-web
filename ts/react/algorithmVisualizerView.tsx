import * as React from "react";
import Typography from "material-ui/Typography";
import CloseIcon from 'material-ui-icons/Close';
import { Dialog, AppBar, Toolbar, IconButton, Button } from "material-ui";


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
}



export class AlgorithmVisualizerView extends React.Component<
    IAlgorithmVisualizerViewDispatchProps & IAlgorithmVisualizerViewStateProps, {}> {
    public render() {
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
            </Dialog>
        );
    }
}
