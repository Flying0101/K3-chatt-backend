
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('./db.sqlite', (error) => {

    // vid fel.
    if (error) {
        // Kunde inte öppna databasen
        console.error(error.message);
        throw error;
    }
    console.log("Database in action");


    // message tabell
    const messages = `CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    author TEXT,
    time TEXT,
    chat TEXT)`

     //room tabell
     const rooms = `CREATE TABLE rooms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        creator TEXT)`

    




    // kör room statement.
    db.run(rooms, (error) => {
        if (!rooms) {
            // Om tabellen redan finns
            console.error("error.message");
        }
    });



    // kör message statement. 
    db.run(messages, (error) => {
        if (error) {
            // Om tabellen redan finns
            console.error(error.message);
        }
    });




});





module.exports = db;