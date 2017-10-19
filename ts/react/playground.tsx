import * as React from "react";
import Slot from "../model/rawSlot";
import {SlotView} from "./slotView";
import {SubjectView} from "./subjectView";

export interface IPlaygroundProps {
    name: string;
    age: number;
}
export class Playground extends React.Component < IPlaygroundProps, {} > {
    public render() {
        const testSlot = new Slot();
        testSlot.SubjectName = "Test subject";
        testSlot.Room = "KB 204";
        testSlot.WeekNumber = "1-14";
        return (
            <div>
                <SlotView slot={testSlot}/>
                <SubjectView subjectName="Computer Ethics" subjectCode="MPK2134"/>
            </div>
        );
    }
}
