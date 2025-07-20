import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import searchIcon from '../assets/svgs/search.svg';
import CitySearchListItem from './CitySearchListItem';

const AnimatedListItem = ({ location, onSelect }) => {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto', transition: { duration: 0.2, ease: "easeOut" } }}
      exit={{ opacity: 0, height: 0, transition: { duration: 0.15, ease: "easeIn" } }}
    >
      <CitySearchListItem
        city={location.city}
        dist={location.dist}
        onSelect={() => onSelect(location.city)}
      />
    </motion.div>
  );
};

const CitySearch = ({ nearbyLocations, inputValue, onInputChange, isTyping, onFocusChange, isFocused }) => {
  const maxBorderRadius = "60px";
  const focusedBorderRadius = "32px";
  
  const cities = ["San Francisco", "Los Angeles", "New York"];
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [animationPhase, setAnimationPhase] = useState('typing');
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // This effect handles the placeholder text animation
  useEffect(() => {
    if (isFocused || inputValue) {
      // Pause animation when the user is interacting with the search box.
      setAnimationPhase('pausing');
      return;
    }

    let timeoutId;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseDuration = 1000;

    if (animationPhase === 'typing') {
      const currentCity = cities[currentCityIndex];
      if (displayText.length < currentCity.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentCity.slice(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        timeoutId = setTimeout(() => setAnimationPhase('pausing'), pauseDuration);
      }
    } else if (animationPhase === 'pausing') {
      timeoutId = setTimeout(() => {
        setAnimationPhase('deleting');
      }, pauseDuration);
    } else if (animationPhase === 'deleting') {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
      } else {
        setAnimationPhase('typing');
        setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [cities, currentCityIndex, displayText, animationPhase, isFocused, inputValue]);

  const filteredLocations = nearbyLocations.filter((location) =>
    location.city.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleFocus = () => {
    onFocusChange(true);
  };

  const handleBlur = () => {
    // Use a small timeout to allow click events on dropdown items
    setTimeout(() => {
      if (containerRef.current && !containerRef.current.contains(document.activeElement)) {
        onFocusChange(false);
        if (!inputValue) {
          setCurrentCityIndex(0);
          setAnimationPhase('typing');
          setDisplayText('');
        }
      }
    }, 100);
  };

  const handleSelectCity = (city) => {
    onInputChange(city);
    onFocusChange(false);
  };

  return (
    <div ref={containerRef} className="flex justify-center items-center w-full">
      <motion.div
        initial={{ 
          borderRadius: maxBorderRadius
        }}
        animate={{ 
          borderRadius: isFocused ? focusedBorderRadius : maxBorderRadius
        }}
        className="relative w-full max-w-2xl bg-white border-2 border-gray-200 shadow-lg overflow-hidden"
        transition={{ 
          borderRadius: { duration: 0.4, ease: "easeInOut" }
        }}
      >
        <motion.div layout="position" className="relative w-full">
          {/* Custom placeholder with blinking cursor */}
          {!isFocused && !inputValue && (
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 pointer-events-none">
              {displayText}
              <span className="cursor-blink -ml-px">|</span>
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              onInputChange(e.target.value);
            }}
            placeholder=""
            className="w-full px-6 py-4 text-lg bg-transparent placeholder-gray-400 focus:outline-none pr-14"
          />
          <button
            onClick={() => console.log(inputValue)}
            className="absolute top-0 right-0 h-full w-14 flex items-center justify-center hover:bg-gray-100 focus:bg-gray-100 focus:outline-none cursor-pointer"
          >
            <img src={searchIcon} className="w-6 h-6 text-gray-400" />
          </button>
        </motion.div>
        <AnimatePresence>
          {isFocused && (
            <motion.div
              key="dropdown"
              style={{ position: 'relative' }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
              }}
            >
              <AnimatePresence mode="popLayout">
                {filteredLocations.map((location) => (
                  <AnimatedListItem
                    key={location.id}
                    location={location}
                    onSelect={handleSelectCity}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CitySearch;
