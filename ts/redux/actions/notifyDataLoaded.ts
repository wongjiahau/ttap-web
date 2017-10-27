import { isEqual } from "lodash";
import { RawSlot } from "../../model/rawSlot";
import { MainFrameStateActionGenerator } from "../reducers/mainFrameState";
import { IMainFrameState } from "./../reducers/mainFrameState";

export class NotifyDataLoaded extends MainFrameStateActionGenerator {
    public constructor(private slots : RawSlot[]) {
        super( );
    }
    public TypeName( ) : string { return "notify data loaded"; }
    protected GenerateNewState( state : IMainFrameState ) : IMainFrameState {
        return {
            ...state,
            IsDataLoaded: true
        };
    }
}
