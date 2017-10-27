import * as React from "react";
import {RawSlot} from "../model/rawSlot";
import ParseSlotToSubject from "../parser/parseSlotToSubject";
import {Login} from "./login";
import {TimetableCreatorView} from "./timetableCreatorView";

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
            ? <TimetableCreatorView handleToggleVisibilityOfSubjectListView={null} isSubjectListViewVisible={true}/>
            : <Login notifyDataLoaded={this.notifyDataLoaded}/>;
        return result;
    }
    public notifyDataLoaded = (loadedSlots : RawSlot[]) => {
        this.setState({AllSlots: loadedSlots, IsSlotLoaded: true});
    }
}
