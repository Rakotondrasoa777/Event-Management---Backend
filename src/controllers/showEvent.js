const pool = require('../config/db');

const eventController = {
    getAllEvent: async(req, res) => {
        try {
            const {rows} = await pool.query('select * from event')
            res.json(rows);
        } catch (e) {
            console.error(e);
            res.status(500).send('Server error')
        }
    }
}

module.exports = eventController
