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
}

export interface ICounterStates {
    current : number;
}
export class CounterView extends React.Component < ICounterProps,
ICounterStates > {
    constructor(props : ICounterProps) {
        super(props);
        this.state = {
            current: 1
        };
    }

    public handleClickLeft = () => {
        this.setState({
            current: this.state.current - 1
        });
    }

    public handleClickRight = () => {
        this.setState({
            current: this.state.current + 1
        });
    }

    public render() {
        return (
            <div style={divStyle}>
                <RaisedButton onClick={this.handleClickLeft} icon={< IconLeft />}/>
                <RaisedButton label={this.state.current + "/" + this.props.maxInclusive}/>
                <RaisedButton onClick={this.handleClickRight} icon={< IconRight />}/>
            </div>
        );
    }
}
