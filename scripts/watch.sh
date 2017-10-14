# This script is to launch typescript compiler in watch mode
# When this mode is turn on,
# when you have changed a file and saved it,
# it will automatically recompile the changed file only
# so running in WATCH mode will speed up the compile process
tsc -p ./ts/tsconfig.json --watch 