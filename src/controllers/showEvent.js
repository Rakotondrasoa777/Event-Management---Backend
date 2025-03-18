const pool = require('../config/db');

const eventController = {
    getAllEvent: async(req, res) => {
        let sql = "select * from event"

        try {
            const {rows} = await pool.query(sql)
            res.status(200).json(rows);
        } catch (e) {
            console.error(e);
            res.status(500).send('Server error')
        }
    },

    getEventById: async(req, res) => {
        const id = parseInt(req.params.id);
        let sql = "select * from event where id = $1"

        if (isNaN(id)) {
            return res.status(400).send('Invalid ID');
        }
    
        try {
            const {rows} = await pool.query(sql, [id])

            if(rows.length === 0) {
                return res.status(404).send('Event not found');
            }

            res.status(200).json(rows);
        } catch (e) {
            console.error(e)
            res.status(500).send('Server error')
        }
    },

    filterEventsByDate: async (req, res) => {
        const date = req.params.date;
        let sql = "select * from event where date_of_event = $1"

        try {
            const {rows} = await pool.query(sql, [date])

            if (rows.length === 0) {
                return res.status(404).send('No events available for this date')
            }

            res.status(200).json(rows);
        } catch (e) {
            console.error(e);
            res.status(500).send('Server error');
        }
    }


}

module.exports = eventController
