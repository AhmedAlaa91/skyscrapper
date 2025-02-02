import React, { useState , useEffect } from 'react';
import { SearchAirportData } from '../../hooks/searchAirportData';
import './flights.css';

const SearchAirport = () => {
  const [queryTarget, setQueryTarget] = useState('');
  const [query, setQuery] = useState(""); 
  const { data, isLoading, isError, error } = SearchAirportData({ query });

  useEffect(() => {
      const timer = setTimeout(() => {
        if (queryTarget.length >= 3) {
          setQuery(queryTarget); // Update debouncedQuery after delay
        }
      }, 500); // Adjust delay time (500ms) as needed
  
      // Cleanup timer if queryTarget changes before the delay
      return () => clearTimeout(timer);
    }, [queryTarget]);
  

  const handleChange = (e) => {
    setQueryTarget(e.target.value);
  };

  return (
    <div className="sky-scraper">
      <input
        type="text"
        value={queryTarget}
        onChange={handleChange}
        placeholder="Enter query"
      />
      {isLoading &&             <p style={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>
                Loading...
            </p>}
      {isError && <p>Error: {error.message}</p>}
      {data && (
         <table border="1" width="100%">
         <thead>
           <tr>
             <th>Sky ID</th>
             <th>Entity ID</th>
             <th>Airport Name</th>
             <th>City Name</th>
           </tr>
         </thead>
         <tbody>
           {data.map((item, index) => (
             <tr key={index}>
               <td>{item.skyId}</td>
               <td>{item.entityId}</td>
               <td>{item.title}</td>
               <td>{item.localizedName}</td>
             </tr>
           ))}
         </tbody>
       </table>
      )}
    </div>
  );
};

export default SearchAirport;
