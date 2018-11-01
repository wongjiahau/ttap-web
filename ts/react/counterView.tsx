import IconLeft from "material-ui-icons/KeyboardArrowLeft";
import IconRight from "material-ui-icons/KeyboardArrowRight";
import Button from "material-ui/Button";
import * as React from "react";
import {StackPanel} from "./panels/stackPanel";

export interface ICounterProps {
    leftTooltip :        string;
    middleTooltip :      string;
    rightTooltip :       string;
    maxInclusive:        number;
    current:             number;
    handleClickLeft:     () => void;
    handleClickRight:    () => void;
    handleClickMiddle ?: () => void;
}

export class CounterView extends React.Component < ICounterProps, {} > {
    constructor(props : ICounterProps) {
        super(props);
    }

    public render() {
        const getButton = (handler: any, icon: any, tooltip: string) => {
            return (
                <div data-balloon={tooltip} data-balloon-pos="up">
                    <Button onClick={handler} raised={true}>
                        {icon}
                    </Button>
                </div>
            );
        };
        const centerButtonStyle : React.CSSProperties = {
            height: "40px",
            marginLeft: "-2px",
            marginRight: "-2px"

        };
        return (
            <StackPanel orientation="horizontal">
                {getButton(this.props.handleClickLeft, < IconLeft />, this.props.leftTooltip)}
                <div data-balloon={this.props.middleTooltip} data-balloon-pos="up">
                    <Button
                        style={centerButtonStyle}
                        onClick={this.props.handleClickMiddle}
                        raised={true}>
                        {this.props.current + "/" + this.props.maxInclusive}
                    </Button>
                </div>
                {getButton(this.props.handleClickRight, < IconRight />, this.props.rightTooltip)}
            </StackPanel>
        );
    }
}
