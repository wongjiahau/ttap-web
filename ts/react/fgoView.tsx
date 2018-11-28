import Button from "material-ui/Button";
import * as React from "react";
import { Redirect } from "react-router";
import { RawSlot } from "../model/rawSlot";
import { ParseFgoHtmlToRawSlot } from "../parser/parseFgoHtmlToRawSlot";
import { ToggleLoadingScreen } from "./app";
import { StackPanel } from "./panels/stackPanel";
import { VerticalAlign } from "./panels/verticalAlign";

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
                    <Button color="primary" raised={true} onClick={() => {
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
