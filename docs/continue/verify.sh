#!/bin/sh
# Использование: sh verify.sh <префикс> [имя_своего_файла, напр. p22d_raft.html]
# 1) SOLO: собирает ядро + ТОЛЬКО ваш файл во временный index.html и гоняет check.js + smoke.js.
#    Это главный критерий: чужие недописанные файлы на него не влияют.
# 2) FULL: собирает все _parts во временный index.html (общий E:/arch_trainer/index.html НЕ трогается).
NAME="${1:-anon}"; OWN="$2"
SP="$(cd "$(dirname "$0")" && pwd)"
cd /e/arch_trainer || exit 1
if [ -n "$OWN" ]; then
  OUT="$SP/solo_$NAME"; mkdir -p "$OUT"
  cat _parts/p01_head.html _parts/p02_header.html "_parts/$OWN" _parts/p29_gloss.html _parts/p29b_why.html _parts/p30_tail.html > "$OUT/index.html"
  echo "=== SOLO ($OWN): $(wc -c < "$OUT/index.html") bytes"
  ( cd "$OUT" && node /e/arch_trainer/check.js 2>&1 | grep -E "script blocks|SYNTAX|syntax ok|  line:" ; timeout 300 node /e/arch_trainer/smoke.js 2>&1 | tail -30 )
fi
OUT="$SP/build_$NAME"; mkdir -p "$OUT"
LC_ALL=C ls -1 _parts/p*.html | LC_ALL=C sort | xargs cat > "$OUT/index.html"
echo "=== FULL: $(wc -c < "$OUT/index.html") bytes"
( cd "$OUT" && node /e/arch_trainer/check.js 2>&1 | grep -v "possibly missing ids" | grep -v "^  '" | grep -v "^\]" ; timeout 400 node /e/arch_trainer/smoke.js 2>&1 | tail -30 )
