#!/bin/sh
for (( i=1; i<=16; i++ ))
do
  node dist/bootstrap/handler.js extract $i;
done
