import Dialog from "material-ui-next/Dialog";
import Slide from "material-ui-next/transitions/Slide";
import * as React from "react";
import {State} from "../model/states/state";

const myStyle : React.CSSProperties = {
    // props
};

export interface ISetTimeConstraintViewStateProps {
    totalState : State[];
    IsOpen : boolean;
}

export interface ISetTimeConstraintViewDispatchProps {
    handleSetTimeConstraintAt : (state : State) => void;
}

interface ISetTimeConstraintViewProps extends ISetTimeConstraintViewStateProps,
ISetTimeConstraintViewDispatchProps {}

function Transition(props) {
    return <Slide direction="up" {...props}/>;
}

export class SetTimeConstraintView extends React.Component < ISetTimeConstraintViewProps, {} > {
    public render() {
        return (
            <div>
                <Dialog
                    open={this.props.IsOpen}
                    fullScreen={true}
                    transition={Transition}>
                    Hello
                </Dialog>
            </div>
        );
    }

    public componentDidMount() {}
}
