import {Button, Typography} from "material-ui";
import * as React from "react";
import {Redirect} from "react-router";
import {StackPanel} from "./panels/stackPanel";
import {VerticalAlign} from "./panels/verticalAlign";

interface IGetStartedState {
    redirect : boolean;
}
export class GetStarted extends React.Component < {},
IGetStartedState > {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect push={true} to="/learn"/>;
        } else {
            return (
                <VerticalAlign>
                    <StackPanel orientation="vertical" horizontalAlignment="center">
                        <Typography type="display3">Welcome to TTAP!</Typography>
                        <Button raised={true} color="secondary" onClick={this.handleClick}>
                            Get Started
                        </Button>
                    </StackPanel>
                </VerticalAlign>
            );
        }
    }

    private handleClick = () => {
        this.setState({redirect: true});
    }
}
