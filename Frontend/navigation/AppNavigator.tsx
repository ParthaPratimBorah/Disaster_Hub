import React from 'react';
import { Page, Mode } from '../types';
import { ShieldIcon, CRISIS_PALETTE } from '../constants';
import { useAppContext } from '../contexts/AppContext';

import HomePage from '../pages/preparedness/HomePage';
import DrillsPage from '../pages/preparedness/DrillsPage';
import MapPage from '../pages/preparedness/MapPage';
import ProfilePage from '../pages/preparedness/ProfilePage';
import LearnPage from '../pages/preparedness/LearnPage';
import SafetyKitPage from '../pages/preparedness/SafetyKitPage';
import LeaderboardPage from '../pages/preparedness/LeaderboardPage';
import CrisisHomePage from '../pages/crisis/CrisisHomePage';
import CrisisMapPage from '../pages/crisis/CrisisMapPage';
import EmergencyContactsPage from '../pages/crisis/EmergencyContactsPage';
import CrisisProfilePage from '../pages/crisis/CrisisProfilePage';
import BottomNavBar from './BottomNavBar';


const AppNavigator: React.FC = () => {
  const { currentPage, currentMode, PALETTE, toggleMode } = useAppContext();
  
  const renderPage = () => {
    if (currentMode === Mode.CRISIS) {
      switch (currentPage) {
        case Page.CRISIS_HOME:
        case Page.HOME:
          return <CrisisHomePage />;
        case Page.CRISIS_MAP:
        case Page.MAP:
          return <CrisisMapPage />;
        case Page.CONTACTS:
          return <EmergencyContactsPage />;
        case Page.CRISIS_PROFILE:
        case Page.PROFILE:
          return <CrisisProfilePage />;
        default:
          return <CrisisHomePage />;
      }
    }
    
    switch (currentPage) {
      case Page.HOME:
        return <HomePage />;
      case Page.DRILLS:
        return <DrillsPage />;
      case Page.MAP:
        return <MapPage />;
      case Page.PROFILE:
        return <ProfilePage />;
      case Page.LEARN:
        return <LearnPage />;
      case Page.SAFETY_KIT:
        return <SafetyKitPage />;
      case Page.LEADERBOARD:
        return <LeaderboardPage />;
      default:
        return <HomePage />;
    }
  };
  
  return (
    <>
      <header 
          className="sticky top-0 z-20 p-4 flex justify-between items-center"
          style={{ backgroundColor: PALETTE.background, boxShadow: `0 2px 4px ${PALETTE.shadow_dark}30` }}
      >
          <div className="flex items-center gap-2">
              <ShieldIcon className="w-6 h-6" style={{ color: PALETTE.text_primary }} />
              <h1 className="text-xl font-bold" style={{ color: PALETTE.text_primary }}>Disaster Hub</h1>
          </div>
          <button 
              onClick={toggleMode}
              className="px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300"
              style={{ 
                  backgroundColor: currentMode === Mode.PREPAREDNESS ? PALETTE.accent : CRISIS_PALETTE.accent, 
                  color: currentMode === Mode.PREPAREDNESS ? PALETTE.background : CRISIS_PALETTE.text_primary,
                  boxShadow: PALETTE.button_shadow
              }}
          >
              {currentMode === Mode.PREPAREDNESS ? 'Simulate Crisis' : 'End Crisis'}
          </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 hide-scrollbar">
        {renderPage()}
      </main>

      <BottomNavBar />
    </>
  );
};

export default AppNavigator;
