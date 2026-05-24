#!/bin/bash

TASK_FILE=$1
ALLOWED_FILE="security/allowed-commands.txt"

echo "CLAUDE CONNECTOR ACTIVATED"
echo "Processing task file: $TASK_FILE"

cat "$TASK_FILE"

echo "Executing safe action..."

grep '"' "$TASK_FILE" | while read -r line
do
  COMMAND=$(echo "$line" | sed 's/[",]//g' | xargs)
  
  if [[ "$COMMAND" == actions:* ]] || [[ "$COMMAND" == logs:* ]]; then
  continue
fi

  BASE_COMMAND=$(echo "$COMMAND" | awk '{print $1}')

  if grep -qx "$BASE_COMMAND" "$ALLOWED_FILE"; then

    echo "ALLOWED: $COMMAND"

    eval "$COMMAND"

  else

    echo "BLOCKED COMMAND: $COMMAND"

  fi
done

echo "Claude execution simulation complete"
