#!/bin/bash

PENDING_QUEUE="queue/pending.json"
RUNNING_QUEUE="queue/running.json"
COMPLETED_QUEUE="queue/completed.json"
LOG_FILE="logs/execution.log"

echo "SOLAR WORKER STARTED"

while true
do
  echo "Checking pending queue..."
  date

  if grep -q "TASK-" "$PENDING_QUEUE"; then

    TASK=$(grep -o 'TASK-[0-9]*' "$PENDING_QUEUE" | head -n 1)

    echo "Processing $TASK"

    echo "$(date) | TASK DETECTED | $TASK" >> "$LOG_FILE"

    echo "[ \"$TASK\" ]" > "$RUNNING_QUEUE"

    echo "[]" > "$PENDING_QUEUE"

    echo "$TASK moved to RUNNING"

    echo "$(date) | TASK RUNNING | $TASK" >> "$LOG_FILE"

    sleep 5

    echo "[ \"$TASK\" ]" > "$COMPLETED_QUEUE"

    echo "[]" > "$RUNNING_QUEUE"

    echo "$TASK moved to COMPLETED"

    echo "$(date) | TASK COMPLETED | $TASK" >> "$LOG_FILE"

  else
    echo "No tasks found"
  fi

  sleep 10
done
