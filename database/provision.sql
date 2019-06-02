CREATE DATABASE postgraphile_next_starter;
\c postgraphile_next_starter
CREATE SCHEMA app_public;
CREATE SCHEMA app_hidden;
CREATE SCHEMA typeorm;
CREATE SCHEMA app_private;
CREATE USER postgraphile_next_starter_user WITH PASSWORD 'password';
GRANT USAGE ON SCHEMA app_public, app_hidden to postgraphile_next_starter_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA app_public TO postgraphile_next_starter_user;