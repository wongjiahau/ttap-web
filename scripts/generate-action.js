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
        if (S(w).contains("ActionGenerator")) {
            result.push(w);
        }
    })
})
result = result.filter((s) => s != "ActionGenerator" && s != "{ActionGenerator}");
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
const fileName = stateName.charAt(1).toLowerCase() + stateName.slice(2);
const actionName = prompt("Enter name of the action : ");
const fileSnippet = 
`
import {${stateName}, ${parentClass}} from "./../reducers/${fileName}";
export class ${actionName} extends ${parentClass} {
    public constructor() {
        super();
    }
    public TypeName() : string {return "${actionName}"; }
    protected GenerateNewState(state : ${stateName}) : ${stateName} {
        return {
            ...state,
            // your code here
        };
    }
}
`;

fs.writeFile(`${__dirname}/../ts/redux/actions/${actionName}.ts`, fileSnippet, function(err) {
    if(err) {
        return console.log(err);
    }
    shell.exec(`code ts/redux/actions/${actionName}.ts`);
    console.log(`${actionName}.ts is opened in VSCode!`);
}); 

const testSnippet = 
`import {expect} from "chai";
import {isEqual} from "lodash";
import {${actionName}} from "./../actions/${actionName}";
import {${stateName}, ${stateName.slice(1)}Reducer, ${stateName.slice(1)}} from "./../reducers/${fileName}";
describe("${actionName} action", () => {
    it("should . . .", () => {
    });
});
`;

fs.writeFile(`${__dirname}/../ts/redux/tests/${actionName}.test.ts`, testSnippet, function(err) {
    if(err) {
        return console.log(err);
    }
    shell.exec(`code ts/redux/tests/${actionName}.test.ts`);
    console.log(`${actionName}.test.ts is opened in VSCode!`);
}); 

