
import {fetchHotelsApi} from '../api/api'


import { useState, useEffect } from 'react';

export const useFetchHotels = (searchParams) => {
  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [errorHotels, setErrorHotels] = useState(null);

  useEffect(() => {
    if (!searchParams) return; // Don't fetch if there are no search parameters

    const getHotels = async () => {
        setLoadingHotels(true);
      try {

        const data = await fetchHotelsApi(searchParams);
        setHotels(data);
      } catch (err) {
        setErrorHotels(err.message);
      } finally {
        setLoadingHotels(false);
      }
    };

    getHotels();
  }, [searchParams]); // Re-fetch when searchParams changes

  return { hotels, loadingHotels, errorHotels };
};


