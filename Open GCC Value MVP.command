#!/bin/zsh

set -e

project_dir="${0:A:h}"
port=8000

while lsof -iTCP:"$port" -sTCP:LISTEN -t >/dev/null 2>&1; do
  port=$((port + 1))
done

open "http://localhost:$port/"
echo "GCC Value MVP is running at http://localhost:$port/"
echo "Keep this window open while using the app. Press Ctrl+C to stop the server."
python3 -m http.server "$port" --directory "$project_dir"