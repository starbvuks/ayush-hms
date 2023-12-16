import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const AdminEmployeeDispensaryList = () => {
  const [dispensaries, setDispensaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();

  const apiIp = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://${apiIp}:3000/admin/dispensaries`
      );
      setDispensaries(response.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const response = await axios.get(
          `http://${apiIp}:3000/admin/dispensaries/search?searchTerm=${searchTerm}`
        );
        // Check if the response data is an array
        if (Array.isArray(response.data)) {
          setDispensaries(response.data);
        } else {
          // Convert the response data to an array
          setDispensaries(Object.values(response.data));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (searchTerm) {
      fetchSearchData();
    }
  }, [searchTerm]);

  return (
    <View>
      <TextInput
        style={styles.searchBar}
        onChangeText={setSearchTerm}
        value={searchTerm}
        placeholder="Search by name or location"
      />
      <FlatList
        data={dispensaries}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={() =>
              navigation.navigate("Admin Employees", {
                dispensaryId: item.dispensary_id,
              })
            }
          >
            <Text style={styles.optionText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.dispensary_id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 70,
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionList: {
    justifyContent: "flex-start",
  },
  optionContainer: {
    backgroundColor: "#2E475D",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  optionText: {
    fontSize: 24,
    marginTop: 10,
    color: "#ECF0F9",
    textAlign: "center",
    fontFamily: "DM-Sans-Bold",
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default AdminEmployeeDispensaryList;
