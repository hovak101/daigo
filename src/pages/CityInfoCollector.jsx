import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import BackButton from '../components/BackButton';
import { Slider } from "@/components/ui/slider";

// usage: npm dlx shadcn@latest add slider

const CityInfoCollector = ({ onNext, onBack }) => {
  const [budget, setBudget] = useState([0]);
  const [time, setTime] = useState([30]);

  const handleNext = () => {
    onNext({ budget: budget[0], time: time[0] });
  };

  const handleBack = () => {
    onBack({ city: '' });
  };

  const totalMinutes = time[0];
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-full max-w-4xl p-4">
        <div className="grid w-full grid-cols-2 gap-x-12 gap-y-6">
          {/* Titles */}
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            What's Your Budget?
          </h1>
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            How much time do you have?
          </h1>

          {/* Values */}
          <div className="flex h-28 flex-col items-center justify-end">
            <div className="flex h-full flex-col">
              <div className={`h-1/2 ${hours > 0 ? 'visible' : 'invisible'}`} />
              <div className="flex h-1/2 items-center">
                <p className="text-center text-6xl font-bold text-gray-800">${budget[0]}</p>
              </div>
            </div>
          </div>
          <div className="flex h-28 flex-col items-center justify-center">
            <div className="inline-grid grid-cols-[auto_auto] grid-rows-2 items-center gap-x-4">
              <Transition
                as="p"
                show={hours > 0}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="row-start-1 justify-self-end text-6xl font-bold text-gray-800"
              >
                {hours}
              </Transition>
              <Transition
                as="p"
                show={hours > 0}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="row-start-1 justify-self-start text-4xl font-semibold text-gray-700"
              >
                hours
              </Transition>
              <p className="row-start-2 justify-self-end text-6xl font-bold text-gray-800">{String(minutes).padStart(2, '0')}</p>
              <p className="row-start-2 justify-self-start text-4xl font-semibold text-gray-700">minutes</p>
            </div>
          </div>

          {/* Sliders */}
          <Slider
            value={budget}
            onValueChange={setBudget}
            max={100}
            step={1}
            className="w-full"
          />
          <Slider
            value={time}
            onValueChange={setTime}
            max={120}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex space-x-4 mt-8">
          <button
            onClick={handleNext}
            className="bg-white text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out"
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
