import React, { createContext, useState, useContext, type ReactNode } from 'react';
import type { Page, Mode } from '../types';
import { PREPAREDNESS_PALETTE, CRISIS_PALETTE } from '../constants/palettes';

type Palette = typeof PREPAREDNESS_PALETTE;

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  currentMode: Mode;
  PALETTE: Palette;
  toggleMode: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [currentMode, setCurrentMode] = useState<Mode>('PREPAREDNESS');

  const PALETTE = currentMode === 'PREPAREDNESS' ? PREPAREDNESS_PALETTE : CRISIS_PALETTE;

  const toggleMode = () => {
    setCurrentMode(prev => {
      const newMode = prev === 'PREPAREDNESS' ? 'CRISIS' : 'PREPAREDNESS';
      setCurrentPage(newMode === 'CRISIS' ? 'CRISIS_HOME' : 'HOME');
      return newMode;
    });
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentMode('PREPAREDNESS');
    setCurrentPage('HOME');
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    currentPage,
    setCurrentPage,
    currentMode,
    PALETTE,
    toggleMode,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};