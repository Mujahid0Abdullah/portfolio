const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
// Environment değişkenlerini yükle
dotenv.config();

const app = express();
app.use(express.json());
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/resources", express.static(__dirname + "/resources"));

// MySQL bağlantısı
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("MySQL bağlantı hatası: ", err);
    return;
  }
  console.log("MySQL'e başarıyla bağlanıldı");
});

// API Rotaları
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Kullanıcı Ekleme
app.post("/users", (req, res) => {
  const { name, email, password, bio, profile_picture } = req.body;
  const query =
    "INSERT INTO Users (name, email, password, bio, profile_picture) VALUES (?, ?, ?, ?, ?)";
  db.query(
    query,
    [name, email, password, bio, profile_picture],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(201).send("Kullanıcı başarıyla eklendi");
    }
  );
});
app.get("/api/skills", (req, res) => {
  //const userId = req.params.user_id;

  // SQL query to fetch skills for the given user_id
  const sql = `SELECT * FROM skills `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching skills:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    console.log(results);
    res.json(results);
  });
});
app.get("/api/projects", (req, res) => {
  //const userId = req.params.user_id;

  // SQL query to fetch skills for the given user_id
  const sql = `SELECT * FROM projects `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching skills:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    console.log(results);
    res.json(results);
  });
});
// Proje Ekleme
app.post("/projects", (req, res) => {
  const { user_id, title, description, project_url } = req.body;
  const query =
    "INSERT INTO Projects (user_id, title, description, project_url) VALUES (?, ?, ?, ?)";
  db.query(query, [user_id, title, description, project_url], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send("Proje başarıyla eklendi");
  });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
