const pool = require("../config/db");
const bcrypt = require('bcryptjs');

class User {
    static async createUser(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUserSql = "insert into users (username, email, password) values ($1, $2, $3)";
        const values = [username, email, hashedPassword]
        const {rows} = await pool.query(createUserSql, values);
        return rows;
    }

    static async findUserByEmail(email) {
        const findUserSql = "select id, username, email, password from users where email = $1";
        const {rows} = await pool.query(findUserSql, [email]);
        
        return rows[0];
    }
}

module.exports = User;