const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "event_management",
    password: "Nomena7805.",
    port: 5432,
});

module.exports = pool;