import axios from "axios";

export const fetchData = async (
  dispensaryId,
  timeframe,
  currentPage,
  setEntries,
  apiIp
) => {
  try {
    const response = await axios.get(
      `http://${apiIp}:3000/dispensaries/${dispensaryId}/patient-entries/${timeframe}?page=${currentPage}&pageSize=7`
    );
    setEntries((prevEntries) => [...prevEntries, ...response.data]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchSearchData = async (
  searchTerm,
  timeframe,
  setEntries,
  apiIp
) => {
  try {
    const response = await axios.get(
      `http://${apiIp}:3000/admin/dispensaries-entry/search?searchTerm=${searchTerm}&timeframe=${timeframe}`
    );
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
