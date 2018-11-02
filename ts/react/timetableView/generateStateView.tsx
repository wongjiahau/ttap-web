import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
//@ts-ignore
import {Tooltip} from "react-tippy";
import {
    ColorOfClicked,
    ColorOfDefinitelyOccupied,
    ColorOfDefinitelyUnoccupied,
    ColorOfMaybeOccupied,
    MatrixKind,
    STCBox
} from "../../model/matrix/stcBox";
import {Colors} from "../colors/colors";
import {ISkeleton, Skeleton} from "./skeleton";

export function GenerateStateViews(states : STCBox[], handleSetTimeContraintAt : (state : STCBox) => void, handleDesetTimeConstraintAt : (state : STCBox) => void) : ISkeleton {
    const GetStateView = (state : STCBox) => {
        switch (state.Kind) {
            case MatrixKind.DefinitelyOccupied:
                return (<Box color={ColorOfDefinitelyOccupied}/>);
            case MatrixKind.DefinitelyUnoccupied:
                return (<Box color={ColorOfDefinitelyUnoccupied}/>);
            case MatrixKind.MaybeOccupied:
                return (<MaybeOccupiedBox
                    handleClick={() => { handleSetTimeContraintAt(state); }}/>);
            case MatrixKind.Clicked:
                return (<ClickedBox
                    handleClick={() => { handleDesetTimeConstraintAt(state); }}/>);
            default:
                throw Error();
        }
    };
    const child: JSX.Element[] = [];
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
    const style : React.CSSProperties = {
        ...boxFrameStyle,
        background: ColorOfMaybeOccupied,
        cursor: "pointer",
    };
    const html = <span style={{fontSize: "14px"}}>Click me if you don't want to have class here</span>;
    return (
        <Tooltip arrow={true} position="bottom" html={html}>
            <span className="maybeOccupiedBox">
                <button onClick={props.handleClick} style={style}/>
            </span>
        </Tooltip>
    );
};
const ClickedBox = (props : {
    handleClick: () => void
}) => {
    const style : React.CSSProperties = {
        ...boxFrameStyle,
        background: ColorOfClicked,
        fontWeight: "bold",
        fontSize: "20px",
        cursor: "pointer"
    };
    return (
        <button onClick={props.handleClick} style={style}>X</button>
    );
};
