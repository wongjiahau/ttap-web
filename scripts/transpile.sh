#!/bin/bash 
# Clear the screen
clear 

# Clean the output directory
rm -r src/core*

# Transpile TS into JS
output=$(tsc -p ./ts/tsconfig.json)

# Check if output contain error
if [[ $output == *"error"* ]]; 
then
    echo -e "\e[31mBuild failed due to the following errors: "
    echo "$output"
else # Signify success
    ts_compiler_version=$(tsc -v)
    echo "============================================================"
    echo -e "\e[32mSuccessfully transpiled TS into JS"
    echo -e "\e[39mUsing TypeScript compiler $ts_compiler_version"
    echo " "
    echo -e "\e[39mThe output files are located at:"
    echo -e "\e[35m    src/core"
    echo " "
    echo -e "\e[39mTo run unit test, type: "
    echo -e "\e[33m    npm run test"
    echo " "
    echo -e "\e[39mTo edit this build output, edit the following file"
    echo -e "\e[34m    transpile.sh"
    echo " "
fi

# Refer the following link for colors and formatting in bash
# https://misc.flogisoft.com/bash/tip_colors_and_formatting
