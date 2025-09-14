import React from 'react';
import type { Page, Mode } from '../types';
import { ShieldIcon } from '../constants/icons';
import { CRISIS_PALETTE } from '../constants/palettes'; // Still need this for the button's crisis color
import { useAppContext } from '../contexts/AppContext';
import BottomNavBar from './BottomNavBar';

// Import all pages
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

// The keys of this object must be string literals that match the type definitions
const pageComponents = {
  ['PREPAREDNESS' as Mode]: {
    ['HOME' as Page]: HomePage,
    ['DRILLS' as Page]: DrillsPage,
    ['MAP' as Page]: MapPage,
    ['PROFILE' as Page]: ProfilePage,
    ['LEARN' as Page]: LearnPage,
    ['SAFETY_KIT' as Page]: SafetyKitPage,
    ['LEADERBOARD' as Page]: LeaderboardPage,
  },
  ['CRISIS' as Mode]: {
    ['HOME' as Page]: CrisisHomePage,
    ['MAP' as Page]: CrisisMapPage,
    ['CONTACTS' as Page]: EmergencyContactsPage,
    ['PROFILE' as Page]: CrisisProfilePage,
    // Defaulting to Crisis Home if other pages don't have a crisis view
    ['DRILLS' as Page]: CrisisHomePage, 
    ['LEARN' as Page]: CrisisHomePage,
    ['SAFETY_KIT' as Page]: CrisisHomePage,
    ['LEADERBOARD' as Page]: CrisisHomePage,
  },
};

const AppNavigator: React.FC = () => {
  const { currentPage, currentMode, PALETTE, toggleMode } = useAppContext();
  
  // Use string literals to access the correct component
  const PageComponent = pageComponents[currentMode][currentPage] || pageComponents[currentMode]['HOME' as Page];

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
            backgroundColor: currentMode === 'PREPAREDNESS' ? PALETTE.accent : CRISIS_PALETTE.accent, 
            color: currentMode === 'PREPAREDNESS' ? PALETTE.background : CRISIS_PALETTE.text_primary,
            boxShadow: PALETTE.button_shadow
          }}
        >
          {currentMode === 'PREPAREDNESS' ? 'Simulate Crisis' : 'End Crisis'}
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4 hide-scrollbar">
        <PageComponent />
      </main>

      <BottomNavBar />
    </>
  );
};

export default AppNavigator;