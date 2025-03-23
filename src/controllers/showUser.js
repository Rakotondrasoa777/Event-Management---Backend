const pool = require("../config/db");

const userControllers = {
    getAllUser: async(req, res) => {
        try {
            const {rows} = await pool.query('select id, username, email from users')
            res.json(rows)
        } catch (e) {
            console.error(e);
            res.status(500).send('Server error')
        }
    },

    getUserById: async(req, res) => {
        const id = parseInt(req.params.id);
        let sql = "select id, username, email from users where id = $1"

        if (isNaN(id)) {
            return res.status(400).send('Invalid ID');
        }
    
        try {
            const {rows} = await pool.query(sql, [id])

            if(rows.length === 0) {
                return res.status(404).send('User not found');
            }

            res.status(200).json(rows);
        } catch (e) {
            console.error(e)
            res.status(500).send('Server error')
        }
    },
}

module.exports = userControllers