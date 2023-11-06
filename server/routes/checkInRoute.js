const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
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

module.exports = router;
