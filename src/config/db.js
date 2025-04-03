const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "event_management",
    password: "rina0109!",
    port: 5432,
});

module.exports = pool;