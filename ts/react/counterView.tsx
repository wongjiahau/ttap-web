import Button from "material-ui-next/Button";
import IconLeft from "material-ui/svg-icons/hardware/keyboard-arrow-left";
import IconRight from "material-ui/svg-icons/hardware/keyboard-arrow-right";
import * as React from "react";
import {StackPanel} from "./panels/stackPanel";

export interface ICounterProps {
    leftTooltip : string;
    middleTooltip : string;
    rightTooltip : string;
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
            <StackPanel orientation="horizontal">
                <div data-balloon={this.props.leftTooltip} data-balloon-pos="up">
                    <Button onClick={this.props.handleClickLeft} raised={true}>
                        <IconLeft/>
                    </Button>
                </div>
                <div data-balloon={this.props.middleTooltip} data-balloon-pos="up">
                    <Button
                        style={{
                        height: "40px",
                        marginLeft: "-2px",
                        marginRight: "-2px"
                    }}
                        onClick={this.props.handleClickMiddle}
                        raised={true}>
                        {this.props.current + "/" + this.props.maxInclusive}
                    </Button>
                </div>
                <div data-balloon={this.props.rightTooltip} data-balloon-pos="up">
                    <Button onClick={this.props.handleClickRight} raised={true}>
                        <IconRight/>
                    </Button>
                </div>
            </StackPanel>
        );
    }
}
