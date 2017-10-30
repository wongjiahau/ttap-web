#!/bin/node
 //To use the hashbang above, you need to copy node.exe into
// C:\Program Files\Git\usr\bin
const shell = require('shelljs');
const prompt = require('prompt-sync')();
const targetDir = `${__dirname}/../ts/redux/reducers/`;
const fs = require('fs');
const decapitalized = (input) => {
    return input.charAt(0).toLowerCase() + input.slice(1);
}

const stateName = prompt("Enter the name of the state >> ");

//#region snippet
const snippet =
    `
import * as typeName from "type-name";
import {ActionGenerator} from "../actions/actionGenerator";
import {GenereteReducer} from "./generateReducer";

export interface I${stateName} {
    // properties...
}

export class ${stateName} implements I${stateName} {
    public constructor() {
        // initialization
    }
}

export abstract class ${stateName}ActionGenerator extends ActionGenerator < I${stateName} > {
    public StateName() {
        return typeName(new ${stateName}());
    }
}

export const ${stateName}Reducer = GenereteReducer(new ${stateName}());
`;
//#endregion

const fileName = targetDir + decapitalized(stateName) + ".ts";

fs.writeFile(fileName, snippet, function(err) {
    if(err) {
        return console.log(err);
    }
    shell.exec(`code ${fileName}`);
    console.log(`${fileName} is opened in VSCode`);
}); 

