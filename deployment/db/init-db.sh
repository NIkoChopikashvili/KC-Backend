#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE kc;
    CREATE DATABASE kcposts;
    GRANT ALL PRIVILEGES ON DATABASE kc TO postgres;
    GRANT ALL PRIVILEGES ON DATABASE kcposts TO postgres;
EOSQL
