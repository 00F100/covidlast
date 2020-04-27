#!/bin/sh
npm run build;
for (( i=1; i<=$1; i++ ))
do
  node dist/bootstrap/handler.js extract $i;
done
