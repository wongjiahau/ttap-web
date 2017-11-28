import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import IconLeft from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import IconRight from "material-ui/svg-icons/hardware/keyboard-arrow-right";
import * as React from "react";

const divStyle : React.CSSProperties = {
    display: "inline-block",
    marginRight: "10px"
};

export interface ICounterProps {
    maxInclusive : number;
    current : number;
    handleClickLeft : () => void;
    handleClickRight : () => void;
    handleClickMiddle : () => void;
}

export class CounterView extends React.Component < ICounterProps, {} > {
    constructor(props : ICounterProps) {
        super(props);
    }

    public render() {
        return (
            <div style={divStyle}>
                <RaisedButton onClick={this.props.handleClickLeft} icon={< IconLeft />}/>
                <RaisedButton onClick={this.props.handleClickMiddle} label={this.props.current + "/" + this.props.maxInclusive}/>
                <RaisedButton onClick={this.props.handleClickRight} icon={< IconRight />}/>
            </div>
        );
    }
}
