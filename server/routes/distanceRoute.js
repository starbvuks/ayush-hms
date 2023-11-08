const express = require("express");
const router = express.Router();
const { calculateDistance } = require("../utils/functions");

router.get("/distance", (req, res) => {
  const { lat1, lon1, lat2, lon2 } = req.query;

  // Convert the coordinates to numbers
  const lat1Num = parseFloat(lat1);
  const lon1Num = parseFloat(lon1);
  const lat2Num = parseFloat(lat2);
  const lon2Num = parseFloat(lon2);

  // Calculate the distance using the Haversine formula
  const distance = calculateDistance(lat1Num, lon1Num, lat2Num, lon2Num);

  // Format the distance to meters without decimal points
  const formattedDistance = Math.round(distance);

  // Return the formatted distance with the unit
  res.json({ distance: `${formattedDistance} meters` });
});

module.exports = router;

// http://localhost:3000/api/distance?lat1=17.385044&lon1=78.486671&lat2=17.385074&lon2=78.486671
