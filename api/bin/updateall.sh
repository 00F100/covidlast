#!/bin/sh

for i in {1..$1}
do
  node dist/bootstrap/handler.js extract $i;
done
