import * as React from "react";
import {RawSlot} from "../model/rawSlot";
import { TimetableCreatorContainer } from "../redux/containers/timetableCreatorContainer";
import {Login} from "./login";
import {TimetableCreatorView} from "./timetableCreatorView";

export interface IMainFrameStateProps {
    IsSlotLoaded : boolean;
}

export interface IMainFrameDispatchProps {
    handleSlotLoaded : (rawSlots : RawSlot[]) => void;

}

interface IMainFrameViewProps extends IMainFrameStateProps,
IMainFrameDispatchProps {}

export class MainFrame extends React.Component < IMainFrameViewProps, {} > {
    constructor(props) {
        super(props);
    }
    public render() {
        const result = this.props.IsSlotLoaded
            ? <TimetableCreatorContainer/>
            : <Login notifyDataLoaded={this.props.handleSlotLoaded}/>;
        return result;
    }
}
