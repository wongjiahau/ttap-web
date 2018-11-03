import IconDown from "material-ui-icons/KeyboardArrowDown";
import IconLeft from "material-ui-icons/KeyboardArrowLeft";
import IconRight from "material-ui-icons/KeyboardArrowRight";
import IconUp from "material-ui-icons/KeyboardArrowUp";
import Button from "material-ui/Button";
import * as React from "react";
import {StackPanel} from "./panels/stackPanel";
import { NO_OPERATION } from "./setTimeConstraintView";

export interface ICounterProps {
    leftTooltip :        string;
    upTooltip:           string;
    downTooltip:         string;
    middleTooltip :      string;
    rightTooltip :       string;
    maxIndex:            number;
    currentIndex:        number;
    currentSubIndex:     number;
    handleClickLeft:     () => void;
    handleClickRight:    () => void;
    handleClickUp:       () => void;
    handleClickDown:     () => void;
    handleClickMiddle ?: () => void;
}

export class CounterView extends React.Component < ICounterProps, {} > {
    constructor(props : ICounterProps) {
        super(props);
    }

    public render() {
        const getButton = (handler: any, icon: any, tooltip: string, tooltipPosition: "up" | "down" = "up") => {
            return (
                <div data-balloon={tooltip} data-balloon-pos={tooltipPosition}>
                    <Button onClick={handler} raised={true} style={{width: "100%"}}>
                        {icon}
                    </Button>
                </div>
            );
        };
        const centerButtonStyle : React.CSSProperties = {
            height: "40px",
            margin: "2px"
        };
        return (
            // Copied from https://www.w3schools.com/css/tryit.asp?filename=trycss_grid
            <div className="grid-container" style={{marginLeft: "5px", marginRight: "5px"}}>
                <div className="grid-item"/>
                <div className="grid-item">
                    {getButton(this.props.handleClickUp, < IconUp />, this.props.upTooltip)} </div>
                <div className="grid-item"/>
                <div className="grid-item">
                    {getButton(this.props.handleClickLeft, < IconLeft />, this.props.leftTooltip)}
                </div>
                <div className="grid-item">
                    <div data-balloon={this.props.middleTooltip} data-balloon-pos="up">
                        <Button
                            style={centerButtonStyle}
                            onClick={this.props.handleClickMiddle}
                            raised={true}>
                            {`${this.props.currentIndex}(${this.props.currentSubIndex}) / ${this.props.maxIndex}`}
                        </Button>
                    </div>
                </div>
                <div className="grid-item">
                    {getButton(this.props.handleClickRight, < IconRight />, this.props.rightTooltip)}
                </div>
                <div className="grid-item"/>
                <div className="grid-item">
                    {getButton(this.props.handleClickDown, < IconDown />, this.props.downTooltip, "down")}
                </div>
                <div className="grid-item"/>
            </div>
        );
    }
}
