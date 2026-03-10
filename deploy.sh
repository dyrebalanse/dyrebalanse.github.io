#!/usr/bin/env bash
set -euo pipefail

REPO_URL="https://github.com/dyrebalanse/dyrebalanse.github.io"
TARGET_BRANCH="work"
MAIN_BRANCH="main"

if ! git remote get-url origin >/dev/null 2>&1; then
  git remote add origin "$REPO_URL"
else
  git remote set-url origin "$REPO_URL"
fi

git fetch origin || true
git checkout "$TARGET_BRANCH"
git push -u origin "$TARGET_BRANCH"

if git show-ref --verify --quiet "refs/heads/$MAIN_BRANCH"; then
  git checkout "$MAIN_BRANCH"
else
  git checkout -b "$MAIN_BRANCH"
fi

git merge --no-edit "$TARGET_BRANCH"
git push -u origin "$MAIN_BRANCH"
git checkout "$TARGET_BRANCH"

echo "Deploy ferdig: $TARGET_BRANCH og $MAIN_BRANCH er pushet."
