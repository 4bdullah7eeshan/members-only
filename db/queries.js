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
};

async function findUserById(id) {
    const query = `
        SELECT * FROM users
        WHERE id = $1;
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

async function updateMembershipStatus(userId, status) {
    const query = `
        UPDATE users
        SET membership_status = $1
        WHERE id = $2
        RETURNING *;
    `;
    const result = await pool.query(query, [status, userId]);
    return result.rows[0];
};

async function isAdmin(userId) {
    const query = `
        SELECT admin FROM users
        WHERE id = $1;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0]?.admin;
};

async function insertNewMessage(title, text, userId) {
    const query = `
        INSERT INTO messages (title, text, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const result = await pool.query(query, [title, text, userId]);
    return result.rows[0];
};


module.exports = {
    insertNewUser,
    findUserByUsername,
    findUserById,
    updateMembershipStatus,
    isAdmin,
    insertNewMessage,


};