import React from 'react';
import NavigationButton from "../components/NavigationButton";
import ModuleContent from "../components/ModuleContent";
import ProgressBar from "../components/ProgressBar";

const TrainingModulePage: React.FC = () => {
  const content = [
    'Importance of PPE: Explain the significance of PPE in preventing injuries and illnesses in the workplace.',
    'Types of PPE: Introduce various types of PPE, such as hard hats, safety glasses, gloves, earplugs, respirators, and steel-toed boots.',
    'Proper Use and Maintenance: Demonstrate how to properly use and maintain PPE, including inspection procedures and storage guidelines.',
  ];
  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-start">
        <div className="w-2/3">
          <ModuleContent title="Module 1: Personal Protective Equipment (PPE)" content={content} />
        </div>
        <div className="w-1/3">
          <ProgressBar progress={1} total={8} />
          {
            //
            //<VideoPlayer videoSrc="/path/to/video.mp4" />
          }
        </div>
      </div>
      <NavigationButton nextModule={2} />
    </div>
  );
};

export default TrainingModulePage;
