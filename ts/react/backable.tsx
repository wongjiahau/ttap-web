import * as React from "react";
import {StackPanel} from "./panels/stackPanel";

export class Backable extends React.Component {
    public render() {
        const childCount = React.Children.count(this.props.children);
        if (childCount > 1) {
            throw new Error("Backable can only receive one child.");
        }
        return (
            <StackPanel orientation="vertical" horizontalAlignment="center">
                {this.props.children}
                <a href="#"
                    onClick={() => { window.history.back(); }}>
                    click here to go back
                </a>
            </StackPanel>
        );
    }
}
