import React, { useState } from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AppNavigator from './navigation/AppNavigator';

const Auth: React.FC = () => {
  const { setIsAuthenticated } = useAppContext();
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');

  // The login and register pages would need to call setIsAuthenticated(true) on success
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <main className="flex-1 flex flex-col justify-center p-4">
      {authPage === 'login' ? (
        <LoginPage setAuthPage={setAuthPage} onLoginSuccess={handleLoginSuccess} />
      ) : (
        <RegisterPage setAuthPage={setAuthPage} onRegisterSuccess={handleLoginSuccess} />
      )}
    </main>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, PALETTE } = useAppContext();
  
  // This is the correct place to apply the background color based on the current palette
  return (
    <div 
      className="w-full max-w-sm mx-auto h-screen flex flex-col font-sans" 
      style={{ backgroundColor: PALETTE.background }}
    >
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