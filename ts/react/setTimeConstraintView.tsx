import * as React from "react";
import { State } from "../model/states/state";
const myStyle : React.CSSProperties = {
    // props 
};

export interface ISetTimeConstraintViewStateProps {
    totalState: State[];
    isSetTimeConstraintDialogOpened: boolean;
}

export interface ISetTimeConstraintViewDispatchProps {
    handleSetTimeConstraintAt : (state: State) => void;
}

interface ISetTimeConstraintViewProps extends ISetTimeConstraintViewStateProps,
ISetTimeConstraintViewDispatchProps {}

export class SetTimeConstraintView extends React.Component < ISetTimeConstraintViewProps, {} > {
    public render() {
        return (
            <div>

            </div>
        );
    }

    public componentDidMount() {
        
    }
}
