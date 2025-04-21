#!/bin/bash
echo "Opening Image Format Converter..."

# Try different browsers based on what's available
if command -v xdg-open > /dev/null; then
  xdg-open index.html  # Linux
elif command -v open > /dev/null; then
  open index.html  # macOS
else
  echo "Could not detect a way to open the browser. Please open index.html manually."
fi 