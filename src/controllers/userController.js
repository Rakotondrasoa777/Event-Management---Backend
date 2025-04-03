const pool = require("../config/db");

const userControllers = {
    createUser: async (req, res) => {
        const { username , email , password } = req.body
        let sql = "insert into users (username, email, password) values ($1, $2, $3) returning *";
        const value = [username, email, password];
        try {
            const maxIdResult = await pool.query("SELECT MAX(id) AS max_id FROM users");
            const maxId = maxIdResult.rows[0].max_id || 0;
            
            await pool.query(`ALTER SEQUENCE users_id_seq RESTART WITH ${maxId + 1}`);
            const result = await pool.query(sql, value);
            res.status(201).send({
                Information: "user successfully created",
                EventCreated: result.rows
            });
        } catch (e) {
            res.status(400).send({
                error: "user creation error",
                details: e.message
            });
        }
    },
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

    updateUserById: async (req, res) => {
        const id = parseInt(req.params.id);
        const { username, email, password } = req.body;
        const sql = "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *";
        const values = [username, email, password, id];
        
        if (isNaN(id)) {
            return res.status(400).send({ error: "Invalid ID" });
        }
    
        try {
            // Vérifier d'abord si l'utilisateur existe
            const userCheck = await pool.query("SELECT id FROM users WHERE id = $1", [id]);
            
            if (userCheck.rows.length === 0) {
                return res.status(404).send({ error: "User not found" });
            }
            
            
            const userUpdated = await pool.query(sql, values);
    
            
            if (userUpdated.rows.length === 0) {
                return res.status(500).send({ error: "Update failed" });
            }
    
            res.status(200).send({
                message: "User successfully updated",
                user: userUpdated.rows[0] 
            });
    
        } catch (e) {
            
            if (e.code === '23505') {
                const detail = e.detail.includes('email') ? 'Email already exists' : 'Username already exists';
                return res.status(409).send({ error: detail });
            }
            res.status(400).send({ error: e.message });
        }
    },

    deleteUserById: async (req, res) => {
        const id = parseInt(req.params.id); 
        let sql = "delete from users where id = $1 returning *"; 
        
        if (isNaN(id)) {
            return res.status(400).send({error: "Invalid ID"});
        }
    
        try { 
            const deleteResult = await pool.query(sql, [id]);
            
            if (deleteResult.rowCount === 0) {
                return res.status(404).send({error: "User not found"});
            }
    
            
            res.status(200).send({
                information: "User deleted successfully",
                userDeleted: deleteResult.rows[0]
            });
            
        } catch(e) {
            res.status(400).send({error: e.message});
        }
    }
}

module.exports = userControllers