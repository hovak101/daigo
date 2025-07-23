import React from 'react';
import BackButton from '../components/BackButton';

const TravelPlanner = ({onBack}) => {

  const handleBack = () => {
    onBack({ budget: '', time: '' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-full p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          In Travel
        </h1>
        <BackButton onClick={handleBack} />
      </div>
    </div>
  );
};

export default TravelPlanner;