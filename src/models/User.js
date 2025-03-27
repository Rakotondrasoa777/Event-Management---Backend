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

    static async findUserByUsername(username) {
        const findUserSql = "select id, username, email, password from users where username = $1";
        const {rows} = await pool.query(findUserSql, [username]);
        
        return rows[0];
    }

    static async findUserById(id) {
        const findUserByIdSql = "select id from users where id = $1";
        const {rows} = await pool.query(findUserByIdSql, [id]);
        
        return rows[0];
    }
}

module.exports = User;