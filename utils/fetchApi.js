import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "x-rapidapi-host": "bayut.p.rapidapi.com",
      "x-rapidapi-key": "f970a9bd66msh32a614f87e37834p1dfb19jsne01d9c8490dd",
    },
  });

  return data;
};
