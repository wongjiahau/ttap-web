import * as React from "react";
import {StackPanel} from "./stackPanel";
export const StackPanelProofOfConcept = () => {
    return (
        <div>
            <StackPanel
                style={{
                margin: "5px"
            }}
                orientation="horizontal">
                <button>hello</button>
                <button>bye</button>
            </StackPanel>
            <StackPanel orientation="vertical">
                <button>hello</button>
                <button>bye</button>
            </StackPanel>
        </div>
    );
};
