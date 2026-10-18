import axios from "axios";

const BASE_URL = "/api/tmdb/";

/**
 * Fetch a TMDB endpoint through the dev proxy / production rewrite.
 *
 * IMPORTANT: on failure this resolves with the axios Error object instead of
 * throwing. Callers therefore have to detect `result instanceof Error`
 * themselves (see useInfiniteMedia) rather than relying on try/catch.
 */
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
