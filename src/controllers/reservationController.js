const pool = require("../config/db");
const User = require("../models/User");

const reservationController = {
    reserveEvent: async (req, res) => {
        const { id_event, id_user, ticket_number, ticket_type, date_reservation } = req.body
        let selectStockTicketOfEvent = "select stock, price, type_of_ticket from ticket_stock where id_event = $1 and type_of_ticket = $2;"
        let insertReservation  = "insert into reservation (id_event, id_user, ticket_number, ticket_type, date_reservation, total_price_reservation) values ($1, $2, $3, $4, $5, $6) returning *";
        let updateTicketStock = "update ticket_stock set stock = $1 where id_event = $2 and type_of_ticket = $3";

        try {
            
            const stockTicket = await pool.query(selectStockTicketOfEvent, [id_event, ticket_type]);
            if (stockTicket.rows.length === 0) {
                return res.status(404).json({ error: "Billet introuvable pour cet événement" });
            }
            
            let totalPrice = stockTicket.rows[0].price * ticket_number;
            let newStock = stockTicket.rows[0].stock - ticket_number;
            
            if (newStock < 0) {
                return res.status(400).json({ error: "Billet épuisé pour cette événement" });
            }
            
            try {
                await pool.query(updateTicketStock, [newStock, id_event, ticket_type]);
            } catch (error) {
                res.status(400).json({error: error.message})
            }            

            try {
                const reservation = await pool.query(insertReservation, [id_event, id_user, ticket_number, ticket_type, date_reservation, totalPrice])
                res.status(201).json({
                    reservation: reservation.rows[0],
                    totalPriceRervation: totalPrice 
                })
            } catch (error) {
                res.status(400).json({error: error.message})
            }
        } catch (error) {
            res.status(500).json({
                error: "Une erreur est survenue lors du traitement de la réservation."
            });
        }
    },

    showReserveOfUser: async (req, res) => {
        const username = req.params.username;
    
        const idUser = await User.findIdUserByUsername(username);
        
        let sql = "select e.title, r.ticket_number, r.ticket_type, r.date_reservation, r.total_price_reservation from reservation r inner join  event e on e.id = r.id_event inner join users u on r.id_user = u.id where r.username = $1"

        try {
            const reservationOfUser = await pool.query(sql, [idUser.id])
            
            if (reservationOfUser.rows.length === 0) {
                return res.status(404).json({error: "User introuvable"})
            }
            res.status(200).json(reservationOfUser.rows)
        } catch (error) {
            res.status(500).json({
                error: "Une erreur est survenue lors de recuperation des reservations"
            });
        }
    },

    showUsersReservation: async (req, res) => {
        let sql = "select e.title, u.username, r.ticket_number, r.ticket_type, r.date_reservation, r.total_price_reservation from event e inner join reservation r on e.id = r.id_event inner join users u on u.id = r.id_user"
        let totalPriceOfAllReservation = 0.0;

        try {
            const {rows} = await pool.query(sql);
            for (let index = 0; index < rows.length; index++) {
                totalPriceOfAllReservation += rows[index].total_price_reservation;
            }
            res.status(200).json({
                totalPriceOfAllReservation: totalPriceOfAllReservation,
                reservation: rows
            })
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    },
    
    getMonthlyIncomeStats: async (req, res) => {
        const sql = `
            SELECT 
                EXTRACT(MONTH FROM r.date_reservation) AS month,
                SUM(r.total_price_reservation) AS total_revenue,
                SUM(CASE 
                    WHEN r.ticket_type = 'STANDARD' THEN 20 * r.ticket_number
                    WHEN r.ticket_type = 'VIP' THEN 40 * r.ticket_number
                    WHEN r.ticket_type = 'EARLY_BIRD' THEN 50 * r.ticket_number
                END) AS total_cost
            FROM reservation r
            GROUP BY month
            ORDER BY month
        `;

        try {
            const { rows } = await pool.query(sql);
            const dataset = rows.map(row => ({
                month: row.month,
                revenue: row.total_revenue / 1000, // en k€
                cost: row.total_cost / 1000,
                profit: (row.total_revenue - row.total_cost) / 1000
            }));
            res.status(200).json(dataset);
        } catch (error) {
            res.status(500).json({ 
                error: "Erreur lors du calcul des revenus mensuels",
                details: error.message 
            });
        }
    },

    statsTicketTypes: async (req, res) => {
        const sql = `
            SELECT 
                ticket_type AS type,
                SUM(ticket_number) AS tickets_sold,
                SUM(total_price_reservation) AS total_revenue
            FROM reservation
            GROUP BY ticket_type
            ORDER BY tickets_sold DESC
        `;

        try {
            const { rows } = await pool.query(sql);
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = reservationController;