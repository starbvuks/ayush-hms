const express = require("express");
const app = express();
const port = 3000;

const patientDataRoute = require("./routes/patientEntryRoute");
app.post("/patient-data", patientDataRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;
