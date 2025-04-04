const pool = require('../config/db');
const Event = require('../models/Event');

const eventController = {
    getAllEvent: async (req, res) => {
        let sql = "select * from event"

        try {
            const { rows } = await pool.query(sql)
            res.status(200).json(rows);
        } catch (e) {
            console.error(e);
            res.status(500).send('Server error')
        }
    },

    getEventById: async (req, res) => {
        const id = parseInt(req.params.id);
        let sql = "select e.id, e.title, e.date_of_event, e.categorie, e.description, e.location, e.available_of_ticket, ts.price, ts.type_of_ticket from event e inner join ticket_stock ts on e.id = ts.id_event where e.id = $1"

        if (isNaN(id)) {
            return res.status(400).send('Invalid ID');
        }

        try {
            const { rows } = await pool.query(sql, [id])

            if (rows.length === 0) {
                return res.status(404).send('Event not found');
            }

            res.status(200).json(rows[0]);
        } catch (e) {
            console.error(e)
            res.status(500).send('Server error')
        }
    },

    filterEventsByDate: async (req, res) => {
        const date = req.params.date;
        let sql = "select * from event where date_of_event = $1"

        try {
            const { rows } = await pool.query(sql, [date])

            if (rows.length === 0) {
                return res.status(404).send('No events available for this date')
            }

            res.status(200).json(rows);
        } catch (e) {
            console.error(e);
            res.status(500).send('Server error');
        }
    },

    createEvent: async (req, res) => {
        const { title, date_of_event, categorie, description, location, available_of_ticket, id_event, stock, price, type_of_ticket } = req.body;

        try {
            const result = await pool.query(
                `INSERT INTO event 
             (title, date_of_event, categorie, description, location, available_of_ticket) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING *`,
                [title, date_of_event, categorie, description, location, available_of_ticket]
            );

            await pool.query("insert into ticket_stock (id_event, stock, price, type_of_ticket) values ($1, $2, $3, $4)", [id_event, stock, price, type_of_ticket]);

            // Formatage de la réponse pour React-Admin
            res.status(201).json({
                data: result.rows[0] // Doit inclure un champ 'id'
            });

        } catch (e) {
            res.status(400).json({
                error: "Erreur de création",
                details: e.message
            });
        }
    },

    deleteEventById: async (req, res) => {
        const id = parseInt(req.params.id);
        let sql = "delete from event where id = $1"
        if (isNaN(id)) {
            return res.status(400).send({ error: "Invalid ID" })
        }

        try {
            await pool.query(sql, [id]);
            res.status(204).send("Event successfully deleted");
        } catch (e) {
            res.status(400).send({ error: e.message })
        }
    },

    updateEventById: async (req, res) => {
        const id = parseInt(req.params.id);
        const { name, date_of_event, categorie, location, available_of_ticket } = req.body;
        const sql = "update event set title = $1, date_of_event = $2, categorie = $3, location = $4, available_of_ticket = $5 where id = $6 returning *";
        const values = [name, date_of_event, categorie, location, available_of_ticket, id];

        if (isNaN(id)) {
            return res.status(400).send({ error: "Invalid ID" })
        }

        try {
            const isEventFinded = await Event.findEventById(id);
            
            if (isEventFinded === undefined) {
                return res.status(404).send({ error: "Event not found" })
            }

            const eventUpdated = await pool.query(sql, values);

            res.status(200).send({
                Information: "Event successfully updated",
                EventUpdated: eventUpdated.rows
            });

        } catch (e) {
            res.status(400).send({ error: e.message })
        }
    },

    getAvailableTicketOfEventById: async (req, res) => {
        const id = parseInt(req.params.id)
        let sql = "select t.id, e.title, t.stock, t.price, t.type_of_ticket from ticket_stock t inner join event e on t.id_event = e.id where e.id = $1"

        if (isNaN(id)) {
            return res.status(400).send({ error: "Invalid ID" })
        }

        try {
            const {rows} = await pool.query(sql, [id]);
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    }
}

module.exports = eventController
