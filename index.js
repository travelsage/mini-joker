const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ganesh2503",
  database: "registration_db",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    throw err;
  }
  console.log("MySQL connected...");
});

app.post("/register", (req, res) => {
  const {
    name,
    email,
    phone,
    age,
    gender,
    departure,
    return: returnDate,
    destinations,
    package,
    terms,
  } = req.body;

  console.log("Received form data:", req.body);

  if (!Array.isArray(destinations)) {
    return res.status(400).send("Invalid data format for destinations");
  }

  const destinationsString = destinations.join(", ");

  const termsAccepted = terms === "on" ? 1 : 0;

  const query = `INSERT INTO registrations (name, email, phone, age, gender, departure, \`return\`, destinations, package, terms)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      name,
      email,
      phone,
      age,
      gender,
      departure,
      returnDate,
      destinationsString,
      package,
      termsAccepted,
    ],
    (err, result) => {
      if (err) {
        console.error("SQL error:", err);
        res.status(500).send("Registration failed");
      } else {
        console.log("SQL result:", result);
        res.status(200).send("Registration successful");
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
