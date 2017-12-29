#!/bin/bash

echo "user:"
read user
echo "database:"
read database
echo "host:"
read host
echo "port:"
read port
echo "password"
read password

pgpass=${host}:${port}:*:${user}:${database}

./pgpass.sh ${pgpass}


psql -U 127.0.0.1 -d company -h 127.0.0.1 -p 5432 --command "
drop table users;
drop table userswm;
drop table authorities;
drop table counterUser;
drop table counters;
drop table shopUser;
drop table shops;
drop table areas;
drop table bills;
drop table cashiers;
drop table customers;
drop table products;
drop table eventsList;
drop table editResultList;
drop table cashierSalesInfo;
drop table customerSalesInfo;
drop table productSalesInfo;
"
