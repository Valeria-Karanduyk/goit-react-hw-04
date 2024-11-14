import axios from "axios";

const API_KEY = "yGKYWcNtRPo1Tz4SPWArNPon3pjum3mqAqkAwFo2CS0";
axios.defaults.baseURL = "https://api.unsplash.com/";

const fetchImg = async (topic, per_page = 10, page = 1) => {
  const params = {
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
    params: {
      per_page,
      page,
      query: topic,
    },
  };
  const response = await axios(`search/photos?`, params);
  return response.data;
};

export default fetchImg;
