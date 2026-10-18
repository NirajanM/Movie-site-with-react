import axios from "axios";

const BASE_URL = "/api/tmdb/";

export const fetchData = async (endroute, params) => {
  const path = endroute.replace(/^\/+/, "");
  try {
    const { data } = await axios.get(BASE_URL + path, { params });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
