import React, { useState, useEffect } from 'react';
import CitySelector from './pages/CitySelector';
import CityInfoCollector from './pages/CityInfoCollector';
import TravelPlanner from './pages/TravelPlan';
import Loading from './pages/Loading';

function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    city: "", 
    budget: -1,
    time: -1,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (step === 3) {
      setIsLoading(true);

      
      const timer = setTimeout(() => {
        setIsLoading(false); // After 3 seconds, hide loading screen
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [step]);

  useEffect(() => {
    console.log("Data updated:", data);
  }, [data]);

  const handleNextStep = (componentData) => {
    setData(prevData => ({...prevData, ...componentData}));
    setStep(prevStep => prevStep + 1);
  };

  const handleBackStep = (componentData) => {
    // setData(prevData => {
    //   // 1. Create a mutable copy of the previous data.
    //   const newData = { ...prevData };

    //   // 2. Loop over the keys in the object passed from the child
    //   //    (e.g., for an object { interests: 'some value' }, the key is 'interests').
    //   for (const key in componentData) {
    //     // 3. Delete that key from the new copy.
    //     delete newData[key];
    //   }

    //   // 4. Return the new object, which is now missing the removed keys.
    //   return newData;
    // });
    
    setStep(prevStep => prevStep - 1);
  }

  let render;

  switch (step) {
    case 1: 
      render = <CitySelector onNext={handleNextStep} />;
      break;
    case 2:
      render = <CityInfoCollector onNext={handleNextStep} onBack={handleBackStep}/>;
      break;
    case 3:
      render = (step === 3 && isLoading)
        ? <Loading/>
        : <TravelPlanner onBack={handleBackStep} data={data}/>;
      break;
  }

  return (
    <div className="bg-orange-400">
      {render}
    </div>
  );
}

export default App;
