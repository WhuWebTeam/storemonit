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

pgpass=${host}:${port}:*:${user}:${password}

./pgpass.sh ${pgpass}

psql -U ${user} -d ${database} -h ${host} -p ${port} --command "CREATE TABLE public.users
(
    id varchar(50) primary key,
    username varchar(50),
    password varchar(50) not null,
    phone varchar(11),
    email varchar(50),
    authorityId varchar(50)
)
WITH (
    OIDS=FALSE
);
ALTER TABLE public.users
OWNER TO company;


CREATE TABLE public.userswm
(
    wmUserId varchar(50) primary key,
    wmUserLvl int,
    userName varchar(50),
    phone varchar(11),
    email varchar(50),
    authorityId varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.userswm
  OWNER TO company;


CREATE TABLE public.authorities
(
    id varchar(50) primary key,
    name varchar(50),
    details varchar(500)
)
WITH (
    OIDS = FALSE
);
ALTER TABLE public.authorities
  OWNER TO company;


CREATE TABLE public.counterUser
(
    id serial primary key,
    userId varchar(50),
    counterId varchar(50),
    type varchar(50) default 'pos'
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.counterUser
  OWNER TO company;


CREATE TABLE public.counters
(
    id varchar(50) primary key,
    shopId varchar(50),
    typeId varchar(50),
    details varchar(500),
    assigned boolean default false,
    cameraIp varchar(50),
    alarmIp varchar(50),
    alarmPort varchar(50),
    posIp varchar(50),
    posCtlPort varchar(50),
    posBillPort varchar(50),
    posAlarmPort varchar(50),
    name varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.counters
  OWNER TO company;


CREATE TABLE public.counterTypeConf
(
    id varchar(50) primary key,
    type varchar(50)
) 
WITH (
  OIDS = FALSE
);
ALTER TABLE public.counterTypeConf
  OWNER TO company;


CREATE TABLE public.shopUser
(
    id serial primary key,
    userId varchar(50),
    shopId varchar(50),
    type varchar(50)
) 
WITH (
  OIDS = FALSE
)
;
ALTER TABLE public.shopUser
  OWNER TO company;


CREATE TABLE public.shops
(
    id varchar(50) primary key,
    areaId varchar(50),
    name varchar(50),
    details varchar(500),
    type varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.shops
  OWNER TO company;


CREATE TABLE public.areas
(
    id varchar(50) primary key,
    name varchar(50),
    details varchar(500)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.areas
  OWNER TO company;


CREATE TABLE public.bills
(
    id serial,
    syskey varchar(50) primary key,
    price int,
    quantity int,
    amount int,
    ts bigint,
    scriptVer varchar(50),
    eventFlag varchar(50),
    cashierId varchar(50),
    customerId varchar(50),
    transId varchar(50),
    shopId varchar(50),
    counterId varchar(50),
    productId varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.bills
  OWNER TO company;


CREATE TABLE public.cashiers
(
    id varchar(50) primary key,
    name varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.cashiers
  OWNER TO company;


CREATE TABLE public.customers
(
    id varchar(50) primary key,
    name varchar(50),
    type varchar(50)
)
WITH (
  OIDS = FALSE
)
;
ALTER TABLE public.customers
  OWNER TO company;


CREATE TABLE public.products
(
    id varchar(50) primary key,
    name varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.products
  OWNER TO company;


CREATE TABLE public.eventsList
(
    id serial,
    sysKey varchar(50) primary key,
    transId varchar(50),
    ts bigint,
    createAt bigint,
    editResult varchar(50),
    status int default 0,
    comments varchar(500),
    videoStartTime bigint,
    videoEndTime bigint,
    videoUrl varchar(200),
    pic1Url varchar(200),
    pic2Url varchar(200),
    pic3Url varchar(200),
    pic4Url varchar(200),
    shopId varchar(50),
    shopName varchar(50),
    productId varchar(50),
    productName varchar(50),
    counterId varchar(50),
    counterType varchar(50),
    cashierId varchar(50),
    cashierName varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.eventsList
  OWNER TO company;


CREATE TABLE public.editResultList
(
  id varchar(50) primary key,
  name varchar(50),
  details varchar(200)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.editResultList
  OWNER TO company;


CREATE TABLE public.eventTAT
(
  id serial primary key,
  sysKey varchar(50),
  shopId varchar(50),
  checkerId varchar(50),
  checkerName varchar(50),
  type int,
  createAt bigint,
  duration bigint
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.eventTAT
  OWNER TO company;


CREATE TABLE public.cashierSalesInfo
(
    id serial,
    ts bigint,
    duration bigint,
    rate real,
    amount bigint,
    cashierId varchar(50),
    transId varchar(50)
)
WITH (
  OIDS = FALSE
)
;
ALTER TABLE public.cashierSalesInfo
  OWNER TO company;


CREATE TABLE public.customerSalesInfo
(
    id serial,
    ts bigint,
    price bigint,
    quantity bigint,
    amount bigint,
    customerId varchar(50),
    transId varchar(50),
    productId varchar(50)
)
WITH (
  OIDS = FALSE
);
ALTER TABLE public.customerSalesInfo
  OWNER TO company;


CREATE TABLE public.productSalesInfo
(
    id serial,
    ts bigint,
    price bigint,
    quantity bigint,
    amount bigint,
    shopId varchar(50),
    productId varchar(50),
    transId varchar(50)
)
WITH (
  OIDS = FALSE
)
;
ALTER TABLE public.productSalesInfo
  OWNER TO company;
"
