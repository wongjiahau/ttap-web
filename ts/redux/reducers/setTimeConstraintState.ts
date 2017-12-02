import {
    STCBox
} from "../../model/states/stcBox";

export interface ISetTimeConstraintState {
    ClickedTimeConstraint: number[ /*7*/ ];
    IsOpen:                boolean;
    TotalState:            STCBox[];
    UidsOfClickedState:    string[];
}

export function NewSetTimeConstraintState(totalState: STCBox[]) : ISetTimeConstraintState {
    return {
        ClickedTimeConstraint : [0, 0, 0, 0, 0, 0, 0],
        IsOpen: false,
        TotalState: totalState,
        UidsOfClickedState: []
    };
}
