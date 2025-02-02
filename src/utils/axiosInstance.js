import axios from 'axios';
console.log(process.env.REACT_APP_SKY_SCRAPPER_API_KEY);
export const axiosInstance = axios.create({
  
  baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/',  // Replace with actual base URL
  headers: {
    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_SKY_SCRAPPER_API_KEY,  // Use your RapidAPI key
  },
});

export const axiosInstanceV2 = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v2/flights/',  // Replace with actual base URL
  headers: {
    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_SKY_SCRAPPER_API_KEY,  // Use your RapidAPI key
  },
});



export const axiosInstanceHotels = axios.create({
  baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1/hotels/',  // Replace with actual base URL
  headers: {
    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_SKY_SCRAPPER_API_KEY,  // Use your RapidAPI key
  },
});






