import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

import { fetchData } from "../../../api/adminDashboard/adminEmployees/adminEmployees";

const AdminEmployees = ({ route }) => {
  const { dispensaryId } = route.params;
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const apiIp = process.env.EXPO_PUBLIC_API_URL;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  useEffect(() => {
    fetchData(dispensaryId, date, setAttendance, apiIp);
  }, [dispensaryId, date]);

  return (
    <View style={styles.container}>
      <Text style={styles.subheading}>Employee Attendance</Text>
      <TouchableOpacity onPress={() => setShow(true)}>
        <View style={styles.datePickerContainer}>
          <Text style={styles.dateText}>
            {moment(date).format("YYYY-MM-DD")}
          </Text>
          <Text style={styles.datePickerText}>
            Attendance for the selected date
          </Text>
        </View>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode={"date"}
          display="default"
          onChange={onChange}
        />
      )}
      <FlatList
        data={attendance}
        renderItem={({ item }) => (
          <View style={styles.attendanceBlock}>
            <Text
              style={styles.attendanceText}
            >{`Employee ID: ${item.employee_id}`}</Text>
            <Text style={styles.attendanceText}>{`Name: ${item.name}`}</Text>
            <Text
              style={styles.attendanceText}
            >{`Distance from Dispensary: ${item.distance} kilometers`}</Text>
            <Text style={styles.attendanceText}>{`Time: ${moment(
              item.entry_date
            ).format("HH:mm")}`}</Text>
          </View>
        )}
        keyExtractor={(item) => item.attendance_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  subheading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  searchBar: {
    height: 60,
    borderColor: "#2E475D",
    borderWidth: 2,
    margin: 20,
    padding: 10,
    borderRadius: 6,
    fontSize: 18,
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    color: "#333",
  },
  datePickerText: {
    fontSize: 16,
    color: "#666",
  },
  attendanceBlock: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  attendanceText: {
    fontSize: 16,
    color: "#333",
  },
});

export default AdminEmployees;
