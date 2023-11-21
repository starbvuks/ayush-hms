const express = require("express");
const app = express();
const port = 3000;

const db = require("./db/index");
// parse application/json
app.use(express.json());

const patientDataRoute = require("./routes/patientEntryRoute");
app.use("/patient-data", patientDataRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/attendance", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT *, ST_AsText(location) as location_text FROM Attendance"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data" });
  }
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;
