import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchData = async (page, pageSize, setEntries, apiIp) => {
  const registered_dispensary = await AsyncStorage.getItem(
    "registered_dispensary"
  );

  if (registered_dispensary) {
    try {
      const response = await axios.get(
        `https://${apiIp}:3000/patient-entries?dispensary_id=${registered_dispensary}&page=${page}&pageSize=${pageSize}`
        // `https://192.168.29.226:3000/patient-entries?dispensary_id=${registered_dispensary}&page=${page}&pageSize=${pageSize}`
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

export const fetchSearchData = async (searchTerm, setEntries, apiIp) => {
  try {
    const response = await axios.get(
      `https://${apiIp}/patient-entries/search?searchTerm=${searchTerm}`
      // `https://192.168.29.226:3000/patient-entries/search?searchTerm=${searchTerm}`
    );
    setEntries(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
