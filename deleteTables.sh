#!/bin/bash

./pgpass.sh

psql -U ${1} -d ${2} -h ${3} -p ${4} --command "
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
