const pool = require("./pool");

async function insertNewUser({ firstName,
    lastName,
    username,
    password,
    membershipStatus = false,
    admin = false }) {
        
    const query = `
        INSERT INTO users (first_name, last_name, username, password, membership_status, admin)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [firstName, lastName, username, password, membershipStatus, admin];
    const result = await pool.query(query, values);
    return result.rows[0];
};

async function findUserByUsername(username) {
    const query = `
        SELECT * FROM users
        WHERE username = $1;
    `;
    const result = await pool.query(query, [username]);
    return result.rows[0];
}


module.exports = {
    insertNewUser,
    findUserByUsername,

};