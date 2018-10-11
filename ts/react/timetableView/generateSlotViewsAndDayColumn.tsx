const sortBy = require("lodash.sortby");
import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
import {ParseDay} from "../../att/day";
import {TimePeriod} from "../../att/timePeriod";
import { ISlotViewModel } from "../../model/slotViewModel";
import { Colors } from "../colors/colors";
import {GenerateColorScheme} from "../colors/generateColorScheme";
import {SlotView, ISlotViewProps} from "../slotView";
import { GenerateSlotAndDayLayouts } from "./generateSlotAndDayLayouts";
import {ISkeleton, Skeleton} from "./skeleton";
import { DragSource, DropTarget, ConnectDragSource, ConnectDragPreview } from "react-dnd";

export function GenerateSlotViewsAndDayColumn(
    slots : ISlotViewModel[],
    selectSlotChoiceHandler: (slotUid : number, newSlotChoice : number) => void,
    goToThisAlternativeSlotHandler: (slotUid: number) => void,
    toggleAlternativeSlotsHandler: (s: ISlotViewModel, show: boolean) => void,
) : ISkeleton {
    const colorSchemes = GenerateColorScheme(slots);
    slots = sortBy(slots, [(o) => ParseDay(o.Day)]);
    const slotViews = slots.map((x, index) => {
        const color =
            x.IsAlternativeSlot ? 
            Colors.White :
            colorSchemes.filter((c) => c.SubjectCode === x.SubjectCode)[0].Color;
        
        const Layout = 
            x.IsAlternativeSlot ? DroppableSlotViewLayout :
            x.AlternativeSlots.length > 0 ? DraggableSlotViewLayout :
            NormalSlotViewLayout;
        
        return (
            <div key={"s" + index}>
                <Layout
                    goToThisAlternateSlot={() => goToThisAlternativeSlotHandler(x.Uid)}
                    toggleAlternateSlots={() => toggleAlternativeSlotsHandler(x)}
                    >
                    <SlotView
                        slot={x}
                        color={color}
                        handleSelectSlotChoice={selectSlotChoiceHandler}
                        handleShowAlternativeSlots={() => toggleAlternativeSlotsHandler(x, true)}
                        handleHideAlternativeSlots={() => toggleAlternativeSlotsHandler(x, false)}
                        />
                </Layout>
            </div>
        );
    });
    const layouts = GenerateSlotAndDayLayouts(slots, Skeleton.X_OFFSET, Skeleton.Y_OFFSET);
    const slotAndDayLayouts = layouts[0].concat(layouts[1]);
    return {Children: slotViews, Layouts: slotAndDayLayouts};
}


// React Draggable

export const SlotViewTypes = {
  DRAGGABLE: 'draggable'
};

const dragHandler = {
    beginDrag(props) {
        // props.toggleAlternateSlots();
        return {};
    },
    endDrag(props) {
        if(!DROPPED) { // if user not dropping it into alternative slots, then hide those alternative slots
            // props.toggleAlternateSlots();
        } else {
            DROPPED = false;
        }
        return {};
    }
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export const DraggableSlotViewLayout = DragSource(SlotViewTypes.DRAGGABLE, dragHandler, dragCollect)
(class extends React.Component<{
    connectDragSource: ConnectDragSource,
    isDragging: boolean
},{}> {
    public render() {
        const { connectDragSource, isDragging } = this.props;
        return connectDragSource(
            <div>
                {this.props.children}
            </div>
        );
    }
});

let DROPPED = false;

// drop target
export const dropHandler = {
  drop(props) {
    props.goToThisAlternateSlot();
    DROPPED = true;
  }
};

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

export const DroppableSlotViewLayout = DropTarget(SlotViewTypes.DRAGGABLE, dropHandler, dropCollect)
(class extends React.Component<{
    connectDropTarget: ConnectDragPreview,
    isOver: boolean
},{}>{
    public render() {
        const { connectDropTarget, isOver } = this.props;
        const style: React.CSSProperties = !isOver ? {} : {
            backgroundColor: "yellow",
            opacity: 0.5,
            zIndex: 1,
        };
        return connectDropTarget(<div style={style}>
            {this.props.children}
        </div>);
    }
});

class NormalSlotViewLayout extends React.Component {
    public render() {
        return this.props.children;
    }
}