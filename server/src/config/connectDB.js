import mysql from 'mysql2/promise';

const connectDB = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '892002',
    database: 'dictionary',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
});

export default connectDB;