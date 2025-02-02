import { useQuery } from 'react-query';
import { searchDestinations } from '../api/api';

export const SearchDestinationData = (queryParams) => {
  return useQuery(['query', queryParams], () => searchDestinations(queryParams), {
    enabled: !!queryParams,  // Only run query if queryParams are provided
    retry: 2,  // Retry 2 times on failure
    refetchOnWindowFocus: false,  // Don't refetch on window focus
  });
};