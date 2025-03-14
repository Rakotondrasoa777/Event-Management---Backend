const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    user: "ton_utilsateur",
    host: "ton_host",
    database: "ton_database_name",
    password: "ton_password",
    port: 5432,
});

module.exports = pool;