#!/bin/node
//To use the hashbang above, you need to copy node.exe into
// C:\Program Files\Git\usr\bin
const shell = require('shelljs');
const prompt = require('prompt-sync')();
const folder = '/../ts/redux/reducers/';
const fs = require('fs');
const S = require('string');
const files = fs.readdirSync(__dirname + folder);

let result = [];
files.forEach(function(file) {
    const contents = fs.readFileSync(__dirname + folder + file, 'utf8');
    const words = contents.split(" ");
    words.forEach((w) => {
        if(new Str(w).contains("Action")) {
            result.push(w);
        }
    })
})
result = result.filter((s) => s != "Action" && s != "{Action}");
console.log("Extend the action from which class ? \n");
result.forEach((s, i) => {
    console.log("\t" + i + ":" + s);
});

let parentClass;
while (true) {
    const userInput = parseInt(prompt("Select your choice : "));
    if (isNaN(userInput)|| (userInput < 0 || userInput > result.length - 1)) {
        console.log("invalid input")
        continue;
    }
    else {
        console.log("Your choice is : " + result[userInput]);
        parentClass = result[userInput];
        break;
    }
}
const stateName = "I" + parentClass.split("Action")[0];
const stateFileName = stateName.charAt(1).toLowerCase() + stateName.slice(2);
const actionName = prompt("Enter name of the action : ");
const typeName = actionName.match(/[A-Z][a-z]+/g).join(" ").toLowerCase();
const actionFileName = actionName.charAt(0).toLowerCase() + actionName.slice(1);
const fileSnippet = 
`
import {${stateName}, ${parentClass}} from "./../reducers/${stateFileName}";
export class ${actionName} extends ${parentClass} {
    public constructor() {
        super();
    }
    public TypeName() : string {return "${typeName}"; }
    protected GenerateNewState(state : ${stateName}) : ${stateName} {
        return {
            ...state,
            // your code here
        };
    }
}
`;

fs.writeFile(`${__dirname}/../ts/redux/actions/${actionFileName}.ts`, fileSnippet, function(err) {
    if(err) {
        return console.log(err);
    }
    shell.exec(`code ts/redux/actions/${actionFileName}.ts`);
    console.log(`${actionFileName}.ts is opened in VSCode!`);
}); 

const testSnippet = 
`import {expect} from "chai";
const isEqual = require("lodash.isequal");
import {${actionName}} from "./../actions/${actionFileName}";
import {${stateName}, ${stateName.slice(1)}Reducer, ${stateName.slice(1)}} from "./../reducers/${stateFileName}";
describe("${actionName} action", () => {
    it("'s typename should be '${typeName}'", () => {
        const action = new ${actionName}();
        expect(action.TypeName()).to.eq("${typeName}");
    });

    it("should set ...", () => {
        const action = new ${actionName}().Action();
        const initialState = new ${stateName.slice(1)}();
        const newState = ${stateName.slice(1)}Reducer(initialState, action);
        expect(newState).to.eq("?");
    });
});
`;

fs.writeFile(`${__dirname}/../ts/redux/tests/_${actionFileName}.test.ts`, testSnippet, function(err) {
    if(err) {
        return console.log(err);
    }
    shell.exec(`code ts/redux/tests/_${actionFileName}.test.ts`);
    console.log(`_${actionFileName}.test.ts is opened in VSCode!`);
}); 

