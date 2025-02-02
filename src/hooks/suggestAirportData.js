
import { useQuery } from 'react-query';
import { suggestAirport } from '../api/api';

export const SuggestAirportData = (queryParams) => {
  return useQuery(['query', queryParams], () => suggestAirport(queryParams), {
    enabled: !!queryParams,  // Only run query if queryParams are provided
    retry: 2,  // Retry 2 times on failure
    refetchOnWindowFocus: false,  // Don't refetch on window focus
  });
};