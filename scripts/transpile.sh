#Clean the output directory
rm -r src/core*

#This is the script to transpile TS into JS
tsc -p ./ts/tsconfig.json

# Echo completion
echo "Successfully transpiled TS into JS"
echo "The output files are located at src/core"
