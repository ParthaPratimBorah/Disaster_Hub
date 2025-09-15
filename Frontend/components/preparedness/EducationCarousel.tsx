import React, { useState, useEffect, useRef } from 'react';
import { educationModules } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';
import { Page } from '../../types';

const EducationCarousel: React.FC = () => {
  const { setCurrentPage, PALETTE } = useAppContext();
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
  
  const handleNavigateToLearn = () => {
    setCurrentPage(Page.LEARN);
  };
  
  return (
    <button
      onClick={handleNavigateToLearn}
      className="w-full text-left overflow-hidden rounded-2xl"
      style={{ boxShadow: PALETTE.button_shadow }}
      aria-label="View all education modules"
    >
        <div className="whitespace-nowrap transition-transform duration-500 pointer-events-none" style={{ transform: `translateX(-${currentIndex * 100}%)`}}>
            {educationModules.map((module) => (
                <div key={module.title} className="inline-block w-full h-40 align-top relative">
                    <img src={module.thumbnail} alt={module.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 w-full p-4">
                        <h3 className="text-white font-bold text-lg [text-shadow:1px_1px_3px_rgba(0,0,0,0.8)]">{module.title}</h3>
                        <p className="text-white text-sm [text-shadow:1px_1px_3px_rgba(0,0,0,0.8)]">{module.disasterType}</p>
                    </div>
                </div>
            ))}
        </div>
    </button>
  );
};

export default EducationCarousel;