import * as React from "react";
import * as ReactGridLayout from "react-grid-layout";
import { ParseDay } from "../../att/day";
import { TimePeriod } from "../../att/timePeriod";
import { RawSlot } from "../../model/rawSlot";
import { GenerateColorScheme } from "../colors/generateColorScheme";
import { SlotView } from "../slotView";
import { ISkeleton, Skeleton } from "./skeleton";

export function GenerateSlotViews(rawSlots : RawSlot[]) : ISkeleton {
    const colorSchemes = GenerateColorScheme(rawSlots);
    const slotViews = rawSlots.map((x, index) => {
        const color = colorSchemes.filter((c) => c.SubjectCode === x.SubjectCode)[0].Color;
        return (
            <div key={"s" + index}><SlotView slot={x} color={color}/></div>
        );
    });
    const slotLayouts = rawSlots.map((x, index) => {
        return GetSlotLayout(x, "s" + index, Skeleton.X_OFFSET, Skeleton.Y_OFFSET);
    });
    return {Children: slotViews, Layouts: slotLayouts};
}

export function GetSlotLayout(rawSlot : RawSlot, index : string, xOffset : number, yOffset : number) : ReactGridLayout.Layout {
    const day = ParseDay(rawSlot.Day) - 1;
    const [X,
        W] = GetXandW(TimePeriod.Parse(rawSlot.TimePeriod));
    const result: ReactGridLayout.Layout = {
        h: 1,
        i: index,
        w: W,
        x: X + xOffset,
        y: day + yOffset
    };
    return result;
}

export function GetXandW(timePeriod : TimePeriod) : [number, number] {
    let x = (timePeriod.StartTime.Hour - TimePeriod.Min.Hour) * 2;
    if (timePeriod.StartTime.Minute === 30) {
        x++;
    }
    const w = timePeriod
        .EndTime
        .Minus(timePeriod.StartTime)
        .TotalHours() * 2;
    return [x, w];
}
