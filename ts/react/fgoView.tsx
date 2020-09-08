import Button from "@material-ui/core/Button";
import * as React from "react";
import { Redirect } from "react-router";
import { RawSlot } from "../model/rawSlot";
import { ParseFgoHtmlToRawSlot_v1 } from "../parser/parseFgoHtmlToRawSlot";
import { ParseFgoHtmlToRawSlot_v2 } from "../parser/parseFgoHtmlToRawSlot_v2";
import { ToggleLoadingScreen } from "./app";
import { StackPanel } from "./panels/stackPanel";
import { VerticalAlign } from "./panels/verticalAlign";

const ParseFgoHtmlToRawSlot = (() => {
    const currentYear = new Date().getFullYear()
    if(currentYear > 2019) {
        console.log('Using ParseFgoHtmlToRawSlot_v2')
        return ParseFgoHtmlToRawSlot_v2
    }
    else {
        console.log('Using ParseFgoHtmlToRawSlot_v1')
        return ParseFgoHtmlToRawSlot_v1
    }
})()

export interface IFgoViewDispatchProps {
    handleLoadSlot : (rawSlots : RawSlot[]) => void;
}

interface IFgoViewStateProps {
    redirect: boolean;
}

export class FgoView extends React.Component<IFgoViewDispatchProps, IFgoViewStateProps> {
    public constructor(props: IFgoViewDispatchProps) {
        super(props);
        this.state = {
            redirect: false
        };
    }
    public render() {
        if (this.state.redirect) {
            return <Redirect push={true} to="/play"/>;
        }
        return (
            <VerticalAlign>
                <StackPanel orientation="vertical" horizontalAlignment="center">
                    <textarea style={{height: "500px", width: "500px"}} id="fgotextarea" placeholder="Paste HTML here"/>
                    <Button color="primary" variant="contained" onClick={() => {
                        ToggleLoadingScreen("Parsing HTML", () => {
                            try {
                                const textarea = document.getElementById("fgotextarea") as HTMLTextAreaElement;
                                this.props.handleLoadSlot(ParseFgoHtmlToRawSlot(textarea.value));
                                this.setState({redirect: true});
                            } catch (error) {
                                alert("Error loading data: " + error.message);
                            }
                        });
                    }}>Load Data</Button>
                </StackPanel>
            </VerticalAlign>
        );
    }
}
