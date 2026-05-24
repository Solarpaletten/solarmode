#!/bin/bash

SNAPSHOT=$1

if [ -z "$SNAPSHOT" ]; then
  echo "Usage: ./restore-snapshot.sh <snapshot-folder>"
  exit 1
fi

echo "RESTORING SNAPSHOT: $SNAPSHOT"

rm -rf tasks
rm -rf queue

cp -R "rollback/snapshots/$SNAPSHOT/tasks" .
cp -R "rollback/snapshots/$SNAPSHOT/queue" .

echo "RESTORE COMPLETE"
