import React, { useState , useEffect} from 'react';
import './hotels.css'
import PassengerDropdown from "./passengersDropDown";
import RoomsDropdown from "./roomsDropDown";
import { SearchDestinationData } from '../../hooks/searchDestinationData';
import { useFetchHotels } from '../../hooks/fetchHotelsData';

const SearchField = ({ index, tripType, fieldData, onFieldChange }) => {
  const {  destination, date,returnDate  } = fieldData;
  const [queryTarget, setQueryTarget] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); 
  // const { data, isLoading, isError } = SuggestAirportData({ query: debouncedQuery });


  const useSuggestDestinationData = (query) => {
    // This should be your API fetching logic
    const { data, isLoading, isError } =  SearchDestinationData(query);
    return { data, isLoading, isError };
  };


  const { data, isLoading, isError } = useSuggestDestinationData({ query: debouncedQuery });
  


  useEffect(() => {
    const timer = setTimeout(() => {
      if (queryTarget.length >= 3) {
        setDebouncedQuery(queryTarget); // Update debouncedQuery after delay
      }
    }, 500); // Adjust delay time (500ms) as needed

    // Cleanup timer if queryTarget changes before the delay
    return () => clearTimeout(timer);
  }, [queryTarget]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (queryTarget.length >= 3) {
        setDebouncedQuery(queryTarget); // Update debouncedQuery after delay
      }
    }, 500); // Adjust delay time (500ms) as needed

    // Cleanup timer if queryTarget changes before the delay
    return () => clearTimeout(timer);
  }, [queryTarget]);



  return (
    <div className="search-fields">
      <input
        type="text"
        placeholder="destination"
        value={destination}
        onChange={(e) => {
          const selectedOption = document.querySelector(`#option-${e.target.value}`);
          const entityId = selectedOption ? selectedOption.dataset.entityid : null;
      
          onFieldChange(index, { 
            ...fieldData, 
            destination: e.target.value, 
            destinationEntityId: entityId 
          });
          setQueryTarget(e.target.value);
        }}
        list={`origin-suggestions-${index}`}
      />
      <datalist id={`origin-suggestions-${index}`}>
        {isLoading ? <option>Loading...</option> : isError ? <option>Error loading</option> : 
          data.map((suggestionorg, i) => (
            <option key={i} id={`option-${suggestionorg.name}`}  value={suggestionorg.name} data-entityid={suggestionorg.entityId}>{suggestionorg.name} </option>
          ))
        }
      </datalist>


      <input type="date" value={date} onChange={(e) => onFieldChange(index, { ...fieldData, date: e.target.value })} />
      <input type="date" value={returnDate} placeholder="Return" onChange={(e) => onFieldChange(index, { ...fieldData, returnDate: e.target.value })}/>
    </div>
  );
};

const SearchHotels = () => {
  const [tripType, setTripType] = useState("Round trip");
  const [searchFields, setSearchFields] = useState([{ id: 0, origin: "", destination: "", date: "" }]);
  const [searchParams, setSearchParams] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [cabinClass, setCabinClass] = useState("Economy");

  
  const { hotels, loadingHotels, errorHotels } = useFetchHotels(searchParams);
  const addSearchField = () => {
    setSearchFields([...searchFields, { id: searchFields.length, origin: "", destination: "", date: "" }]);
  };

  const handleFieldChange = (index, newFieldData) => {
    setSearchFields(searchFields.map((field, i) => (i === index ? newFieldData : field)));
  };


  const handleRoomChange = (count) => {
    setRooms(count);
  };
  const handlePassengerChange = (count) => {
    setPassengers(count);
  };




  const handleExplore = () => {
    
    if (searchFields.length > 0) {
      
      
      

      const queryParams = searchFields.reduce((acc, field, index) => {
        acc[`entityId`] = field.destinationEntityId;
        acc[`checkin`] = field.date;
        acc[`checkout`] = field.returnDate; // Directly use the stored entityId
        acc[`adults`] = passengers;
        acc[`rooms`] = rooms;
        acc[`limit`] = "10";
        acc[`sorting`] = "-relevance";
        acc[`currency`] = "USD";
        acc[`market`] = "en-US";
        acc[`countryCode`] = "US";
        return acc;
      }, {});
  
      setSearchParams(queryParams);


    }
  };
  


  return (
    <div className="sky-scraper">
      <h1>Hotels</h1>
      <div className="search-box">
        <div className="trip-options">
          <RoomsDropdown id="roomSelect" value={rooms} onChange={handleRoomChange}/>
          <PassengerDropdown  id="passengerSelect" value={passengers} onChange={handlePassengerChange}/>

        </div>
        {searchFields.map((field, index) => (
          <SearchField key={field.id} index={index} tripType={tripType} fieldData={field} onFieldChange={handleFieldChange} />
        ))}
        <button className="explore-btn" id="explore" onClick={handleExplore}>Explore</button>
      </div>

    <div className="hotel-results">
    {loadingHotels && (
            <p style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>
                Loading...
            </p>
            )}
        {errorHotels && <p>Error fetching Hotels.</p>}
        {hotels && hotels.map((hotel, index) => (
            <div className="hotel-card" key={index}>
            <img src={hotel.heroImage} alt={hotel.name} className="hotel-image" />
            <h3 className="hotel-name">{hotel.name}</h3>
            <p className="hotel-stars">⭐ {hotel.stars} Stars</p>
            <p className="hotel-distance">{hotel.distance}</p>
            <p className="hotel-price">{hotel.price}</p>
            <p className="hotel-price-description">{hotel.priceDescription}</p>
            </div>
        ))}
        </div>

    </div>
  );
};

export default SearchHotels;
