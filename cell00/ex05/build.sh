#!/bin/bash

if [ $# -eq 0 ]; then
	echo "No arguments supplied"
	exit 1
fi

for num in "$@"; do
	folder_name=$(printf "ex%02d" "$num")
	mkdir -p "$folder_name"
done

