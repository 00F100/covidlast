#!/bin/sh
i=0
while [ "$i" -le $1 ]; do
    node dist/bootstrap/handler.js extract $i;
    i=$(( i + 1 ))
done 
