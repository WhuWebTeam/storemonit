#!/bin/bash

if [ -e ~/.pgpass ]
then 
    rm ~/.pgpass
fi

echo ${1} >> ~/.pgpass
chmod 600 ~/.pgpass