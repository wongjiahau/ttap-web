#Clean the output directory
rm -r src/core*

#This is the script to transpile TS into JS
tsc -p ./ts/tsconfig.json
