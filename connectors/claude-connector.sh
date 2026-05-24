#!/bin/bash

TASK_FILE=$1
ALLOWED_FILE="security/allowed-commands.txt"

echo "CLAUDE CONNECTOR ACTIVATED"
echo "Processing task file: $TASK_FILE"

cat "$TASK_FILE"

echo "Executing safe actions..."

jq -r '.actions[]' "$TASK_FILE" | while read -r COMMAND
do

  BASE_COMMAND=$(echo "$COMMAND" | awk '{print $1}')

  if grep -qx "$BASE_COMMAND" "$ALLOWED_FILE"; then

    echo "ALLOWED: $COMMAND"

    eval "$COMMAND"

  else

    echo "BLOCKED COMMAND: $COMMAND"

  fi

done

echo "Claude execution simulation complete"
