#!/bin/sh
set -u

mkdir -p src/diagrams

for diagram in diagrams/*.dot; do
    dot -Tsvg -o"src/$diagram.svg" "$diagram"
done

for diagram in diagrams/*.msc; do
    mscgen -Tsvg -o"src/$diagram.svg" "$diagram"
done
