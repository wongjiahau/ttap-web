import {Button, Typography} from "@material-ui/core";
import IconList from "@material-ui/icons/PlayArrow";
import * as React from "react";
import {Redirect} from "react-router";
import {StackPanel} from "./panels/stackPanel";
import {VerticalAlign} from "./panels/verticalAlign";
import {iconStyle} from "./styles";

interface IGetStartedState {
    redirect : boolean;
}
export class GetStarted extends React.Component < {},
IGetStartedState > {
    constructor(props: {}) {
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
                        <img src={(window as any)["PUBLIC_URL"] + "/big_calendar.png"}/>
                        <Typography variant="display3">Welcome to TTAP!</Typography>
                        <Button variant="contained" color="secondary" onClick={this.handleClick}>
                            <IconList style={iconStyle}/>
                            Get started
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
