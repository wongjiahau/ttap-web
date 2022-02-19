import * as React from "react";
import { StackPanel } from "./stackPanel";
export const StackPanelProofOfConcept = () => {
  return (
    <div>
      <StackPanel
        style={{
          margin: "5px",
        }}
        orientation="horizontal"
      >
        <button>hello</button>
        <button>bye</button>
      </StackPanel>
      <StackPanel orientation="vertical">
        <p>vertical orientation</p>
        <button>hello</button>
        <button>bye</button>
      </StackPanel>
      <StackPanel orientation="horizontal" horizontalAlignment="right">
        <p>right aligned</p>
        <button>hello</button>
        <button>bye</button>
      </StackPanel>
      <StackPanel orientation="horizontal" horizontalAlignment="center">
        <p>center aligned</p>
        <button>hello</button>
        <button>bye</button>
      </StackPanel>
      <StackPanel orientation="horizontal" horizontalAlignment="left">
        <p>Left aligned</p>
        <button>hello</button>
        <button>bye</button>
      </StackPanel>
    </div>
  );
};
