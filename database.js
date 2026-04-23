const Database = require('better-sqlite3');

const db = new Database('mahasiswa.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS mahasiswa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    nim TEXT NOT NULL,
    jurusan TEXT NOT NULL
    )
`);

module.exports = db;