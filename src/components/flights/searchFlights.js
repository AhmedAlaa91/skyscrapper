import React, { useState , useEffect} from 'react';
import './flights.css'
import PassengerDropdown from "./passengersDropDown";
import { SuggestAirportData } from '../../hooks/suggestAirportData';
import { useFetchFlights , useFetchMultiFlights } from '../../hooks/searchFlightsData';

const SearchField = ({ index, tripType, fieldData, onFieldChange }) => {
  const { origin, destination, date , returnDate } = fieldData;
  const [queryTarget, setQueryTarget] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); 
  // const { data, isLoading, isError } = SuggestAirportData({ query: debouncedQuery });


  const useSuggestAirportData = (query) => {
    // This should be your API fetching logic
    const { data, isLoading, isError } =  SuggestAirportData(query);
    return { data, isLoading, isError };
  };

  const { data: originData, isLoading: originLoading, isError: originError } = useSuggestAirportData({query: debouncedQuery});
  const { data: destinationData, isLoading: destinationLoading, isError: destinationError } = useSuggestAirportData({query: debouncedQuery});

  const { data, isLoading, isError } = SuggestAirportData({ query: debouncedQuery });



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


  const handleSwap = () => {
    onFieldChange(index, { origin: destination, destination: origin, date , returnDate });
  };

  return (
    <div className="search-fields">
      <input
        type="text"
        placeholder="From"
        value={origin}
        onChange={(e) => {
          const selectedOption = document.querySelector(`#option-${e.target.value}`);
          const entityId = selectedOption ? selectedOption.dataset.entityid : null;
      
          onFieldChange(index, { 
            ...fieldData, 
            origin: e.target.value, 
            originEntityId: entityId 
          });
          setQueryTarget(e.target.value);
        }}
        list={`origin-suggestions-${index}`}
      />
      <datalist id={`origin-suggestions-${index}`}>
        {isLoading ? <option>Loading...</option> : isError ? <option>Error loading</option> : 
          originData.map((suggestionorg, i) => (
            <option key={i} id={`option-${suggestionorg.skyId}`}  value={suggestionorg.skyId} data-entityid={suggestionorg.entityId}>{suggestionorg.localizedName} ({suggestionorg.skyId})</option>
          ))
        }
      </datalist>

      <span className="swap" onClick={handleSwap}>&#8644;</span>

      <input
        type="text"
        placeholder="To"
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
        list={`destination-suggestions-${index}`}
      />
      <datalist id={`destination-suggestions-${index}`}>
        {isLoading ? <option>Loading...</option> : isError ? <option>Error loading</option> : 
          destinationData.map((suggestion, i) => (
            <option key={i} id={`option-${suggestion.skyId}`}  value={suggestion.skyId} data-entityid={suggestion.entityId}>{suggestion.localizedName} ({suggestion.skyId})</option>
          ))
        }
      </datalist>

      <input type="date" value={date} onChange={(e) => onFieldChange(index, { ...fieldData, date: e.target.value })} />
      {tripType === "Round trip" && <input type="date" value={returnDate} placeholder="Return" onChange={(e) => onFieldChange(index, { ...fieldData, returnDate: e.target.value })}/>}
    </div>
  );
};

