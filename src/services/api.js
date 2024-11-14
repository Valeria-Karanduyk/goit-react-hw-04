import axios from "axios";

const API_KEY = "yGKYWcNtRPo1Tz4SPWArNPon3pjum3mqAqkAwFo2CS0";
axios.defaults.baseURL = "https://api.unsplash.com/";

const params = {
  headers: {
    Authorization: `Client-ID ${API_KEY}`,
  },
};

const fetchImg = async (topic, per_page = 10, page = 1) => {
  const response = await axios(
    `search/photos?page=${page}&per_page=${per_page}query=${topic}`,
    params
  );
  return response.data;
};

export default fetchImg;
