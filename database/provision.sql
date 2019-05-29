CREATE DATABASE le3io;
\c le3io
CREATE SCHEMA app_public;
CREATE SCHEMA typeorm;
CREATE SCHEMA app_private;
CREATE USER le3io_user WITH PASSWORD 'password';
CREATE USER le3io_server WITH PASSWORD 'password';
GRANT USAGE ON SCHEMA app_public to le3io_user;
GRANT USAGE ON SCHEMA app_public, app_private to le3io_server;