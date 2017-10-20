import * as React from "react";
import {CreateTimetableView} from "./createTimetableView";
import {Login} from "./login";
import RawSlot from "../model/rawSlot";
import ParseSlotToSubject from "../parser/parseSlotToSubject";

export interface IBodyStates {
    IsSlotLoaded : boolean;
    AllSlots : RawSlot[];
}
export class Body extends React.Component < {},
IBodyStates > {
    constructor(props) {
        super(props);
        this.state = {
            IsSlotLoaded: false,
            AllSlots: null
        };
    }
    public render() {
        const result = this.state.IsSlotLoaded
            ? <CreateTimetableView allSubjects={ParseSlotToSubject(this.state.AllSlots)}/>
            : <Login notifyDataLoaded={this.notifyDataLoaded}/>
        return result;
    }
    notifyDataLoaded = (loadedSlots : RawSlot[]) => {
        this.setState({AllSlots: loadedSlots, IsSlotLoaded: true});
    }
}
