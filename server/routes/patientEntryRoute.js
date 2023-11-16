const GeoPoint = require("geopoint");
const cron = require("node-cron");

const express = require("express");
const router = express.Router();

router.post("/patient-data", async (req, res) => {
  const { patientData, employeeId, deviceLocation } = req.body;

  // Save patient data
  const patientRecord = {
    ...patientData,
    employee_id: employeeId,
    entry_date: new Date(),
  };
  await db.query("INSERT INTO PatientEntry SET ?", patientRecord);

  // Mark attendance
  const attendanceRecord = {
    employee_id: employeeId,
    entry_date: new Date(),
    // location and distance will be calculated later
  };
  await db.query("INSERT INTO Attendance SET ?", attendanceRecord);

  // Fetch dispensary location for the employee
  const dispensaryLocation = await db.query(
    "SELECT location FROM Dispensary d JOIN Employee e ON d.dispensary_id = e.registered_dispenary WHERE e.employee_id = ?",
    employeeId
  );

  // Calculate distance
  const point1 = new GeoPoint(
    deviceLocation.latitude,
    deviceLocation.longitude
  );
  const point2 = new GeoPoint(
    dispensaryLocation.latitude,
    dispensaryLocation.longitude
  );
  const distance = point1.distanceTo(point2, true); // output in kilometers

  // Update attendance record
  await db.query(
    "UPDATE Attendance SET location = ?, distance = ? WHERE employee_id = ? AND entry_date = ?",
    [deviceLocation, distance, employeeId, new Date()]
  );

  // Check attendance status
  const status = distance > 150 ? "Out of bounds" : "Success";

  // Update attendance record
  await db.query(
    "UPDATE Attendance SET status = ? WHERE employee_id = ? AND entry_date = ?",
    [status, employeeId, new Date()]
  );

  res.send({ message: "Data saved successfully" });
});

// Schedule check for missed attendance
cron.schedule("0 10,13,17 * * *", async () => {
  // Fetch all employees
  const employees = await db.query("SELECT * FROM Employee");

  // Check attendance for each employee
  for (const employee of employees) {
    const attendance = await db.query(
      "SELECT * FROM Attendance WHERE employee_id = ? AND entry_date = ?",
      [employee.employee_id, new Date()]
    );

    // If no attendance record, mark as missed
    if (!attendance) {
      await db.query(
        'INSERT INTO Attendance SET employee_id = ?, entry_date = ?, status = "Missed"',
        [employee.employee_id, new Date()]
      );
    }
  }
});

module.exports = router;
