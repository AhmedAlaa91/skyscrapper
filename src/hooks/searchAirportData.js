import { useQuery } from 'react-query';
import { searchAirport } from '../api/api';



export const SearchAirportData = (queryParams) => {
  const { data, isLoading, isError } = useQuery(
    ['query', queryParams],
    () => searchAirport(queryParams),
    {
      enabled: !!queryParams,  // Only run query if queryParams are provided
      retry: 2,  // Retry 2 times on failure
      refetchOnWindowFocus: false,  // Don't refetch on window focus
    }
  );

  return { data, isLoading, isError };
};