const pool = require("./pool");

async function insertNewUser({ firstName, lastName, username, password }) {
    const { rows } = await pool.query(
        "INSERT INTO users (firstName, lastName, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [firstName, lastName, username, password]
    );
    return rows[0];
}

module.exports = {
    insertNewUser,

};