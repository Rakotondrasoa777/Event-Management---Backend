const pool = require("../config/db");

class Event{
    static async findEventById(id) {
        const findEventSql = "select id from event where id = $1";
        const {rows} = await pool.query(findEventSql, [id]);
        
        return rows[0];
    }
}

module.exports = Event;