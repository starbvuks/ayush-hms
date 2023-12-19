import axios from "axios";
import moment from "moment";

export const fetchData = async (dispensaryId, date, setAttendance, apiIp) => {
  try {
    // `https://${apiIp}:3000/admin/dispensary/${dispensaryId}/attendance`,
    const response = await axios.get(
      `http://192.168.29.226:3000/admin/dispensary/${dispensaryId}/attendance`,
      {
        params: {
          date: moment(date).format("YYYY-MM-DD"),
        },
      }
    );
    setAttendance(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
