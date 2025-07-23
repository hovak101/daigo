import React from 'react';
import BackButton from '../components/BackButton';

const CityInfoCollector = ({ onNext, onBack}) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-full p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          What's Your Budget?
        </h1>
       
          <button
            onClick={onNext}
            className="bg-white text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out"
          >
            Next
          </button>
          <BackButton onClick={onBack} />
      </div>
    </div>
  );
};

export default CityInfoCollector;
