import React, { useState } from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AppNavigator from './navigation/AppNavigator';
import { PREPAREDNESS_PALETTE } from './constants';
import { Page } from './types';

const Auth: React.FC = () => {
  const { setIsAuthenticated } = useAppContext();
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');

  return (
    <main className="flex-1 flex flex-col justify-center p-4">
      {authPage === 'login' ? (
        <LoginPage setAuthPage={setAuthPage} />
      ) : (
        <RegisterPage setAuthPage={setAuthPage} />
      )}
    </main>
  );
};


const AppContent: React.FC = () => {
  const { isAuthenticated, PALETTE, currentPage } = useAppContext();
  
  const isVisualNovelPage = isAuthenticated && currentPage === Page.VISUAL_NOVEL_EARTHQUAKE;

  const containerClassName = isVisualNovelPage
    ? "w-full h-screen flex flex-col font-sans"
    : "w-full max-w-sm mx-auto h-screen flex flex-col font-sans";

  return (
    <div className={containerClassName} style={{ backgroundColor: PALETTE.background }}>
       {isAuthenticated ? <AppNavigator /> : <Auth />}
    </div>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;