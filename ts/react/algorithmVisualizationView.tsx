import * as React from "react";

const outerDivStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    left: "530px",
    margin: "50px",
    height: "100%",
    opacity: 1,
    zIndex: 1,
    top: 0,
    overflow: "scroll",
    background: "white"
};

const innerDivStyle: React.CSSProperties = {
    position: "relative",
    background: "white",
    height: window.innerHeight,
};

export class AlgorithmVisualizationView extends React.Component<{
    open: boolean;
    handleClose: () => void;
}, {}> {
    public render() {
        return (
            <div style={this.props.open ? outerDivStyle : {display: "none"}}>
                <div style={{margin: "10px"}}>
                    <span>Algorithm Visualization</span>
                    <button onClick={this.props.handleClose}>CLOSE</button>
                </div>
                {/* --> Put your changes HERE, actually you can update whatever part you want in this file
                    Except the for-algo-visualization div <--*/}

                {/* Don't modify the for-algo-visualization div below
                    It is required by findTimetableVisualizer.ts */}
                <div id="for-algo-visualization" style={innerDivStyle}/>
            </div>
        );
    }
}
