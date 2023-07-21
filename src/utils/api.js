import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const token = import.meta.env.VITE_TOKEN;

const headers = {
    accept: 'application/json',
    Authorization: 'Bearer ' + token,
};

export const fetchData = async (endroute, params) => {
    try {
        const { data } = await axios.get(BASE_URL + endroute, { headers, params });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}