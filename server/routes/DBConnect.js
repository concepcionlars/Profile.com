const m0ng00se                                          = require('mongoose');

function connectDB() {
    const db = m0ng00se.connect('mongodb://localhost:27017/team_vuyog', { useNewUrlParser: true });
    const conn = m0ng00se.connection;
    console.log('web server is now connected to mongoDB!')
}

module.exports = connectDB;