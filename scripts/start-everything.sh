#!/bin/bash
if [ -z "$TMUX" ]; then 
    echo "ERROR : You can only run this script in a Tmux session.";
    echo "You can go into a tmux session by typing the command 'tmux'"
    exit 1
fi
tmux split-window -h
tmux select-pane -t 0
tmux split-window -v
tmux send-keys -t 0 "./scripts/watch" C-m
sleep 7
tmux send-keys -t 1 "npm run start" C-m
sleep 7
tmux send-keys -t 2 "npm run test" C-m 