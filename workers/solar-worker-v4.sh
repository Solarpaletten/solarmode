#!/bin/bash

PENDING_QUEUE="queue/pending.json"
RUNNING_QUEUE="queue/running.json"
COMPLETED_QUEUE="queue/completed.json"

echo "SOLAR WORKER STARTED"

while true
do
  echo "Checking pending queue..."
  date

  if grep -q "TASK-" "$PENDING_QUEUE"; then

    TASK=$(grep -o 'TASK-[0-9]*' "$PENDING_QUEUE" | head -n 1)

    echo "Processing $TASK"

    echo "[ \"$TASK\" ]" > "$RUNNING_QUEUE"

    echo "[]" > "$PENDING_QUEUE"

    echo "$TASK moved to RUNNING"

    sleep 5

    echo "[ \"$TASK\" ]" > "$COMPLETED_QUEUE"

    echo "[]" > "$RUNNING_QUEUE"

    echo "$TASK moved to COMPLETED"

  else
    echo "No tasks found"
  fi

  sleep 10
done
