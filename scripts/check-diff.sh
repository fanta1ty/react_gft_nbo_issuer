#!/bin/bash
set -euo pipefail

# DIFF="${{ steps.diff.outputs.diff }}"
GITHUB_EVENT_BEFORE=$GITHUB_EVENT_BEFORE

# See https://github.community/t/check-pushed-file-changes-with-git-diff-tree-in-github-actions/17220/10
if [ $GITHUB_BASE_REF ]; then
  # Pull Request
  git fetch origin $GITHUB_BASE_REF --depth=1
  export DIFF=$(git diff --name-only origin/$GITHUB_BASE_REF $GITHUB_SHA)
  echo "Diff between origin/$GITHUB_BASE_REF and $GITHUB_SHA"
else
  # Push
  git fetch origin $GITHUB_EVENT_BEFORE --depth=1
  export DIFF=$(git diff --name-only $GITHUB_EVENT_BEFORE $GITHUB_SHA)
  echo "Diff between $GITHUB_EVENT_BEFORE and $GITHUB_SHA"
fi

echo "$DIFF"
# Escape newlines (replace \n with %0A)
echo "diff=$(echo "$DIFF" | sed ':a;N;$!ba;s/\n/\t/g')" >>$GITHUB_OUTPUT
