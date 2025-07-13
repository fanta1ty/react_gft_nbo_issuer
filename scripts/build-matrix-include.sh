#!/bin/bash
set -euo pipefail

# DIFF="${{ steps.diff.outputs.diff }}"
DIFF=($DIFF)

INCLUDE_COUNT=0
JSON="["

# Loop by lines
# while read path; do
for path in "${DIFF[@]}"; do
  # Set $directory to substring before /
  directory="$(echo "$path" | cut -d'/' -f1 -s)"
  JSONline=$(cat matrix.json | jq -c ".[] | objects | select(.image_name == \"ui\")")
  if [[ "$JSON" != *"$JSONline"* ]]; then
    JSON="$JSON$JSONline,"
    INCLUDE_COUNT=$((INCLUDE_COUNT + 1))
  fi
done <<<"$DIFF"

# Remove last "," and add closing brackets
if [[ $JSON == *, ]]; then
  JSON="${JSON%?}"
fi
JSON="$JSON]"
echo "$JSON"
echo $INCLUDE_COUNT
echo "matrix-include=$(echo "$JSON")" >>"$GITHUB_OUTPUT"
echo "include-count=$(echo $INCLUDE_COUNT)" >>"$GITHUB_OUTPUT"
