#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
PID_FILE="/tmp/renderer-demos-dev.pid"
LOG_FILE="/tmp/renderer-demos-dev.log"
BROWSER_PID_FILE="/tmp/renderer-demos-browser.pid"
URL_HUB="http://127.0.0.1:5173/"

cd "$ROOT"

if [[ ! -d node_modules ]]; then
  echo "[setup] npm install"
  npm install
fi

stop_servers() {
  if [[ -f "$PID_FILE" ]]; then
    kill "$(cat "$PID_FILE")" 2>/dev/null || true
    rm -f "$PID_FILE"
  fi
  pkill -f "concurrently -n hub,mc,rv" 2>/dev/null || true
  pkill -f "$ROOT/node_modules/.bin/vite" 2>/dev/null || true
  sleep 1
}

wait_ports() {
  for _ in $(seq 1 30); do
    local ok=0
    for p in 5173 5174 5175; do
      local code
      code=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout 1 "http://127.0.0.1:$p/" || echo 000)
      [[ "$code" == "200" ]] && ok=$((ok + 1))
    done
    if [[ "$ok" == "3" ]]; then
      return 0
    fi
    sleep 1
  done
  return 1
}

check_endpoints() {
  curl -s -o /dev/null -w "hub:%{http_code} mc-player:%{http_code} rv-player:%{http_code}\n" \
    "$URL_HUB" \
    "http://127.0.0.1:5174/player.html" \
    "http://127.0.0.1:5175/player.html"
}

open_browser() {
  export DISPLAY="${DISPLAY:-:1}"
  export XAUTHORITY="${XAUTHORITY:-$HOME/.Xauthority}"

  if [[ -f "$BROWSER_PID_FILE" ]]; then
    kill "$(cat "$BROWSER_PID_FILE")" 2>/dev/null || true
    rm -f "$BROWSER_PID_FILE"
  fi

  pkill -f "Google Chrome for Testing.*5173" 2>/dev/null || true
  pkill -f "playwright open.*5173" 2>/dev/null || true
  sleep 1

  # VNC 上では system Chrome の GPU 初期化が失敗しやすいので Playwright Chromium を使う。
  npx playwright install chromium >/dev/null 2>&1 || true
  nohup npx playwright open --browser chromium "$URL_HUB" \
    >/tmp/renderer-demos-browser.log 2>&1 &
  echo $! >"$BROWSER_PID_FILE"

  sleep 8
  local wid
  wid=$(xdotool search --name "描画エンジン比較デモ" 2>/dev/null | head -1 || true)
  if [[ -z "$wid" ]]; then
    wid=$(xdotool search --name "Google Chrome for Testing" 2>/dev/null | head -1 || true)
  fi
  if [[ -n "$wid" ]]; then
    xdotool windowactivate "$wid" 2>/dev/null || true
    xdotool windowraise "$wid" 2>/dev/null || true
    xdotool windowsize "$wid" 1600 1000 2>/dev/null || true
    xdotool windowmove "$wid" 60 40 2>/dev/null || true
    echo "[browser] opened: $(xdotool getwindowname "$wid" 2>/dev/null || echo unknown)"
  else
    echo "[browser] launched (window title not detected yet)" >&2
    tail -10 /tmp/renderer-demos-browser.log >&2 || true
  fi
}

start_servers() {
  stop_servers
  echo "[dev] starting servers..."
  nohup npm run dev >"$LOG_FILE" 2>&1 &
  echo $! >"$PID_FILE"
  if ! wait_ports; then
    echo "failed to start dev servers. log:" >&2
    tail -30 "$LOG_FILE" >&2
    exit 1
  fi
  echo "[dev] 5173/5174/5175 ready"
  check_endpoints
}

case "${1:-restart}" in
  stop)
    stop_servers
    if [[ -f "$BROWSER_PID_FILE" ]]; then
      kill "$(cat "$BROWSER_PID_FILE")" 2>/dev/null || true
      rm -f "$BROWSER_PID_FILE"
    fi
    pkill -f "Google Chrome for Testing.*5173" 2>/dev/null || true
    echo "stopped"
    ;;
  start)
    start_servers
    ;;
  open-browser)
    open_browser
    ;;
  restart|*)
    start_servers
    open_browser
    ;;
esac
