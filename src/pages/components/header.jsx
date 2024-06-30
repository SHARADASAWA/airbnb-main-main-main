// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import data from '../../data/data.json';

export default function Header({ onSearch, onDateFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  useEffect(() => {
    // Extract unique locations from the data file
    const uniqueLocations = [...new Set(data.map(listing => listing.location))];
    setLocations(uniqueLocations);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filteredSuggestions = locations.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleSearch = () => {
    if (searchTerm && selectedStartDate && selectedEndDate) {
      onSearch(searchTerm);
      onDateFilter(selectedStartDate, selectedEndDate);
    } else {
      alert("Please fill in both location and date fields.");
    }
  };

  const handleDateChange = (date, type) => {
    if (type === 'start') {
      setSelectedStartDate(date);
    } else if (type === 'end') {
      setSelectedEndDate(date);
    }
  };

  return (
    <header className="flex flex-col md:flex-row md:justify-between gap-32 items-center bg-white p-4 border-b border-gray-200">
      <a href="#" className="flex items-center gap-1 mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-8 h-8 -rotate-90">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
        <span className="font-bold  text-xl text-primary">airbnb</span>
      </a>

      <div className="relative flex justify-center mr-96 flex-col md:flex-row gap-2 items-center bg-white border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 w-full md:full">
        
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder=" Search locations "
          className="flex-grow border border-gray-300 rounded-full px-4 focus:ring-0 outline-none"
        />
        <input
          type="date"
          value={selectedStartDate}
          onChange={(e) => handleDateChange(e.target.value, 'start')}
          className="border border-gray-300 rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-36"
        />
        <span>-</span>
        <input
          type="date"
          value={selectedEndDate}
          placeholder='CheckIn Date'
          onChange={(e) => handleDateChange(e.target.value, 'end')}
          className="border border-gray-300 rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-36"
        />
        <button onClick={handleSearch} className="bg-primary text-white p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
        {suggestions.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 z-10 w-60 left-0 top-full">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      
  
  
      
    </header>
  );
}
