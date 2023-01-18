const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "anime",
    
});

db.connect((err) => {
    if(err) {
      throw err;  
    }
    console.log("MySql Connected...");
})

var currentUser = null;

/*sign up new user*/
app.post('/register', (req, res) => {
    
    const count = db.query("SELECT COUNT(*) FROM profiles");
    const id = count;
    const username = req.body.username;
    const password = req.body.password;
    const gender = req.body.gender;
    const birthday = req.body.birthday;
    const sqlInsert = "INSERT INTO profiles (id, profile_name, password, gender, birthday) VALUES (?,?,?,?,?)";
    db.query(
        sqlInsert, 
        [id, username, password, gender, birthday],
        (err, result) => {
            if (err) {
                console.log(err);
            }
        }
    );
});

/*login to the website*/
app.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM profiles WHERE profile_name = ? AND password = ?",
        [username, password],
        (err, result) => {
            if(err) {
                res.send({err: err})
            }
            
            if(result.length > 0) {
                currentUser = username;
                res.send(result)
            } else {
                res.send({ message: "Wrong username/password comnination" });
                console.log("user doesnt exist");
            }
        }
    );
});


app.listen(3001, () => {
    console.log('running on port 3001')
});