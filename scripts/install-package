#!/bin/bash
package_name=$1

npm install $1 --save

npm install @types/$1 --save-dev

#View the diff file of package.json
git difftool --tool=vimdiff -y ./package.json
