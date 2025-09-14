import React, { useState, useEffect, useRef } from 'react';
import { educationModules, PREPAREDNESS_PALETTE } from '../../constants';

const EducationCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === educationModules.length - 1 ? 0 : prevIndex + 1
        ),
      3000
    );
    return () => resetTimeout();
  }, [currentIndex]);
  
  return (
    <div className="overflow-hidden rounded-2xl" style={{ boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
        <div className="whitespace-nowrap transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)`}}>
            {educationModules.map((module) => (
                <div key={module.title} className="inline-block w-full align-top relative">
                    <div className="w-full h-40 flex items-center justify-center p-4" style={{ backgroundColor: PREPAREDNESS_PALETTE.card }}>
                        <module.thumbnail className="w-3/4 h-3/4 object-contain" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <h3 className="text-white font-bold text-lg">{module.title}</h3>
                        <p className="text-white text-sm">{module.disasterType}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default EducationCarousel;
