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

import {
  fetchData,
  fetchSearchData,
} from "../../../api/adminDashboard/adminEntries/entriesDispensaryList";

const EntriesDispensaryListScreen = () => {
  const [dispensaries, setDispensaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();

  const apiIp = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    fetchData(setDispensaries, apiIp);
  }, []);

  useEffect(() => {
    fetchSearchData(searchTerm, setDispensaries, apiIp);
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
              navigation.navigate("Admin Dispensary Entries", {
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

export default EntriesDispensaryListScreen;