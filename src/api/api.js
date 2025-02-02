import {axiosInstance , axiosInstanceV2 , axiosInstanceHotels} from '../utils/axiosInstance';



export const fetchHotelsApi = async (queryParams) => {
  console.log(queryParams);

  const response = await axiosInstanceHotels.get('searchHotels', { params: queryParams });

  if (!response.data || typeof response.data !== 'object') {
    throw new Error("Invalid API response format");
  }

 

  return Object.values(response.data.data.hotels).map((item) => ({
    hotelId: item.hotelId,
    heroImage: item.heroImage,
    name: item.name,
    stars: item.stars,
    distance: item.distance,
    price: item.price,
    priceDescription: item.priceDescription,
  }));
};


export const searchAirport= async (queryParams) => {
  const response = await axiosInstance.get('searchAirport', { params: queryParams });
  if (!response.data || !Array.isArray(response.data.data)) {
    throw new Error("Invalid API response format");
  }

  return response.data.data.map((item) => ({
    skyId: item.skyId,
    entityId: item.entityId,
    title: item.presentation?.suggestionTitle || "N/A",
    localizedName: item.navigation?.relevantHotelParams?.localizedName || "N/A",
  }));
};



export const suggestAirport= async (queryParams) => {
    const response = await axiosInstance.get('searchAirport', { params: queryParams });
    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid API response format");
    }
  
    return response.data.data.map((item) => ({
      skyId: item.skyId,
      entityId: item.entityId,
      localizedName: item.navigation?.relevantHotelParams?.localizedName || "N/A",
    }));
  };




  export const fetchFlights = async (params) => {
    try {
      const response = await axiosInstanceV2.get('searchFlights', { params });
      const itineraries = response.data.data.itineraries.map(itinerary => {
        return itinerary.legs.map(leg => {
          // Extracting price formatted
          const priceFormatted = itinerary.price.formatted;
      
          // Extracting origin details
          const origin = leg.origin;
          const originDetails = {
            displayCode: origin.displayCode,
            name: origin.name,
            country: origin.country
          };
      
          // Extracting destination details
          const destination = leg.destination;
          const destinationDetails = {
            displayCode: destination.displayCode,
            name: destination.name,
            country: destination.country
          };
      
          // Extracting leg details
          const legDetails = {
            duration: leg.durationInMinutes,
            stopCount: leg.stopCount,
            departure: leg.departure,
            arrival: leg.arrival
          };
          const carriersDetails = leg.carriers.marketing.map(carrier => ({
            name: carrier.name,
            logoUrl: carrier.logoUrl
          }));
      
      
          return {
            price: priceFormatted,
            origin: originDetails,
            destination: destinationDetails,
            leg: legDetails,
            carriers: carriersDetails
          };
        });
      });
      
      return itineraries || [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch flights');
    }
  };





  export const fetchMultiFlights = async (params) => {
    try {
      const response = await axiosInstance.get('searchFlightsMultiStops', { params });
      const itineraries = response.data.data.itineraries.map(itinerary => {
        return itinerary.legs.map(leg => {
          // Extracting price formatted
          const priceFormatted = itinerary.price.formatted;
      
          // Extracting origin details
          const origin = leg.origin;
          const originDetails = {
            displayCode: origin.displayCode,
            name: origin.name,
            country: origin.country
          };
      
          // Extracting destination details
          const destination = leg.destination;
          const destinationDetails = {
            displayCode: destination.displayCode,
            name: destination.name,
            country: destination.country
          };
      
          // Extracting leg details
          const legDetails = {
            duration: leg.durationInMinutes,
            stopCount: leg.stopCount,
            departure: leg.departure,
            arrival: leg.arrival
          };
          const carriersDetails = leg.carriers.marketing.map(carrier => ({
            name: carrier.name,
            logoUrl: carrier.logoUrl
          }));
      
      
          return {
            price: priceFormatted,
            origin: originDetails,
            destination: destinationDetails,
            leg: legDetails,
            carriers: carriersDetails
          };
        });
      });
      
      return itineraries || [];
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch flights');
    }
  };






  export const searchDestinations= async (queryParams) => {
    const response = await axiosInstanceHotels.get('searchDestinationOrHotel', { params: queryParams });
    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid API response format");
    }
  
    return response.data.data.map((item) => ({
      name: item.entityName,
      entityId: item.entityId,
    }));
  };


