import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
import {
    ColorOfClicked,
    ColorOfDefinitelyOccupied,
    ColorOfDefinitelyUnoccupied,
    ColorOfMaybeOccupied,
    StateKind,
    STCBox
} from "../../model/states/stcBox";
import {Colors} from "../colors/colors";
import {ISkeleton, Skeleton} from "./skeleton";

export function GenerateStateViews(states : STCBox[], handleSetTimeContraintAt : (state : STCBox) => void, handleDesetTimeConstraintAt : (state : STCBox) => void) : ISkeleton {
    const GetStateView = (state : STCBox) => {
        switch (state.Kind) {
            case StateKind.DefinitelyOccupied:
                return (<Box color={ColorOfDefinitelyOccupied}/>);
            case StateKind.DefinitelyUnoccupied:
                return (<Box color={ColorOfDefinitelyUnoccupied}/>);
            case StateKind.MaybeOccupied:
                return (<MaybeOccupiedBox
                    handleClick={() => { handleSetTimeContraintAt(state); }}/>);
            case StateKind.Clicked:
                return (<ClickedBox
                    handleClick={() => { handleDesetTimeConstraintAt(state); }}/>);
            default:
                throw Error();
        }
    };
    const child = [];
    const layouts = new Array < ReactGridLayout.Layout > ();
    states.forEach((s) => {
        const content = GetStateView(s);
        const key = s
            .Uid
            .toString();
        child.push(
            <div key={key}>{content}</div>
        );
        layouts.push({
            i: key,
            x: s.X + Skeleton.X_OFFSET,
            y: s.Day + Skeleton.Y_OFFSET,
            h: 1,
            w: 1
        });
    });

    // append extra boxes at the front to make the view looks normal
    for (let day = 0; day < 7; day++) {
        for (let x = 0; x < 2; x++) {
            const key = "e" + day.toString() + x.toString(); // e means extraneous
            child.push(
                <div key={key}><Box color={ColorOfDefinitelyUnoccupied}/></div>
            );
            layouts.push({
                i: key,
                x: x + Skeleton.X_OFFSET - 2,
                y: day + Skeleton.Y_OFFSET,
                h: 1,
                w: 1
            });
        }
    }
    return {Children: child, Layouts: layouts};
}

const boxFrameStyle : React.CSSProperties = {
    height: "49px",
    width: "100%",
    borderTop: "1px solid grey"
};
const Box = (props : {
    color: Colors
}) => {
    const style : React.CSSProperties = {
        ...boxFrameStyle,
        background: props.color
    };
    return (<div style={style}/>);
};

const MaybeOccupiedBox = (props : {
    handleClick: () => void
}) => {
    const style = {
        ...boxFrameStyle,
        background: ColorOfMaybeOccupied
    };
    return (<button onClick={props.handleClick} style={style}/>);
};
const ClickedBox = (props : {
    handleClick: () => void
}) => {
    const style : React.CSSProperties = {
        ...boxFrameStyle,
        background: ColorOfClicked,
        fontWeight: "bold",
        fontSize: "20px"
    };
    return (
        <button onClick={props.handleClick} style={style}>X</button>
    );
};