const SearchFlights = () => {
  const [tripType, setTripType] = useState("Round trip");
  const [searchFields, setSearchFields] = useState([{ id: 0, origin: "", destination: "", date: "" }]);
  const [searchParams, setSearchParams] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("economy");

  
  const { flights, flightLoading, flightError } = tripType === "Multi-city" 
  // eslint-disable-next-line react-hooks/rules-of-hooks
  ? useFetchMultiFlights(searchParams) 
  // eslint-disable-next-line react-hooks/rules-of-hooks
  : useFetchFlights(searchParams);
  const addSearchField = () => {
    setSearchFields([...searchFields, { id: searchFields.length, origin: "", destination: "", date: "" }]);
  };

  const handleFieldChange = (index, newFieldData) => {
    setSearchFields(searchFields.map((field, i) => (i === index ? newFieldData : field)));
  };

  const handleTripTypeChange = (event) => {
    const selectedTripType = event.target.value;
    setTripType(selectedTripType);
    setSearchFields([{ id: 0, origin: "", destination: "", date: "" }]);
  };

  const handlePassengerChange = (count) => {
    console.log('event.target.value');
    console.log(count);
    setPassengers(count);
  };

  const handleClassChange = (event) => {
    setCabinClass(event.target.value);
  };

  const handleExplore = () => {
    
    if (searchFields.length > 0) {
      
      
      if (tripType!== 'Multi-city') {

      const queryParams = searchFields.reduce((acc, field, index) => {
        acc[`originSkyId`] = field.origin;
        acc[`destinationSkyId`] = field.destination;
        acc[`originEntityId`] = field.originEntityId; // Directly use the stored entityId
        acc[`destinationEntityId`] = field.destinationEntityId; 
        acc[`date`] = field.date;
        if (tripType === "Round trip") {
          acc[`returnDate`] = field.returnDate;
        }
        acc[`cabinClass`] = cabinClass;
        acc[`adults`] = passengers;
        acc[`sortBy`] = "best";
        acc[`currency`] = "USD";
        acc[`market`] = "en-US";
        acc[`countryCode`] = "US";
        return acc;
      }, {});

      console.log(passengers);
  
      setSearchParams(queryParams);
    }
    else{
      const legs = searchFields.map((field, index) => ({
        origin: field.origin,
        originEntityId: field.originEntityId,
        destination: field.destination,
        destinationEntityId: field.destinationEntityId,
        date: field.date,
      
      }));
  
      const queryParams = {
        legs: JSON.stringify(legs), // Stringify the legs array
        cabinClass: cabinClass,
        adults: passengers,
        sortBy: 'best',
        currency: 'USD',
        countryCode: 'US',
        market: 'en-US',
      };
  
      setSearchParams(queryParams);
    }
    }
  };
  


  return (
    <div className="sky-scraper">
      <h1>Flights</h1>
      <div className="search-box">
        <div className="trip-options">
          <select className="passenger-button" id="tripSelect" value={tripType} onChange={handleTripTypeChange}>
            <option value="Round trip">Round trip</option>
            <option value="One way">One way</option>
            <option value="Multi-city">Multi-city</option>
          </select>
          <PassengerDropdown  id="passengerSelect" value={passengers} onChange={handlePassengerChange}/>
          <select className="passenger-button" id="classSelect" value={cabinClass} onChange={handleClassChange}>
            <option value="economy">Economy</option>
            <option value="first">First</option>
            <option value="business">Business</option>
          </select>
        </div>
        {searchFields.map((field, index) => (
          <SearchField key={field.id} index={index} tripType={tripType} fieldData={field} onFieldChange={handleFieldChange} />
        ))}
        <button className="explore-btn" id="explore" onClick={handleExplore}>Explore</button>
        {tripType === "Multi-city" && <button className="add-field-btn" onClick={addSearchField}>+ Add Flight</button>}
      </div>

      <div className="flight-results">
      {flightLoading && (
            <p style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>
                Loading...
            </p>
            )}
        {flightError && <p>Error fetching flights.</p>}
        {flights && flights.map((flightGroup, index) => (
          <div className="flight-cards-container" key={index}>
            {flightGroup.map((flight, idx) => (
              <div className="flight-card" key={idx}>
                <div className="flight-row">
                  <img src={flight.carriers[0].logoUrl} alt={flight.carriers[0].name} className="carrier-logo" />
                  <p className="carrier-name">{flight.carriers[0].name}</p>
                </div>
                <div className="flight-row">
                  <p className="departure-arrival">
                    {new Date(flight.leg.departure).toLocaleTimeString()} - {new Date(flight.leg.arrival).toLocaleTimeString()}
                  </p>
                  <p className="flight-info">
                    {flight.origin.displayCode} - {flight.destination.displayCode}
                  </p>
                </div>
                <div className="flight-row">
                  <p>Stops: {flight.leg.stopCount}</p>
                  <p className="price">{flight.price}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFlights;
