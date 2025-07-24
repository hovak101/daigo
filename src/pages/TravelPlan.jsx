import React from 'react';
import BackButton from '../components/BackButton';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const TravelPlanner = ({ onBack, data }) => {

  const handleBack = () => {
    onBack({ budget: '', time: '' });
  };

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="bg-gray-400">One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
      {/* <BackButton onClick={handleBack} /> */}
    </div>
  );
};

export default TravelPlanner;