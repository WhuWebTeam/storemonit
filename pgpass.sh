#!/bin/bash

if [ -e ~/.pgpass ]
then 
    rm ~/.pgpass
fi

echo "127.0.0.1:5432:*:company:123" >> ~/.pgpass
chmod 600 ~/.pgpass