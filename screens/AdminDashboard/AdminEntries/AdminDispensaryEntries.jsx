import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

import TimelinePicker from "../../../components/TimelinePicker";

const AdminDispensaryEntries = () => {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeframe, setTimeframe] = useState("today");
  const [currentPage, setCurrentPage] = useState(1);

  const route = useRoute();
  const dispensaryId = route.params.dispensaryId;
  const apiIp = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiIp}/dispensaries/${dispensaryId}/patient-entries/${timeframe}?page=${currentPage}&pageSize=7`
        );
        setEntries((prevEntries) => [...prevEntries, ...response.data]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispensaryId, timeframe]);

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        let url =
          dispensaryId === "*"
            ? `${apiIp}/admin/all-dispensaries-entry/search?searchTerm=${searchTerm}&timeframe=${timeframe}`
            : `${apiIp}/admin/dispensaries-entry/${dispensaryId}/search?searchTerm=${searchTerm}&timeframe=${timeframe}`;

        // Clear the entries state
        setEntries([]);

        const response = await axios.get(url);
        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          setEntries(response.data);
        } else {
          // Convert the response data to an array
          setEntries(Object.values(response.data));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (searchTerm && timeframe) {
      fetchSearchData();
    }
  }, [searchTerm, timeframe]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        onChangeText={setSearchTerm}
        value={searchTerm}
        placeholder="Search by name, diagnosis"
      />
      <TimelinePicker onTimeframeChange={setTimeframe} />
      <FlatList
        data={entries}
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
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        onEndReached={() => setCurrentPage((prevPage) => prevPage + 1)}
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

  picker: {
    height: 50,
    width: 200,
  },
  optionContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
  },
  optionText: {
    fontSize: 15,
    marginLeft: 10,
  },
});

export default AdminDispensaryEntries;
