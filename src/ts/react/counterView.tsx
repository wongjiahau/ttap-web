import Button from "@material-ui/core/Button";
import IconDown from "@material-ui/icons/KeyboardArrowDown";
import IconLeft from "@material-ui/icons/KeyboardArrowLeft";
import IconRight from "@material-ui/icons/KeyboardArrowRight";
import IconUp from "@material-ui/icons/KeyboardArrowUp";
import * as React from "react";

export interface ICounterProps {
  leftTooltip: string;
  upTooltip: string;
  downTooltip: string;
  middleTooltip: string;
  rightTooltip: string;
  maxIndex: number;
  currentIndex: number;
  currentSubIndex: number;
  handleClickLeft: () => void;
  handleClickRight: () => void;
  handleClickUp: () => void;
  handleClickDown: () => void;
  handleClickMiddle?: () => void;
}

export class CounterView extends React.Component<ICounterProps, {}> {
  constructor(props: ICounterProps) {
    super(props);
  }

  public render() {
    const getButton = (
      handler: any,
      icon: any,
      tooltip: string,
      tooltipPosition: "up" | "down" | "left" | "right" = "up"
    ) => {
      return (
        // Refer https://kazzkiq.github.io/balloon.css/
        <div
          data-balloon={tooltip}
          data-balloon-pos={tooltipPosition}
          data-balloon-length="xlarge"
        >
          <Button
            onClick={handler}
            variant="contained"
            style={{ width: "100%" }}
          >
            {icon}
          </Button>
        </div>
      );
    };
    const centerButtonStyle: React.CSSProperties = {
      height: "40px",
      width: "100%",
    };
    return (
      <div
        style={{
          marginLeft: "5px",
          marginRight: "5px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 3fr 1fr 2fr",
          alignItems: "center",
          gap: "2px",
        }}
      >
        <div className="grid-item">
          {getButton(
            this.props.handleClickLeft,
            <IconLeft />,
            this.props.leftTooltip,
            "up"
          )}
        </div>
        <div className="grid-item">
          {getButton(
            this.props.handleClickUp,
            <IconUp />,
            this.props.upTooltip
          )}
        </div>
        <div className="grid-item">
          <div data-balloon={this.props.middleTooltip} data-balloon-pos="up">
            <Button
              style={centerButtonStyle}
              onClick={this.props.handleClickMiddle}
              variant="contained"
            >
              {`${this.props.currentIndex}(${this.props.currentSubIndex}) / ${this.props.maxIndex}`}
            </Button>
          </div>
        </div>
        <div className="grid-item">
          {getButton(
            this.props.handleClickDown,
            <IconDown />,
            this.props.downTooltip,
            "up"
          )}
        </div>
        <div className="grid-item">
          {getButton(
            this.props.handleClickRight,
            <IconRight />,
            this.props.rightTooltip,
            "up"
          )}
        </div>
      </div>
    );
  }
}
