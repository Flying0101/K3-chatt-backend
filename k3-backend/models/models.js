const db = require('../database'); 
const fs = require("fs");


// Add message with sql 
function addMessage(data) {

const sql = 'INSERT INTO messages (message, author, time, chat) VALUES (?, ?, ?, ?)'

return new Promise((resolve, reject) => {
    db.run(sql, [data.message, data.author, data.time, data.area ], (error) => {
      if (error) {
        reject(error);
      }
      resolve();

    });
  });


}


//send room data and creates room in database with sql.
function addRoom(data) { 

  const sql = 'INSERT INTO rooms (name, creator) VALUES (?, ?)'

  return new Promise((resolve, reject) => {
    db.run(sql, [data.name, data.creator], (error) => {
      if (error) {
        reject(error);
      }
      resolve();

    });
  });


}


// delete room without async so sync.
function deleteChatt(data) { 


  const sql = `DELETE FROM rooms WHERE name = ?`

  return new Promise((resolve, reject) => {
    db.run(sql, data, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
      console.log(`room: ${data} was deleted!`);


    });
  });


}

// delete messages without async so sync.
function delAllMsg(data) { 


  const sql = `DELETE FROM messages WHERE chat = ?`

  return new Promise((resolve, reject) => {
    db.run(sql, data, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
      console.log(`all Messages in :${data}: are deleted!`);


    });
  });


}


// gets all rooms from database to be able to load them into frontend.
function allChatts() { 

  const sql = `SELECT * FROM rooms`

  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        reject(error);
      }
      resolve(rows);


    });
  });


}

// get all rooms name to be able to load and validate in frontend.
function allNames() { 

  const sql = `SELECT name FROM rooms`

  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        reject(error);
      }
      resolve(rows);


    });
  });


}



// validates if message is not empty and writes it into txt file

function logItAll(data) { 

  const fsDat = JSON.stringify(data);
  if(data.message){
    fs.appendFile('logs.txt', fsDat + "\n", (error) => {
      if(error){
        return (console.log('EROR logs.txt ERROR'))
      }
    })
  }
  console.log('file logged successfully!'); 
}





// exporting my function so i can use them in server.js / backend.

module.exports = {addMessage, addRoom, deleteChatt, allChatts, delAllMsg, logItAll, allNames};