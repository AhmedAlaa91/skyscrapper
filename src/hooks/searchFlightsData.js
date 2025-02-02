
import { fetchFlights , fetchMultiFlights } from '../api/api';


import { useState, useEffect } from 'react';

export const useFetchFlights = (searchParams) => {
  const [flights, setFlights] = useState([]);
  const [flightLoading, setFlightLoading] = useState(false);
  const [flightError, setFlightError] = useState(null);
  useEffect(() => {
    if (!searchParams) return; // Don't fetch if there are no search parameters

    const getFlights = async () => {
      setFlightLoading(true);
      try {
        const data = await fetchFlights(searchParams);
        console.log(data);
        setFlights(data);
      } catch (err) {
        setFlightError(err.message);
      } finally {
        setFlightLoading(false);
      }
    };

    getFlights();
  }, [searchParams]); // Re-fetch when searchParams changes

  return { flights, flightLoading, flightError };
};




export const useFetchMultiFlights = (searchParams) => {
  const [flights, setFlights] = useState([]);
  const [flightLoading, setFlightLoading] = useState(false);
  const [flightError, setFlightError] = useState(null);

  useEffect(() => {
    if (!searchParams) return; // Don't fetch if there are no search parameters

    const getFlights = async () => {
      setFlightLoading(true);
      try {
        const data = await fetchMultiFlights(searchParams);
        console.log(data);
        setFlights(data);
      } catch (err) {
        setFlightError(err.message);
      } finally {
        setFlightLoading(false);
      }
    };

    getFlights();
  }, [searchParams]); // Re-fetch when searchParams changes

  return { flights, flightLoading, flightError };
};
