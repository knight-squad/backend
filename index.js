const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "qcrs_database",
});

app.get("/", (req, res) => {
    // const sqlInsert =
    // "INSERT INTO qcrs_database.user VALUES (2,'test','test@test.com','1234567',0716666666,'testtest','test');"
    // db.query(sqlInsert, (err, result) => {
    //     res.send("hello..");
    // }); 
});

app.listen(3001, () => {
    console.log("running on port 3001")
});