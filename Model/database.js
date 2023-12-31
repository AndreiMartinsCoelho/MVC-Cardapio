const mysql = require('mysql2/promise');

async function connect() {
    if (global.connection && global.connection.state !== "disconnected") {
        return global.connection;
    }

    const connection = await mysql.createConnection({
        host: "sql10.freemysqlhosting.net",
        user: "sql10645744",
        database: "sql10645744",
        password: "3NeGUTI8tP"
    });

    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

async function query(sql, values) {
    const conn = await connect();
    const [rows] = await conn.query(sql, values);
    return rows;
}

module.exports = { query };

