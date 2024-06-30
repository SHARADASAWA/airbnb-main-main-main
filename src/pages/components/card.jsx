import React, { useState } from 'react';

export default function Card({ listing, onLike }) {
  const { title, location, price, amenities, img } = listing;
  const [liked, setLiked] = useState(false);
  

  const handleLikeClick = () => {
    setLiked(!liked);
    onLike(listing, !liked);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg relative">
      <img src={img} alt={title} className="w-full h-48 object-cover object-center" />
      <button
        onClick={handleLikeClick}
        className={`absolute top-2 right-2 p-2 rounded-full ${
          liked ? 'text-red-500' : 'text-gray-500'
        } transition-colors duration-300 ease-in-out`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={liked ? 'red' : 'none'}
          stroke={liked ? 'red' : 'currentColor'}
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
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">{location}</p>
        <p className="text-lg font-bold mb-2">${price}/night</p>
        <ul className="flex flex-wrap gap-2">
          {amenities.map((amenity, index) => (
            <li key={index} className="text-sm text-gray-500">{amenity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
