const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const pool = new Pool({
  user: "vou_database_user",
  host: "dpg-cr1da73qf0us73flr140-a.oregon-postgres.render.com",
  database: "vou_database",
  password: "HcNYQC6nnyyQWstx0AhG3DDSuwP1T5Dc",
  port: 5432,
});

const app = express();
app.use(bodyParser.json());

app.post("/api/signup", async (req, res) => {
  const client = await pool.connect();
  try {
    const { username, email, password, ...otherData } = req.body;

    // Example query to insert data into PostgreSQL
    const insertQuery = `
      INSERT INTO users (username, email, password, ...)
      VALUES ($1, $2, $3, ...);
    `;

    const values = [username, email, password, ...otherData];
    await client.query(insertQuery, values);

    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    client.release();
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
