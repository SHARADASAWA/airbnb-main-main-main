// src/Mainpage.js
import React, { useState } from 'react';
import Header from './components/header';
import Cards from './components/cards';

export default function Mainpage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDateFilter = (startDate, endDate) => {
    setSelectedStartDate(startDate);
    setSelectedEndDate(endDate);
  };

  return (
    <>
      <Header onSearch={handleSearch} onDateFilter={handleDateFilter} />
      <Cards searchTerm={searchTerm} selectedStartDate={selectedStartDate} selectedEndDate={selectedEndDate} />
    </>
  );
}
