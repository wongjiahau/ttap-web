#!/bin/bash 
# Clear the screen
clear 

# Clean the output directory
echo "Cleaning output directory . . ."
rm -r src/core*

# Transpile TS into JS
ts_compiler_version=$(tsc -v)
echo "Transpling TypeScript files into JavaScript (using TSCompiler $ts_compiler_version ). . . "
output=$(tsc -p ./ts/tsconfig.json)

# Check if output contain error
if [[ $output == *"error"* ]]; 
then
    echo -e "\e[31mBuild failed due to the following errors: "
    echo "$output"
else # Signify success
    echo -e "\e[32m "
    echo "███████╗ ██╗   ██╗  ██████╗  ██████╗ ███████╗ ███████╗ ███████╗ ██╗"
    echo "██╔════╝ ██║   ██║ ██╔════╝ ██╔════╝ ██╔════╝ ██╔════╝ ██╔════╝ ██║"
    echo "███████╗ ██║   ██║ ██║      ██║      █████╗   ███████╗ ███████╗ ██║"
    echo "╚════██║ ██║   ██║ ██║      ██║      ██╔══╝   ╚════██║ ╚════██║ ╚═╝"
    echo "███████║ ╚██████╔╝ ╚██████╗ ╚██████╗ ███████╗ ███████║ ███████║ ██╗"
    echo "╚══════╝  ╚═════╝   ╚═════╝  ╚═════╝ ╚══════╝ ╚══════╝ ╚══════╝ ╚═╝"
    echo -e "\e[39mThe output files are located at: \e[35m src/core"
    echo -e "\e[39mTo run unit test, type: \e[33m npm run test"
    echo -e "\e[39mTo edit the build output, edit \e[34m transpile.sh"
    echo " "
fi


# Refer the following link for colors and formatting in bash
# https://misc.flogisoft.com/bash/tip_colors_and_formatting

