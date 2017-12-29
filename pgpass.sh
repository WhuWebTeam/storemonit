#!/bin/bash

if [ -e ~/.pgpass ]
then
    echo ~/.pgpass file exists
    rm ~/.pgpass
fi

echo ${1} >> ~/.pgpass
chmod 600 ~/.pgpass