import React, { useState, useRef, useLayoutEffect } from 'react';
import CitySearch from '../components/CitySearch';

// List Data for CitySearch
const DATA = [
    {
        id: 0, 
        city: "San Jose",
        dist: 7.3
    },
    {
        id: 1, 
        city: "San Francisco",
        dist: 38
    },
    {
        id: 2,
        city: "London",
        dist: 4021
    }
]

const CitySelector = ({ onNext }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [popoutStyles, setPopoutStyles] = useState({});
  const [placeholderHeight, setPlaceholderHeight] = useState(null);
  const searchContainerRef = useRef(null);
  const wasActiveRef = useRef(false);

  const isActive = !!inputValue || isFocused;

  useLayoutEffect(() => {
    const wasActive = wasActiveRef.current;
    if (isActive && !wasActive) {
      const rect = searchContainerRef.current.getBoundingClientRect();
      setPopoutStyles({
        position: 'absolute',
        top: rect.top,
        left: rect.left,
        width: rect.width,
        zIndex: 50,
      });
      setPlaceholderHeight(rect.height);
    } else if (!isActive && wasActive) {
      setTimeout(() => {
        setPopoutStyles({});
        setPlaceholderHeight(null);
      }, 400); // Corresponds to the animation duration
    }
    wasActiveRef.current = isActive;
  }, [isActive]);


  const handleInputChange = (value) => {
    setInputValue(value);
  }

  const handleFocusChange = (focused) => {
    setIsFocused(focused);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-full p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          What City Would You Like To Explore?
        </h1>
        <div
          ref={searchContainerRef}
          className="w-full max-w-2xl"
          style={placeholderHeight ? { height: placeholderHeight } : {}}
        >
          <div style={popoutStyles}>
            <CitySearch
              onNext={onNext}
              nearbyLocations={DATA}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              onFocusChange={handleFocusChange}
              isFocused={isFocused}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
