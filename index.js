const express = require("express");
const app = express();
const mysql = require("mysql");


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "qcrs_database",
    port: "3306"
})

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('mysql connected..');
})

//test
// db.query("INSERT INTO qcrs_database.user VALUES (3,'test','test@test.com','1234567',0716666666,'testtest','test')", (err, rows) => {
//     if (err) {
//         throw err;
//     }
//     else {
//         console.log('data sent')
//         console.log(rows)
//     }
// })

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {

    res.send("hello..");
});


// app.listen(3001, () => {
//     console.log("running on port 3001")
// });
app.listen(port)
console.log("app is listening on " + port)