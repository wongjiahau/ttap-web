#!/bin/node
//To use the hashbang above, you need to copy node.exe into
// C:\Program Files\Git\usr\bin
const shell = require("shelljs");
const prompt = require("prompt-sync")();
const targetDir = `${__dirname}/../ts/redux/reducers/`;
const fs = require("fs");
const decapitalized = (input) => {
  return input.charAt(0).toLowerCase() + input.slice(1);
};

const viewName = prompt("Enter name of the view (e.g. UserView): ");
const viewSnippet = `
import * as React from "react";
const myStyle : React.CSSProperties = {
    // props 
};

export interface I${viewName}StateProps {
    // props
}

export interface I${viewName}DispatchProps {
    // functions
}

interface I${viewName}Props extends I${viewName}StateProps,
I${viewName}DispatchProps {}

export class ${viewName} extends React.Component < I${viewName}Props, {} > {
    public render() {
        return (
            <div>

            </div>
        );
    }

    public componentDidMount() {
        
    }
}
`;
const viewFileName = `${__dirname}/../ts/react/${decapitalized(viewName)}.tsx`;
fs.writeFile(viewFileName, viewSnippet, function (err) {
  if (err) {
    return console.log(err);
  }
  shell.exec(`code ${viewFileName}`);
  console.log(`${viewFileName} is opened in VSCode!`);
});

const containerSnippet = `
import {connect} from "react-redux";
import {I${viewName}DispatchProps, I${viewName}StateProps, ${viewName}} from "../../react/${decapitalized(
  viewName
)}";

const mapStateToProps = (state) : I${viewName}StateProps => {
    // example : return {IsSlotLoaded: state.MainFrameReducer.IsSlotLoaded};
};

const mapDispatchToProps = (dispatch) : I${viewName}DispatchProps => {
    return {
        // example : 
        // handleSlotLoaded: (rawSlots : RawSlot[]) => {
        //     dispatch(new SetSubjects(ParseSlotToSubject(rawSlots)).Action());
        // }
    };
};

export const ${viewName}Container = connect(mapStateToProps, mapDispatchToProps)(${viewName});

`;

const containerFileName = `${__dirname}/../ts/redux/containers/${decapitalized(
  viewName
)}Container.ts`;
fs.writeFile(containerFileName, containerSnippet, function (err) {
  if (err) {
    return console.log(err);
  }
  shell.exec(`code ${containerFileName}`);
  console.log(`${containerFileName} is opened in VSCode!`);
});
