import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import BackButton from '../components/BackButton';
import { Slider } from "@/components/ui/slider";

// usage: npm dlx shadcn@latest add slider

const CityInfoCollector = ({ onNext, onBack }) => {
  const [budget, setBudget] = useState([0]);
  const [time, setTime] = useState([30]);
  const budgetRef = useRef(null);
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);

  useEffect(() => {
    // Keep the div content in sync if the slider moves it
    if (budgetRef.current) {
        budgetRef.current.textContent = String(budget[0]);
    }
  }, [budget]);

  useEffect(() => {
    const h = Math.floor(time[0] / 60);
    const m = time[0] % 60;
    if (hoursRef.current) {
        hoursRef.current.textContent = String(h);
    }
    if (minutesRef.current) {
        minutesRef.current.textContent = String(m).padStart(2, '0');
    }
  }, [time]);

  const handleNext = () => {
    onNext({ budget: budget[0], time: time[0] });
  };

  const handleBack = () => {
    onBack({ city: '' });
  };

  const totalMinutes = time[0];
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const processAndSetBudget = (currentValue) => {
    const value = parseInt(currentValue, 10);
    if (isNaN(value)) {
      if (budgetRef.current) budgetRef.current.textContent = String(budget[0]);
    } else {
      const clampedValue = Math.max(0, Math.min(100, value));
      setBudget([clampedValue]);
    }
  };

  const processAndSetTime = () => {
    const hVal = (hours > 0 && hoursRef.current) ? parseInt(hoursRef.current.innerText, 10) : 0;
    const mVal = minutesRef.current ? parseInt(minutesRef.current.innerText, 10) : 0;

    const newHours = isNaN(hVal) ? hours : hVal;
    const newMinutes = isNaN(mVal) ? minutes : mVal;

    let newTotalMinutes = (newHours * 60) + newMinutes;
    newTotalMinutes = Math.max(0, Math.min(120, newTotalMinutes));
    setTime([newTotalMinutes]);
  };

  const handleBudgetBlur = (e) => {
    processAndSetBudget(e.target.innerText);
  };

  const handleTimeBlur = () => {
    processAndSetTime();
  };

  const handleBudgetKeyDown = (e) => {
    if (!/\d/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Enter', 'Tab'].includes(e.key)) {
        e.preventDefault();
    }
    if (e.key === 'Enter') {
        e.preventDefault();
        processAndSetBudget(e.target.innerText);
        e.target.blur();
    }
  };

  const handleTimeKeyDown = (e) => {
    if (!/\d/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Enter', 'Tab'].includes(e.key)) {
        e.preventDefault();
    }
    if (e.key === 'Enter') {
        e.preventDefault();
        processAndSetTime();
        e.target.blur();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-full max-w-4xl p-4">
        <div className="grid w-full grid-cols-2 gap-x-12 gap-y-6">
          {/* Titles */}
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Budget
          </h1>
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Time
          </h1>

          {/* Values */}
          <div className="flex h-28 flex-col items-center justify-end">
            <div className="flex h-full flex-col">
              <div className={`h-1/2 ${hours > 0 ? 'visible' : 'invisible'}`} />
              <div className="flex h-1/2 items-center justify-center">
                <div className="flex items-baseline">
                  <span className="text-6xl font-bold text-gray-800">$</span>
                  <div
                    ref={budgetRef}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onBlur={handleBudgetBlur}
                    onKeyDown={handleBudgetKeyDown}
                    className="min-w-[1.5ch] bg-transparent p-0 text-left text-6xl font-bold text-gray-800 focus:outline-none focus:ring-0"
                  >
                    {budget[0]}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-28 flex-col items-center justify-center">
            <div className="inline-grid grid-cols-[auto_auto] grid-rows-2 items-center gap-x-4">
              <Transition
                as={Fragment}
                show={hours > 0}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div
                  ref={hoursRef}
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={handleTimeBlur}
                  onKeyDown={handleTimeKeyDown}
                  className="row-start-1 justify-self-end text-6xl font-bold text-gray-800 focus:outline-none focus:ring-0"
                >
                  {hours}
                </div>
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
              <div
                ref={minutesRef}
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={handleTimeBlur}
                onKeyDown={handleTimeKeyDown}
                className="row-start-2 justify-self-end text-6xl font-bold text-gray-800 focus:outline-none focus:ring-0"
              >
                {String(minutes).padStart(2, '0')}
              </div>
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
          <BackButton onClick={handleBack} />
          <button
            onClick={handleNext}
            className="bg-white text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityInfoCollector;
