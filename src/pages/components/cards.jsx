// src/components/Cards.js
import React, { useEffect, useState } from "react";
import Card from "./card";
// import data from '../../data/data.json';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Cards({
  searchTerm,
  selectedStartDate,
  selectedEndDate,
}) {
  const [listings, setListings] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [likedListings, setLikedListings] = useState([]);
  const [showLiked, setShowLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://airbnb-clone-api-u42k.onrender.com/api/properties"
      );
      const jsonResult = await result.json();
      setListings(jsonResult);
    };
    fetchData();
  }, []);

  const filteredListings = listings.filter(
    (listing) =>
      (searchTerm === "" ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedStartDate ||
        !selectedEndDate ||
        !listing.bookedDates.some(
          (date) => date >= selectedStartDate && date <= selectedEndDate
        ))
  );
  const filteredListingsByPrice = filteredListings.filter(
    (listing) =>
      (searchTerm
        ? listing.location.toLowerCase().includes(searchTerm.toLowerCase())
        : true) &&
      listing.price >= minPrice &&
      listing.price <= maxPrice
  );

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    setMaxPrice(value);
  };

  const handleLike = (listing, liked) => {
    if (liked) {
      setLikedListings((prev) => [...prev, listing]);
    } else {
      setLikedListings((prev) =>
        prev.filter((likedListing) => likedListing !== listing)
      );
    }
  };

  const handleShowLiked = () => {
    setShowLiked(!showLiked);
  };

  const listingsToDisplay = showLiked ? likedListings : filteredListingsByPrice;

  return (
    <div>
      <div className="flex items-center pt-3 px-8 gap-4 mb-3">
        <label htmlFor="minPrice">Min Price:</label>
        <input
          type="number"
          id="minPrice"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="maxPrice">Max Price:</label>
        <input
          type="number"
          id="maxPrice"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
        onClick={handleShowLiked}
        className={`flex flex-row  p-2 rounded-full ${
          showLiked ? 'text-red-500' : 'text-gray-500'
        } transition-colors duration-300 ease-in-out`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={showLiked ? 'red' : 'none'}
          stroke={showLiked ? 'red' : 'currentColor'}
          strokeWidth={2}
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {listingsToDisplay.map((listing, index) => (
          <Card key={index} listing={listing} onLike={handleLike} />
        ))}
      </div>
    </div>
  );
}
