const pool = require("../config/db");

const pictureControllers = {
    
    createPicture: async (req, res) => {
        const { id_event, image_url } = req.body;
        let sql = "INSERT INTO pictures (id_event, image_url) VALUES ($1, $2) RETURNING *";
        const values = [id_event, image_url];
        
        try {
            const eventCheck = await pool.query("SELECT id FROM event WHERE id = $1", [id_event]);
            
            if (eventCheck.rows.length === 0) {
                return res.status(404).send({ error: "Event not found" });
            }
            
            const result = await pool.query(sql, values);
            
            res.status(201).send({
                message: "Picture successfully created",
                picture: result.rows[0]
            });
        } catch (e) {
            res.status(400).send({
                error: "Picture creation error",
                details: e.message
            });
        }
    },

    // Récupérer toutes les images
    getAllPictures: async (req, res) => {
        try {
            const { rows } = await pool.query('SELECT id, id_event, image_url FROM pictures');
            res.status(200).json(rows);
        } catch (e) {
            console.error(e);
            res.status(500).send('Server error');
        }
    },

    // Récupérer une image par son ID
    getPictureById: async (req, res) => {
        const id = parseInt(req.params.id);
        let sql = "SELECT id, id_event, image_url FROM pictures WHERE id = $1";

        if (isNaN(id)) {
            return res.status(400).send('Invalid ID');
        }
    
        try {
            const { rows } = await pool.query(sql, [id]);

            if (rows.length === 0) {
                return res.status(404).send('Picture not found');
            }

            res.status(200).json(rows[0]);
        } catch (e) {
            console.error(e);
            res.status(500).send('Server error');
        }
    },

    // Récupérer toutes les images d'un événement spécifique
    getPicturesByEventId: async (req, res) => {
        const eventId = parseInt(req.params.eventId);
        let sql = "SELECT id, id_event, image_url FROM pictures WHERE id_event = $1";

        if (isNaN(eventId)) {
            return res.status(400).send('Invalid Event ID');
        }
    
        try {
            // Vérifier si l'événement existe
            const eventCheck = await pool.query("SELECT id FROM event WHERE id = $1", [eventId]);
            
            if (eventCheck.rows.length === 0) {
                return res.status(404).send({ error: "Event not found" });
            }

            const { rows } = await pool.query(sql, [eventId]);
            res.status(200).json(rows);
        } catch (e) {
            console.error(e);
            res.status(500).send('Server error');
        }
    },

    // Mettre à jour une image
    updatePictureById: async (req, res) => {
        const id = parseInt(req.params.id);
        const { image_url } = req.body;
        const sql = "UPDATE pictures SET image_url = $1 WHERE id = $2 RETURNING *";
        const values = [image_url, id];
        
        if (isNaN(id)) {
            return res.status(400).send({ error: "Invalid ID" });
        }
    
        try {
            // Vérifier d'abord si l'image existe
            const pictureCheck = await pool.query("SELECT id FROM pictures WHERE id = $1", [id]);
            
            if (pictureCheck.rows.length === 0) {
                return res.status(404).send({ error: "Picture not found" });
            }
            
            const updatedPicture = await pool.query(sql, values);
    
            if (updatedPicture.rows.length === 0) {
                return res.status(500).send({ error: "Update failed" });
            }
    
            res.status(200).send({
                message: "Picture successfully updated",
                picture: updatedPicture.rows[0]
            });
    
        } catch (e) {
            res.status(400).send({ error: e.message });
        }
    },

    // Supprimer une image
    deletePictureById: async (req, res) => {
        const id = parseInt(req.params.id); 
        let sql = "DELETE FROM pictures WHERE id = $1 RETURNING *"; 
        
        if (isNaN(id)) {
            return res.status(400).send({ error: "Invalid ID" });
        }
    
        try { 
            const deleteResult = await pool.query(sql, [id]);
            
            if (deleteResult.rowCount === 0) {
                return res.status(404).send({ error: "Picture not found" });
            }
    
            res.status(200).send({
                message: "Picture deleted successfully",
                deletedPicture: deleteResult.rows[0]
            });
            
        } catch(e) {
            res.status(400).send({ error: e.message });
        }
    }
};

module.exports = pictureControllers;