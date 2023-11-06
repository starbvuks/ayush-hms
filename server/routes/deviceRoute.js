const express = require("express");
const router = express.Router();
const deviceModel = require("../models/deviceModel");

router.get("/:device_id", async (req, res) => {
  const deviceId = req.params.device_id;

  try {
    const deviceEntry = await deviceModel.getDeviceEntryById(deviceId);

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

module.exports = router;
