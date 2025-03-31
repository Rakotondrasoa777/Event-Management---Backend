const pool = require("../config/db");

const ticketController = {
    getAllAvailableTicket: async (req, res) => {
        let sql = "select t.id, e.title, t.stock, t.price, t.type_of_ticket from ticket_stock t inner join event e on t.id_event = e.id"

        try {
            const {rows} = await pool.query(sql);
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).send({error: error.message})
        }
    },

    createTicket: async (req, res) => {
        const {id_event, stock, price, type_of_ticket} = req.body
        let sql = "insert into ticket_stock (id_event, stock, price, type_of_ticket) values ($1, $2, $3, $4) returning *"
        const values = [id_event, stock, price, type_of_ticket]

        try {
            const maxIdResult = await pool.query("SELECT MAX(id) AS max_id FROM ticket_stock");
            const maxId = maxIdResult.rows[0].max_id || 0;
            
            await pool.query(`ALTER SEQUENCE ticket_stock_id_seq RESTART WITH ${maxId + 1}`);
            const result = await pool.query(sql, values);

            res.status(201).send({
                Information: "Ticket successfully created",
                ticketCreated: result.rows
            });
        } catch (error) {
            res.status(400).send({
                error: "Ticket creation error",
                details: error.message
            });
        }
    },

    updateTicketById: async (req, res) => {
        const id = parseInt(req.params.id);
        const {id_event, stock, price, type_of_ticket} = req.body
        const sql = "update ticket_stock set id_event = $1, stock = $2, price = $3, type_of_ticket = $4 where id = $5 returning *"
        const values = [id_event, stock, price, type_of_ticket, id]

        if (isNaN(id)) {
            return res.status(400).send({error: "Invalid ID"})
        }

        try {
            const ticketUpdated = await pool.query(sql, values)
            res.status(200).send({
                Information: "ticket successfully updated",
                EventUpdated: ticketUpdated.rows
            });
        } catch (error) {
            
        }
    },

    deleteTicketById: async (req, res) => {
        const id = parseInt(req.params.id); 
        let sql = "delete from ticket_stock where id = $1"
        if (isNaN(id)) {
            return res.status(400).send({error: "Invalid ID"})
        }

        try {
            await pool.query(sql, [id]);
            res.status(204).send("Ticket successfully deleted");
        } catch(e) {
            res.status(400).send({error: e.message})
        }
    },

    
}