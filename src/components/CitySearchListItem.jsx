import React from 'react';

const CitySearchListItem = ({ city, dist, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className="flex items-center justify-between w-full px-6 py-3 text-left hover:bg-gray-100 focus:outline-none"
    >
      <div className="flex items-center">
        <span className="text-lg text-gray-800">{city}</span>
      </div>
      <span className="text-sm text-gray-500">{dist} miles</span>
    </button>
  );
};

export default CitySearchListItem;
