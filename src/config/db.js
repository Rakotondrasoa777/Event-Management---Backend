const { Pool } = require("pg");
require('dotenv').config();

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "event_management",
<<<<<<< HEAD
    password: "Nomena7805.",
=======
    password: "tojonandry",
>>>>>>> 724d29929ef14b763aacf859c4828a1bc0a51c86
    port: 5432,
});

module.exports = pool;