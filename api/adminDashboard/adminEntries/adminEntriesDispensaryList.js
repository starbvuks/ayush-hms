import axios from "axios";

export const fetchData = async (setDispensaries, page, apiIp) => {
  try {
    const response = await axios.get(
      `${apiIp}/admin/dispensaries?page=${page}&pageSize=7`
    );
    if (response.data.length > 0) {
      setDispensaries((prevDispensaries) => [
        ...prevDispensaries,
        ...response.data,
      ]);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchSearchData = async (searchTerm, setDispensaries, apiIp) => {
  try {
    const response = await axios.get(
      `${apiIp}/admin/dispensaries/search?searchTerm=${searchTerm}`
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
