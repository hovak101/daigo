import React, { useState } from 'react';
import CitySelector from './pages/CitySelector';
import CityInfoCollector from './pages/CityInfoCollector';
import TravelPlanner from './pages/TravelPlan';

function App() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
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
      render = <TravelPlanner onBack={handleBackStep} />;
      break;
  }

  return (
    <div className="bg-orange-400">
      {render}
    </div>
  );
}

export default App;
