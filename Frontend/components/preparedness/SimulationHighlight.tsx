import React, { useState, useEffect, useRef } from 'react';
import { simulations, ChevronRightIcon, PlayIcon } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';
import { Page } from '../../types';

const SimulationHighlight: React.FC = () => {
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
          prevIndex === simulations.length - 1 ? 0 : prevIndex + 1
        ),
      3000
    );
    return () => resetTimeout();
  }, [currentIndex]);


  const handleNavigateToList = () => {
    setCurrentPage(Page.SIMULATION_LIST);
  };

  const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
        case 'Easy':
            return '#28a745'; // Green
        case 'Medium':
            return '#ffc107'; // Yellow/Orange
        case 'Hard':
            return '#dc3545'; // Red
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold" style={{ color: PALETTE.text_primary }}>Situation Simulation Games</h3>
        <button onClick={handleNavigateToList} className="text-sm font-semibold p-1 rounded-lg flex items-center" style={{ color: PALETTE.accent }}>
          View All <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
      <div 
        className="overflow-hidden rounded-2xl cursor-pointer" 
        style={{ boxShadow: PALETTE.button_shadow, height: '140px' }}
        onClick={handleNavigateToList}
      >
        <div 
          className="whitespace-nowrap transition-transform duration-500 h-full" 
          style={{ transform: `translateX(-${currentIndex * 100}%)`}}
        >
          {simulations.map(sim => (
             <div
                key={sim.id}
                className="inline-block w-full h-full align-top relative"
            >
                <img src={sim.thumbnail} alt={sim.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                    <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full">
                        <PlayIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white whitespace-normal">{sim.title}</h4>
                        <p className="text-sm font-semibold" style={{ color: getDifficultyColor(sim.difficulty) }}>
                            {sim.difficulty}
                        </p>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimulationHighlight;