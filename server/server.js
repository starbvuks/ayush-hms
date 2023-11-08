const express = require("express");
const app = express();
const port = 3000;

const deviceRoutes = require("./routes/deviceRoute");
const checkinRoutes = require("./routes/checkinRoute");
const distanceRoute = require("./routes/distanceRoute");

app.use("/api/device", deviceRoutes);
app.use("/api/checkin", checkinRoutes);
app.use("/api", distanceRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
