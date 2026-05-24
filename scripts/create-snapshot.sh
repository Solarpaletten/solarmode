#!/bin/bash

SNAPSHOT_DIR="rollback/snapshots"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")

mkdir -p "$SNAPSHOT_DIR/$TIMESTAMP"

cp -R tasks "$SNAPSHOT_DIR/$TIMESTAMP/"
cp -R queue "$SNAPSHOT_DIR/$TIMESTAMP/"

echo "SNAPSHOT CREATED: $TIMESTAMP"
