import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import {
  ColorOfDefinitelyOccupied,
  ColorOfDefinitelyUnoccupied,
  ColorOfMaybeOccupied,
  STCBox,
} from "../model/matrix/stcBox";
import { TimetableView } from "./timetableView/timetableView";
import { DialogContent } from "@material-ui/core";

export const NO_OPERATION = () => {};

// region style
const typo1Style: React.CSSProperties = {
  textAlign: "left",
  marginBottom: "12px",
};

const divStyle: React.CSSProperties = {
  display: "grid",
  gridGap: "8px",
  textAlign: "center",
  overflowY: "auto",
  padding: "18px",
  justifySelf: "center",
  alignContent: "start",
};

const cancelButtonStyle: React.CSSProperties = {
  marginRight: "10px",
};

type LegendType = "red" | "grey" | "green";
interface ILegendProps {
  type: LegendType;
  label: string;
}

const Legend = (props: ILegendProps) => {
  const background = () => {
    switch (props.type) {
      case "red":
        return ColorOfDefinitelyOccupied;
      case "grey":
        return ColorOfDefinitelyUnoccupied;
      case "green":
        return ColorOfMaybeOccupied;
    }
  };

  const legendSymbol: React.CSSProperties = {
    marginRight: "10px",
    width: "30px",
    height: "20px",
    float: "left",
    background: background(),
  };

  const legendLabel: React.CSSProperties = {
    float: "left",
  };

  return (
    <React.Fragment>
      <div style={legendSymbol} />
      <div style={legendLabel}>
        <Typography>{props.label}</Typography>
      </div>
    </React.Fragment>
  );
};

export interface ISetTimeConstraintViewStateProps {
  totalMatrix: STCBox[];
  isOpen: boolean;
  numberOfRemovedTimetables: number;
  numberOfRemainingTimetables: number;
}

export interface ISetTimeConstraintViewDispatchProps {
  handleSetTimeConstraintAt: (stcBox: STCBox) => void;
  handleDesetTimeConstraintAt: (stcBox: STCBox) => void;
  handleCancel: () => void;
}

interface ISetTimeConstraintViewProps
  extends ISetTimeConstraintViewStateProps,
    ISetTimeConstraintViewDispatchProps {}
export class SetTimeConstraintView extends React.Component<
  ISetTimeConstraintViewProps,
  {}
> {
  public render() {
    return (
      <Dialog open={this.props.isOpen} fullScreen={true}>
        {/* transition={Transition}> */}
        <DialogContent style={divStyle}>
          <div
            style={{
              display: "grid",
              gridTemplate: "auto auto / auto auto",
              width: "90%",
              justifySelf: "center",
            }}
          >
            <Typography
              variant="title"
              style={typo1Style}
              gutterBottom={true}
              align="center"
            >
              Set time constraint
            </Typography>
            <div
              style={{
                display: "grid",
                gridGap: "12px",
                gridTemplateColumns: "auto auto",
                alignContent: "center",
                alignItems: "center",
                textAlign: "left",
                gridRow: "auto / span 2",
                justifyContent: "start",
                justifySelf: "end",
              }}
            >
              <Legend type="grey" label="Definitely no class" />
              <Legend type="red" label="Definitely have class" />
              <Legend
                type="green"
                label="Click this if you don't want to have class here"
              />
            </div>
            <div style={{ textAlign: "left", display: "grid", gridGap: "4px" }}>
              <Typography>What is this feature for?</Typography>
              <Typography variant="caption">
                1. Based on the subjects you chose, TTAP found{" "}
                {this.props.numberOfRemainingTimetables +
                  this.props.numberOfRemovedTimetables}{" "}
                types of valid timetables.
              </Typography>
              <Typography variant="caption">
                2. It might be quite difficult for you to pick a favourite
                timetable out of them.
              </Typography>
              <Typography variant="caption">
                3. To overcome this problem, you can use this feature to greatly
                decrease the number of generated timetables.
              </Typography>
              <Typography variant="caption">
                4. To do so, click on the green boxes shown below.
              </Typography>
              <Typography variant="caption">
                5. Click as many as you can and make the green bar as long as
                possible!
              </Typography>
            </div>
          </div>
          <TimetableView
            slots={[]}
            isShowingAlternativeSlots={false}
            alternateSlots={null}
            isShowingAlternativeSlotOf={null}
            stcBoxes={this.props.totalMatrix}
            handleSelectSlotChoice={NO_OPERATION}
            handleGoToThisAlternateSlot={NO_OPERATION}
            handleShowAlternateSlot={NO_OPERATION}
            handleToggleIsOpenOfSummary={NO_OPERATION}
            handleSetTimeContraintAt={this.props.handleSetTimeConstraintAt}
            handleDesetTimeContraintAt={this.props.handleDesetTimeConstraintAt}
          />

          <Report
            numberOfRemovedTimetables={this.props.numberOfRemovedTimetables}
            numberOfRemainingTimetables={this.props.numberOfRemainingTimetables}
          />

          <div
            style={{
              display: "grid",
              justifyContent: "center",
              gridGap: "12px",
              gridAutoFlow: "column",
              marginTop: "8px",
            }}
          >
            <Button
              style={cancelButtonStyle}
              color="default"
              onClick={this.props.handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.props.handleCancel}
            >
              Done
            </Button>
          </div>
          <div style={{ height: "16px" }} />
        </DialogContent>
      </Dialog>
    );
  }
}

const Report = (props: {
  numberOfRemovedTimetables: number;
  numberOfRemainingTimetables: number;
}) => {
  const style: React.CSSProperties = {
    fontSize: "14px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 2fr",
    alignItems: "center",
    width: "90%",
    justifySelf: "center",
    gridGap: "12px",
  };
  const barStyle: React.CSSProperties = {
    height: "8px",
    borderRadius: "8px",
    transition: "width 0.3s ease-in-out",
  };
  const total =
    props.numberOfRemainingTimetables + props.numberOfRemovedTimetables;
  return (
    <div style={style}>
      <div
        style={{
          ...barStyle,
          background: "indianred",
          width: `${(props.numberOfRemainingTimetables / total) * 100}%`,
          justifySelf: "end",
        }}
      />
      <div style={{ display: "grid", gridAutoFlow: "column", gridGap: "4px" }}>
        {props.numberOfRemainingTimetables}
        {/* <CountUp start={0} end={props.numberOfRemainingTimetables} duration={0.65}/> */}
        <span style={{ whiteSpace: "nowrap" }}> timetables remaining.</span>
        {props.numberOfRemovedTimetables}
        {/* <CountUp start={0} end={props.numberOfRemovedTimetables} duration={0.65}/> */}
        <span style={{ whiteSpace: "nowrap" }}> timetables are removed.</span>
      </div>
      <div
        style={{
          ...barStyle,
          background: "greenyellow",
          width: `${(props.numberOfRemovedTimetables / total) * 100}%`,
        }}
      />
    </div>
  );
};
