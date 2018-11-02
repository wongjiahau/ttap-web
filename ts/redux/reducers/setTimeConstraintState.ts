import {
    STCBox
} from "../../model/matrix/stcBox";

export interface ISetTimeConstraintState {
    ClickedTimeConstraint: number[ /*7*/ ];
    IsOpen:                boolean;
    TotalMatrix:            STCBox[];
    UidsOfClickedBoxes:    string[];
}

export function NewSetTimeConstraintState(totalState: STCBox[]) : ISetTimeConstraintState {
    return {
        ClickedTimeConstraint : [0, 0, 0, 0, 0, 0, 0],
        IsOpen: false,
        TotalMatrix: totalState,
        UidsOfClickedBoxes: []
    };
}
