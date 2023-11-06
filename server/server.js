const express = require("express");
const app = express();
const port = 3000;

const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  database: "ayush",
  user: "postgres",
  password: "password",
});

client.connect();

async function getDeviceEntryById(deviceId) {
  try {
    const query = "SELECT * FROM device WHERE device_id = $1";
    const values = [deviceId];

    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      return null; // Device not found
    }

    return result.rows; // Return all rows matching the device_id
  } catch (error) {
    console.error("Error retrieving device entry:", error);
    return null;
  }
}

app.get("/api/device/:device_id", async (req, res) => {
  const deviceId = req.params.device_id;

  try {
    const deviceEntry = await getDeviceEntryById(deviceId);

    if (!deviceEntry) {
      res.status(404).json({ success: false, message: "Device not found" });
    } else {
      res.status(200).json({ success: true, deviceEntry });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.get("/api/checkin", (req, res) => {
  const { latitude, longitude } = req.query;
  db.any(
    "SELECT device_id FROM device WHERE ST_DWithin(location::geography, ST_MakePoint($1, $2)::geography, radius_in_meters)",
    [longitude, latitude]
  )
    .then((data) => {
      if (data.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "User location is not correct" });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ success: false, message: "An error occurred" });
    });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
