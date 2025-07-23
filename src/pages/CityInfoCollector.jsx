import React, { useState } from 'react';
import BackButton from '../components/BackButton';

const CityInfoCollector = ({ onNext, onBack }) => {
  const [budget, setBudget] = useState(null);
  const [time, setTime] = useState(null);

  const budgets = ['$50', '$100', '$200'];
  const times = ['1 day', '3 days', '1 week'];

  const handleNext = () => {
    if (budget && time) {
      onNext({ budget, time });
    }
  };

  const handleBack = () => {
    onBack({ city: '' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-full p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          What's Your Budget?
        </h1>
        <div className="flex space-x-4 mb-8">
          {budgets.map((b) => (
            <button
              key={b}
              onClick={() => setBudget(b)}
              className={`font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out ${
                budget === b
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          How much time do you have?
        </h1>
        <div className="flex space-x-4 mb-8">
          {times.map((t) => (
            <button
              key={t}
              onClick={() => setTime(t)}
              className={`font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out ${
                time === t
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleNext}
            disabled={!budget || !time}
            className="bg-white text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
          <BackButton onClick={handleBack} />
        </div>
      </div>
    </div>
  );
};

export default CityInfoCollector;
