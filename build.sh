#!/bin/sh
cd "$(dirname "$0")"
LC_ALL=C ls -1 _parts/p*.html | LC_ALL=C sort | xargs cat > index.html
echo "built: $(wc -c < index.html) bytes, $(wc -l < index.html) lines"
