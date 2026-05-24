#!/bin/bash

PENDING_QUEUE="queue/pending.json"

echo "SOLAR WORKER STARTED"

while true
do
  echo "Checking pending queue..."
  date

  if grep -q "TASK-" "$PENDING_QUEUE"; then
    echo "Task detected in queue"

    cat "$PENDING_QUEUE"
  else
    echo "No tasks found"
  fi

  sleep 10
done
