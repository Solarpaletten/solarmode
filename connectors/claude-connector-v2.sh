#!/bin/bash

TASK_FILE=$1

echo "CLAUDE CONNECTOR ACTIVATED"
echo "Processing task file: $TASK_FILE"

cat "$TASK_FILE"

echo "Executing safe action..."

grep 'echo ' "$TASK_FILE" | while read -r line
do
  COMMAND=$(echo "$line" | sed 's/[",]//g' | xargs)

  echo "Running: $COMMAND"

  eval "$COMMAND"
done

echo "Claude execution simulation complete"
