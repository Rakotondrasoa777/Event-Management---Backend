const pool = require("../config/db");

const userControlllers = {
    getAllUser: async(req, res) => {
        try {
            const {rows} = await pool.query('select * from \"user\"')
            res.json(rows)
        } catch (e) {
            console.error(e);
            res.status(500).send('Server error')
        }
    }
}

module.exports = userControlllers