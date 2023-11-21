const GeoPoint = require("geopoint");
const cron = require("node-cron");
const db = require("../db/index");

const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { patientData, employeeId, location } = req.body;

  // Save patient data
  const patientRecord = {
    ...patientData,
    employee_id: employeeId,
    entry_date: new Date(),
  };

  try {
    const insertText =
      "INSERT INTO PatientEntry(first_name, last_name, age, gender, adhaar_number, marital_status, diagnosis, treatment, other_info, entry_date, employee_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
    const insertValues = [
      patientData.first_name,
      patientData.last_name,
      patientData.age,
      patientData.gender,
      patientData.adhaar_number,
      patientData.marital_status,
      patientData.diagnosis,
      patientData.treatment,
      patientData.other_info,
      new Date(),
      employeeId,
    ];
    await db.query(insertText, insertValues);

    // Check if employee_id exists in Employee table
    const employeeCheckText = "SELECT * FROM Employee WHERE employee_id = $1";
    const employeeCheckValues = [employeeId];
    const employeeCheckResult = await db.query(
      employeeCheckText,
      employeeCheckValues
    );

    if (employeeCheckResult.rows.length === 0) {
      throw new Error(`Employee with id ${employeeId} does not exist`);
    }

    // Save attendance data
    // Save attendance data
    const attendanceRecord = {
      employee_id: employeeId,
      entry_date: new Date(),
      location: `POINT(${location.longitude} ${location.latitude})`,
      distance: 0, // You can calculate the distance here if needed
    };

    const attendanceInsertText =
      "INSERT INTO Attendance(employee_id, entry_date, location, distance) VALUES($1, $2, ST_GeomFromText($3), $4)";
    const attendanceInsertValues = [
      attendanceRecord.employee_id,
      attendanceRecord.entry_date,
      attendanceRecord.location,
      attendanceRecord.distance,
    ];
    await db.query(attendanceInsertText, attendanceInsertValues);

    res.send({ message: "Patient data and attendance saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred while saving data" });
  }
});

// router.post("/", async (req, res) => {
//   const { patientData, employeeId, deviceLocation } = req.body;

//   // Save patient data
//   const insertText =
//     "INSERT INTO PatientEntry(first_name, last_name, age, gender, adhaar_number, marital_status, diagnosis, treatment, other_info, entry_date, employee_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
//   const insertValues = [
//     patientData.first_name,
//     patientData.last_name,
//     patientData.age,
//     patientData.gender,
//     patientData.adhaar_number,
//     patientData.marital_status,
//     patientData.diagnosis,
//     patientData.treatment,
//     patientData.other_info,
//     new Date(),
//     employeeId,
//   ];
//   await db.query(insertText, insertValues);

//   // Mark attendance
//   const attendanceRecord = {
//     employee_id: employeeId,
//     entry_date: new Date(),
//     // location and distance will be calculated later
//   };
//   await db.query("INSERT INTO Attendance SET ?", attendanceRecord);

//   // Fetch dispensary location for the employee
//   const dispensaryLocation = await db.query(
//     "SELECT location FROM Dispensary d JOIN Employee e ON d.dispensary_id = e.registered_dispenary WHERE e.employee_id = $1",
//     [employeeId]
//   );

//   // Calculate distance
//   const point1 = new GeoPoint(
//     deviceLocation.latitude,
//     deviceLocation.longitude
//   );
//   const point2 = new GeoPoint(
//     dispensaryLocation.latitude,
//     dispensaryLocation.longitude
//   );
//   const distance = point1.distanceTo(point2, true); // output in kilometers

//   // Update attendance record
//   await db.query(
//     "UPDATE Attendance SET location = ?, distance = ? WHERE employee_id = ? AND entry_date = ?",
//     [deviceLocation, distance, employeeId, new Date()]
//   );

//   // Check attendance status
//   const status = distance > 150 ? "Out of bounds" : "Success";

//   // Update attendance record
//   await db.query(
//     "UPDATE Attendance SET status = ? WHERE employee_id = ? AND entry_date = ?",
//     [status, employeeId, new Date()]
//   );

//   res.send({ message: "Data saved successfully" });
// });

// // Schedule check for missed attendance
// cron.schedule("0 10,13,17 * * *", async () => {
//   // Fetch all employees
//   const employees = await db.query("SELECT * FROM Employee");

//   // Check attendance for each employee
//   for (const employee of employees) {
//     const attendance = await db.query(
//       "SELECT * FROM Attendance WHERE employee_id = ? AND entry_date = ?",
//       [employee.employee_id, new Date()]
//     );

//     // If no attendance record, mark as missed
//     if (!attendance) {
//       await db.query(
//         'INSERT INTO Attendance SET employee_id = ?, entry_date = ?, status = "Missed"',
//         [employee.employee_id, new Date()]
//       );
//     }
//   }
// });

module.exports = router;
