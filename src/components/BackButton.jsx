import React from 'react';

const BackButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out"
    >
      Back
    </button>
  );
};

export default BackButton;
