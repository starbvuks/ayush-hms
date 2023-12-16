import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PatientEntries = () => {
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const pageSize = 7;
  const apiIp = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const registered_dispensary = await AsyncStorage.getItem(
        "registered_dispensary"
      );

      if (registered_dispensary) {
        try {
          const response = await axios.get(
            `http://${apiIp}:3000/patient-entries?dispensary_id=${registered_dispensary}&page=${page}&pageSize=${pageSize}`
          );
          // Check if the server returned any new data
          if (response.data.patientEntries.length > 0) {
            setEntries((prevEntries) => [
              ...prevEntries,
              ...response.data.patientEntries,
            ]);
          }
        } catch (error) {
          console.error("Error fetching patient entries:", error);
        }
      }
    };

    fetchData();
  }, [page, pageSize]);

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await axios.get(
          `http://${apiIp}:3000/patient-entries/search?searchTerm=${searchTerm}`
        );
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (searchTerm) {
      fetchSearchData();
    }
  }, [searchTerm]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subheading}>Patient Entries:</Text>
      <TextInput
        style={styles.searchBar}
        onChangeText={setSearchTerm}
        value={searchTerm}
        placeholder="Search by name or diagnosis"
      />
      <FlatList
        data={entries}
        keyExtractor={(item) => item.entry_id.toString()}
        renderItem={({ item }) => {
          const date = new Date(item.entry_date);
          const day = date.getDate();
          const month = date.getMonth() + 1; // getMonth() returns month index starting from 0
          const year = date.getFullYear();
          const formattedDate = `${day < 10 ? "0" + day : day}/${
            month < 10 ? "0" + month : month
          }/${year}`;

          return (
            <View style={styles.itemContainer}>
              <View style={styles.firstLine}>
                <Text style={styles.patientName}>
                  Name: {item.first_name} {item.last_name}
                </Text>
                <View style={styles.entryDate}>
                  <Text style={styles.entryDateSide}>{formattedDate}</Text>
                </View>
              </View>
              <Text style={styles.gender}>
                {item.gender}, {item.age} | Adhaar Number: {item.adhaar_number}
              </Text>
              <Text style={styles.itemText}></Text>
              <View style={styles.diagnosis}>
                <Text style={styles.itemText}>Diagnosis:</Text>
                <View style={styles.diagnosisTextBox}>
                  <Text style={styles.diagnosisText}>{item.diagnosis}</Text>
                </View>
              </View>
              <View style={styles.diagnosis}>
                <Text style={styles.itemText}>Treatment:</Text>
                <View style={styles.diagnosisTextBox}>
                  <Text style={styles.diagnosisText}> {item.treatment}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.itemText}>Other Info: {"\n"}</Text>
                <View style={styles.otherInfoBox}>
                  <Text style={styles.otherInfo}>{item.other_info}</Text>
                </View>
              </View>
            </View>
          );
        }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  subheading: {
    fontSize: 38,
    fontWeight: "bold",
    padding: 28,
    color: "#2E475D",
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
  firstLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  patientName: {
    fontWeight: "bold",
    fontSize: 28,
  },
  gender: {
    fontSize: 24,
  },
  diagnosis: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  diagnosisTextBox: {
    backgroundColor: "#2E475D",
    padding: 8,
    marginLeft: 10,
    borderRadius: 8,
  },
  diagnosisText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  otherInfoBox: {
    backgroundColor: "#d6d5ed",
    borderRadius: 10,
  },
  otherInfo: {
    padding: 20,
    fontSize: 22,
  },
  entryDate: {
    backgroundColor: "#2E475D",
    padding: 8,
    borderRadius: 8,
  },
  entryDateSide: {
    fontSize: 20,
    color: "white",
  },
  itemContainer: {
    backgroundColor: "#f0f0fa",
    margin: 18,
    padding: 45,
    borderRadius: 10,
    rowGap: 5,
  },
  itemText: {
    fontSize: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "transparent",
  },

  paginationButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: "gray",
  },
  activeButton: {
    backgroundColor: "#22c55d",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default PatientEntries;
