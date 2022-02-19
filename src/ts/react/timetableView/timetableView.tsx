import Button from "@material-ui/core/Button";
import * as React from "react";
import { TimePeriod } from "../../att/timePeriod";
import { STCBox } from "../../model/matrix/stcBox";
import { ISlotViewModel } from "../../model/slotViewModel";
import * as ReactGridLayout from "../../modified_node_modules/react-grid-layout";
import { Colors } from "../colors/colors";
import { StackPanel } from "../panels/stackPanel";
import { TimetableSummaryView } from "../timetableSummaryView";
import { GenerateSlotViewsAndDayColumn } from "./generateSlotViewsAndDayColumn";
import { GenerateStateViews } from "./generateStateView";
import { ISkeleton, Skeleton } from "./skeleton";
import { ArcherContainer } from "react-archer";

const getTimetableViewWidth = () => 0.9 * window.innerWidth;

interface ITimetableViewProps {
  slots: ISlotViewModel[];
  stcBoxes: STCBox[] | null;
  alternateSlots: ISlotViewModel[] | null;
  isShowingAlternativeSlots: boolean;
  isShowingAlternativeSlotOf: ISlotViewModel | null;
  handleSetTimeContraintAt: (state: STCBox) => void;
  handleDesetTimeContraintAt: (state: STCBox) => void;
  handleToggleIsOpenOfSummary: () => void;
  handleSelectSlotChoice: (slotUid: number, newSlotChoice: number) => void;
  handleShowAlternateSlot: (s: ISlotViewModel) => void;
  handleGoToThisAlternateSlot: (
    sourceSloutUid: number,
    destinationSlotUid: number
  ) => void;
  isSummaryOpen?: boolean;
}

interface ITimetableViewState {
  width: number;
}

/* This component have two purpose
 *  1. To render TimetableView
 *  2. To render SetTimeConstraintView
 */
export class TimetableView extends React.Component<
  ITimetableViewProps,
  ITimetableViewState
> {
  public constructor(props: ITimetableViewProps) {
    super(props);
    this.state = {
      width: getTimetableViewWidth(),
    };
  }
  public render() {
    const skeleton = new Skeleton();
    if (this.props.slots && this.props.alternateSlots) {
      // render timetable view
      const slotViewsAndDayColumn = GenerateSlotViewsAndDayColumn(
        this.props.slots.concat(this.props.alternateSlots),
        this.props.handleSelectSlotChoice,
        this.props.handleGoToThisAlternateSlot,
        this.props.handleShowAlternateSlot,
        this.props.isShowingAlternativeSlotOf
      );
      skeleton.Concat(slotViewsAndDayColumn);
      const horizontalDividers = GenerateHorizontalDividers(skeleton);
      skeleton.Concat(horizontalDividers);
    }
    if (this.props.stcBoxes) {
      // render set time constraint view
      const stateViews = GenerateStateViews(
        this.props.stcBoxes,
        this.props.handleSetTimeContraintAt,
        this.props.handleDesetTimeContraintAt
      );
      skeleton.Concat(stateViews);
      skeleton.Layouts = skeleton.Layouts.concat(GetStandardDayColumnLayout());
    }
    const divStyle: React.CSSProperties = {
      backgroundColor: Colors.WhiteSmoke,
      borderStyle: "solid",
      borderWidth: "1px",
      borderRadius: "5px",
      fontFamily: "roboto",
      margin: "auto",
      position: "relative",
      width: this.state.width,
    };
    const buttonStyle: React.CSSProperties = {
      bottom: "0",
      fontSize: "12px",
      position: "absolute",
      right: "0",
    };
    return (
      <div id="timetable-view" style={{ padding: "12px 0", display: "grid" }}>
        {/* Tippy css */} <link rel="stylesheet" href="tippy.css" />
        <div style={{ display: "grid", gridGap: "12px" }}>
          <div style={divStyle}>
            <ArcherContainer
              strokeColor="red"
              arrowLength={0}
              arrowThickness={0}
            >
              <ReactGridLayout
                cols={(TimePeriod.Max.Hour - TimePeriod.Min.Hour) * 2 + 2}
                maxRows={50}
                rowHeight={50}
                width={this.state.width}
                layout={skeleton.Layouts}
                margin={[0, 0]}
                isDraggable={false}
                isResizable={false}
                autoSize={true}
                verticalCompact={false}
              >
                {skeleton.Children}
              </ReactGridLayout>
            </ArcherContainer>
            {this.props.slots.length > 0 ? (
              <Button
                id="summary-btn"
                variant="contained"
                style={buttonStyle}
                onClick={this.props.handleToggleIsOpenOfSummary}
              >
                {this.props.isSummaryOpen ? "hide summary" : "show summary"}
              </Button>
            ) : null}
          </div>
          {this.props.isSummaryOpen && (
            <TimetableSummaryView slots={this.props.slots} />
          )}
        </div>
      </div>
    );
  }
  public componentDidMount() {
    this.previousOnResizeHandler = window.onresize;
    window.onresize = this.handleWindowResizing;
  }

  public componentWillUnmount() {
    // This is needed to fix issue #133
    // Refer https://github.com/wongjiahau/ttap-web/issues/133
    window.onresize = this.previousOnResizeHandler;
  }

  public handleWindowResizing = () => {
    this.setState({ width: getTimetableViewWidth() });
  };

  private previousOnResizeHandler: any = () => {};
}

export const GetStandardDayColumnLayout = (): ReactGridLayout.Layout[] => {
  const result = Array<ReactGridLayout.Layout>();
  const NUMBER_OF_DAY_PER_WEEK = 7;
  for (let j = 0; j <= NUMBER_OF_DAY_PER_WEEK; j++) {
    result.push({
      h: 1,
      i: "d" + j,
      w: 2,
      x: 0,
      y: j,
    });
  }
  return result;
};

export const GenerateHorizontalDividers = (skeleton: ISkeleton): ISkeleton => {
  const getDivider = (layoutId: string) => {
    const dividerStyle: React.CSSProperties = {
      borderBottom: "1px dotted #666",
      width: "100%",
    };
    return <div key={layoutId} style={dividerStyle} />;
  };
  const dividers: JSX.Element[] = [];
  for (let i = 1; i <= 6; i++) {
    dividers.push(getDivider("divider" + i));
  }
  const dividersLayouts: ReactGridLayout.Layout[] = [];
  for (let i = 1; i <= 6; i++) {
    dividersLayouts.push({
      ...skeleton.Layouts.filter((x) => x.i === "d" + i)[0],
      i: "divider" + i,
      w: (TimePeriod.Max.Hour - TimePeriod.Min.Hour) * 2,
      x: 2,
    });
  }
  return {
    Children: dividers,
    Layouts: dividersLayouts,
  };
};

/*
Note: For the horizontal borders to work, the synchronizeLayoutWithChildren function of ReactGirdLayout must be disabled,
It can be disabled by returning the initialLayout directly
in utils.js of ReactGridLayout folder
*/
