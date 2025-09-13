
import React, { useState, useEffect, useRef } from 'react';
import {
  Page,
  Mode,
  User,
  EducationModule,
  Drill,
  Badge,
  MapPoint,
  HistoryItem,
  SafetyKitItem,
  LeaderboardUser,
  SurvivalGuide,
  NewsUpdate,
  EmergencyContact,
} from './types';
import {
  PREPAREDNESS_PALETTE,
  CRISIS_PALETTE,
  user,
  educationModules,
  drills,
  badges,
  mapPoints,
  history,
  safetyKitItems as initialSafetyKitItems,
  leaderboardData,
  survivalGuides,
  newsUpdates,
  emergencyContacts,
  HomeIcon,
  DrillsIcon,
  MapIcon,
  ProfileIcon,
  LearnIcon,
  KitIcon,
  WeatherIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  TrophyIcon,
  QuizIcon,
  SimulationIcon,
  LanguageIcon,
  BellIcon,
  LogoutIcon,
  LightbulbIcon,
  SOSIcon,
  PhoneIcon,
  ShelterIcon,
  ShieldIcon,
  CheckCircleIcon,
  UserIcon,
  LockIcon,
} from './constants';


// --- TYPE DEFINITIONS ---
type Palette = typeof PREPAREDNESS_PALETTE;

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');
  
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [currentMode, setCurrentMode] = useState<Mode>(Mode.PREPAREDNESS);

  const PALETTE = currentMode === Mode.PREPAREDNESS ? PREPAREDNESS_PALETTE : CRISIS_PALETTE;

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Reset to default preparedness mode on logout
    setCurrentMode(Mode.PREPAREDNESS);
    setCurrentPage(Page.HOME);
    document.body.style.backgroundColor = PREPAREDNESS_PALETTE.background;
  };

  const renderPage = () => {
    const pageProps = { setCurrentPage, PALETTE, setIsAuthenticated: handleLogout };

    if (currentMode === Mode.CRISIS) {
      switch (currentPage) {
        case Page.CRISIS_HOME:
        case Page.HOME: // Default to crisis home
          return <CrisisHomePage {...pageProps} />;
        case Page.CRISIS_MAP:
        case Page.MAP:
          return <CrisisMapPage {...pageProps} />;
        case Page.CONTACTS:
          return <EmergencyContactsPage {...pageProps} />;
        case Page.CRISIS_PROFILE:
        case Page.PROFILE:
          return <CrisisProfilePage {...pageProps} />;
        default:
          return <CrisisHomePage {...pageProps} />; // Fallback for crisis mode
      }
    }
    
    // Preparedness Mode
    switch (currentPage) {
      case Page.HOME:
        return <HomePage {...pageProps} />;
      case Page.DRILLS:
        return <DrillsPage {...pageProps} />;
      case Page.MAP:
        return <MapPage {...pageProps} />;
      case Page.PROFILE:
        return <ProfilePage {...pageProps} />;
      case Page.LEARN:
        return <LearnPage {...pageProps} />;
      case Page.SAFETY_KIT:
        return <SafetyKitPage {...pageProps} />;
      case Page.LEADERBOARD:
        return <LeaderboardPage {...pageProps} />;
      default:
        return <HomePage {...pageProps} />;
    }
  };

  const toggleMode = () => {
    setCurrentMode(prev => {
        const newMode = prev === Mode.PREPAREDNESS ? Mode.CRISIS : Mode.PREPAREDNESS;
        // Reset to home page on mode switch
        setCurrentPage(newMode === Mode.CRISIS ? Page.CRISIS_HOME : Page.HOME);
        document.body.style.backgroundColor = newMode === Mode.PREPAREDNESS ? PREPAREDNESS_PALETTE.background : CRISIS_PALETTE.background;
        return newMode;
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto h-screen flex flex-col font-sans" style={{ backgroundColor: PALETTE.background }}>
      {isAuthenticated ? (
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
                        color: currentMode === Mode.PREPAREDNESS ? PREPAREDNESS_PALETTE.background : CRISIS_PALETTE.text_primary,
                        boxShadow: PALETTE.button_shadow
                    }}
                >
                    {currentMode === Mode.PREPAREDNESS ? 'Simulate Crisis' : 'End Crisis'}
                </button>
            </header>

            <main className="flex-1 overflow-y-auto p-4 hide-scrollbar">
              {renderPage()}
            </main>

            <BottomNavBar currentPage={currentPage} setCurrentPage={setCurrentPage} PALETTE={PALETTE} currentMode={currentMode} />
         </>
      ) : (
        <main className="flex-1 flex flex-col justify-center p-4">
            {authPage === 'login' ? (
              <LoginPage setIsAuthenticated={setIsAuthenticated} setAuthPage={setAuthPage} PALETTE={PREPAREDNESS_PALETTE} />
            ) : (
              <RegisterPage setIsAuthenticated={setIsAuthenticated} setAuthPage={setAuthPage} PALETTE={PREPAREDNESS_PALETTE} />
            )}
        </main>
      )}
    </div>
  );
};

// --- AUTHENTICATION PAGES ---
interface AuthPageProps {
  setIsAuthenticated: (isAuth: boolean) => void;
  setAuthPage: (page: 'login' | 'register') => void;
  PALETTE: Palette;
}

const LoginPage: React.FC<AuthPageProps> = ({ setIsAuthenticated, setAuthPage, PALETTE }) => (
    <div className="flex flex-col items-center text-center">
        <ShieldIcon className="w-16 h-16 mb-4" style={{ color: PALETTE.accent }} />
        <h1 className="text-3xl font-bold" style={{ color: PALETTE.text_primary }}>Welcome Back</h1>
        <p className="mb-8" style={{ color: PALETTE.text_secondary }}>Login to continue</p>
        
        <div className="w-full space-y-4">
            <AuthInput icon={UserIcon} placeholder="Email" type="email" PALETTE={PALETTE} />
            <AuthInput icon={LockIcon} placeholder="Password" type="password" PALETTE={PALETTE} />
        </div>

        <button 
            onClick={() => setIsAuthenticated(true)}
            className="w-full py-3 mt-8 rounded-xl font-semibold transition-all duration-200"
            style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
        >
            Login
        </button>

        <p className="mt-6 text-sm" style={{ color: PALETTE.text_secondary }}>
            Don't have an account?{' '}
            <button onClick={() => setAuthPage('register')} className="font-bold" style={{ color: PALETTE.text_primary }}>
                Register
            </button>
        </p>
    </div>
);

const RegisterPage: React.FC<AuthPageProps> = ({ setIsAuthenticated, setAuthPage, PALETTE }) => (
    <div className="flex flex-col items-center text-center">
        <ShieldIcon className="w-16 h-16 mb-4" style={{ color: PALETTE.accent }} />
        <h1 className="text-3xl font-bold" style={{ color: PALETTE.text_primary }}>Create Account</h1>
        <p className="mb-8" style={{ color: PALETTE.text_secondary }}>Get started with your preparedness journey</p>
        
        <div className="w-full space-y-4">
            <AuthInput icon={ProfileIcon} placeholder="Full Name" type="text" PALETTE={PALETTE} />
            <AuthInput icon={UserIcon} placeholder="Email" type="email" PALETTE={PALETTE} />
            <AuthInput icon={LockIcon} placeholder="Password" type="password" PALETTE={PALETTE} />
        </div>

        <button 
            onClick={() => setIsAuthenticated(true)}
            className="w-full py-3 mt-8 rounded-xl font-semibold transition-all duration-200"
            style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
        >
            Register
        </button>

        <p className="mt-6 text-sm" style={{ color: PALETTE.text_secondary }}>
            Already have an account?{' '}
            <button onClick={() => setAuthPage('login')} className="font-bold" style={{ color: PALETTE.text_primary }}>
                Login
            </button>
        </p>
    </div>
);

const AuthInput: React.FC<{ icon: React.ElementType; placeholder: string; type: string; PALETTE: Palette }> = ({ icon: Icon, placeholder, type, PALETTE }) => (
    <div 
        className="w-full flex items-center gap-3 p-3 rounded-xl"
        style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_inset_shadow }}
    >
        <Icon className="w-5 h-5" style={{ color: PALETTE.text_secondary }} />
        <input 
            type={type}
            placeholder={placeholder}
            className="bg-transparent w-full outline-none"
            style={{ color: PALETTE.text_primary }}
        />
    </div>
);


// --- PAGE COMPONENTS ---
interface PageProps {
  setCurrentPage: (page: Page) => void;
  PALETTE: Palette;
  setIsAuthenticated: (isAuth: boolean) => void;
}

const HomePage: React.FC<PageProps> = ({ setCurrentPage, PALETTE }) => {
  return (
    <div className="space-y-6">
      <Header />
      <EducationCarousel />
      <div className="grid grid-cols-2 gap-4">
        <WeatherWidget />
        <ChecklistWidget />
      </div>
      <LeaderboardHighlight setCurrentPage={setCurrentPage} />
      <TipOfTheDay />
      <SurvivalGuides />
      <NewsUpdates />
      <QuickAccessButtons setCurrentPage={setCurrentPage} />
    </div>
  );
};

const DrillsPage: React.FC<PageProps> = ({ PALETTE }) => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>Drills & Training</h1>
            <ScoreRing score={user.preparednessScore} PALETTE={PALETTE}/>
            <div 
                className="p-4 rounded-xl"
                style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}
            >
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold" style={{ color: PALETTE.text_primary }}>Today's Drill</h3>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: PALETTE.accent, color: PALETTE.background }}>LIVE</span>
                </div>
                <p className="text-sm mb-4" style={{ color: PALETTE.text_secondary }}>Flood Escape Simulation</p>
                <button 
                    className="w-full py-2 rounded-lg font-semibold transition-all duration-200"
                    style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                    onClick={() => alert("Starting Flood Escape Simulation!")}
                >
                    Start Now
                </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                {drills.map((drill) => (
                    <div key={drill.title} className="p-4 rounded-xl flex flex-col items-center text-center" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                        <drill.icon className="w-8 h-8 mb-2" style={{ color: PALETTE.accent }} />
                        <h4 className="font-semibold text-sm" style={{ color: PALETTE.text_primary }}>{drill.title}</h4>
                        <p className="text-xs mb-3" style={{ color: PALETTE.text_secondary }}>{drill.description}</p>
                        <button 
                            className="mt-auto w-full py-1 text-xs rounded-lg font-semibold"
                             style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                            onClick={() => alert(`Starting ${drill.title}!`)}
                        >
                            Start
                        </button>
                    </div>
                ))}
            </div>

            <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: PALETTE.text_primary }}>Badges Earned</h3>
                <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                    {badges.map(badge => (
                        <div key={badge.name} className="flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-xl w-24 h-24" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                            <span className="text-3xl">{badge.icon}</span>
                            <p className="text-xs font-semibold text-center mt-1" style={{ color: PALETTE.text_secondary }}>{badge.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MapPage: React.FC<PageProps> = ({ PALETTE }) => {
    const [showShelters, setShowShelters] = useState(true);
    const [showDangerZones, setShowDangerZones] = useState(true);
    const [showRoutes, setShowRoutes] = useState(true);

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>Preparedness Map</h1>
            <div className="relative w-full h-64 rounded-xl overflow-hidden" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <img src="https://i.imgur.com/3Z6gB2g.png" alt="Map of area" className="w-full h-full object-cover" />
                {showDangerZones && <div className="absolute rounded-full" style={{ top: '50%', left: '10%', width: '30%', height: '30%', backgroundColor: 'rgba(220, 88, 109, 0.4)' }}></div>}
                {showRoutes && <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 10 }}><path d="M 80 200 Q 150 150 220 50" stroke="#628ECB" strokeWidth="4" fill="none" strokeDasharray="8, 8"/></svg>}
                {showShelters && mapPoints.filter(p => p.type === 'shelter').map(point => (
                    <div key={point.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ top: point.position.top, left: point.position.left, zIndex: 20 }}>
                        <div className="p-1 text-xs bg-green-500 text-white rounded-md mb-1">{point.name}</div>
                        <ShelterIcon className="w-8 h-8 text-white bg-green-500 rounded-full p-1" />
                    </div>
                ))}
            </div>
             <div className="p-4 rounded-xl space-y-3" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <h3 className="font-bold" style={{ color: PALETTE.text_primary }}>Map Layers</h3>
                <div className="flex justify-between items-center text-sm">
                    <label style={{ color: PALETTE.text_secondary }}>🟩 Safe Shelters</label>
                    <ToggleSwitch checked={showShelters} onChange={() => setShowShelters(s => !s)} PALETTE={PALETTE}/>
                </div>
                 <div className="flex justify-between items-center text-sm">
                    <label style={{ color: PALETTE.text_secondary }}>🟥 Danger Zones</label>
                    <ToggleSwitch checked={showDangerZones} onChange={() => setShowDangerZones(s => !s)} PALETTE={PALETTE}/>
                </div>
                 <div className="flex justify-between items-center text-sm">
                    <label style={{ color: PALETTE.text_secondary }}>🟦 Evacuation Routes</label>
                    <ToggleSwitch checked={showRoutes} onChange={() => setShowRoutes(s => !s)} PALETTE={PALETTE}/>
                </div>
            </div>
        </div>
    );
};

const ProfilePage: React.FC<PageProps> = ({ PALETTE, setIsAuthenticated }) => {
    return (
        <div className="space-y-6">
             <div className="flex flex-col items-center text-center p-4 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mb-4" style={{ boxShadow: PALETTE.button_shadow }}/>
                <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>{user.name}</h1>
                <p className="text-sm" style={{ color: PALETTE.text_secondary }}>{user.class} | {user.school}</p>
             </div>

            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <h3 className="text-lg font-bold" style={{ color: PALETTE.text_primary }}>Preparedness Score</h3>
                <p className="text-4xl font-bold my-2" style={{ color: PALETTE.accent }}>{user.preparednessScore} <span className="text-lg">/ 100</span></p>
                <p className="text-sm font-semibold" style={{ color: PALETTE.text_secondary }}>🌟 Disaster Ready: Level 3</p>
            </div>
            
            <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: PALETTE.text_primary }}>Badges Collection</h3>
                <div className="grid grid-cols-3 gap-4">
                    {badges.map(badge => (
                        <div key={badge.name} className="flex flex-col items-center p-3 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                             <span className="text-3xl">{badge.icon}</span>
                            <p className="text-xs font-semibold text-center mt-1" style={{ color: PALETTE.text_secondary }}>{badge.name}</p>
                        </div>
                    ))}
                </div>
            </div>

             <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: PALETTE.text_primary }}>Participation History</h3>
                <div className="space-y-3">
                    {history.map(item => (
                        <div key={item.id} className="flex justify-between items-center p-3 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                            <div>
                                <p className="font-semibold text-sm" style={{ color: PALETTE.text_primary }}>{item.title}</p>
                                <p className="text-xs" style={{ color: PALETTE.text_secondary }}>{item.type}</p>
                            </div>
                            <p className="text-xs" style={{ color: PALETTE.text_secondary }}>{item.date}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-2 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <SettingsListItem icon={LanguageIcon} text="Language" PALETTE={PALETTE} />
                <SettingsListItem icon={BellIcon} text="Notifications" PALETTE={PALETTE} />
                <SettingsListItem icon={LogoutIcon} text="Logout" PALETTE={PALETTE} action={() => setIsAuthenticated(false)}/>
            </div>
        </div>
    );
};

const LearnPage: React.FC<PageProps> = ({ setCurrentPage, PALETTE }) => (
  <div>
    <PageHeader title="Education Modules" onBack={() => setCurrentPage(Page.HOME)} PALETTE={PALETTE} />
    <div className="space-y-4">
      {educationModules.map(module => (
        <div key={module.title} className="flex items-center gap-4 p-3 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
          <div className="w-20 h-20 rounded-lg flex items-center justify-center" style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_inset_shadow }}>
            <module.thumbnail className="w-16 h-16" />
          </div>
          <div>
            <p className="font-bold" style={{ color: PALETTE.text_primary }}>{module.title}</p>
            <p className="text-sm" style={{ color: PALETTE.text_secondary }}>{module.disasterType}</p>
          </div>
          <ChevronRightIcon className="w-6 h-6 ml-auto" style={{ color: PALETTE.accent }} />
        </div>
      ))}
    </div>
  </div>
);

const SafetyKitPage: React.FC<PageProps> = ({ setCurrentPage, PALETTE }) => {
  const [items, setItems] = useState<SafetyKitItem[]>(initialSafetyKitItems);

  const toggleItem = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  const completedItems = items.filter(item => item.checked).length;
  const totalItems = items.length;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return (
    <div>
      <PageHeader title="Safety Kit Checklist" onBack={() => setCurrentPage(Page.HOME)} PALETTE={PALETTE} />
      <div className="space-y-4">
        <div className="p-4 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold" style={{ color: PALETTE.text_primary }}>Checklist Progress</p>
            <p className="font-semibold" style={{ color: PALETTE.accent }}>{completedItems} / {totalItems}</p>
          </div>
          <div className="w-full h-3 rounded-full" style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_inset_shadow }}>
            <div className="h-3 rounded-full" style={{ width: `${progress}%`, backgroundColor: PALETTE.accent }}></div>
          </div>
        </div>
        <div className="space-y-3">
          {items.map(item => (
            <div 
              key={item.id} 
              onClick={() => toggleItem(item.id)}
              className="flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200" 
              style={{ 
                backgroundColor: PALETTE.card, 
                boxShadow: item.checked ? PALETTE.button_inset_shadow : PALETTE.button_shadow 
              }}>
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_inset_shadow }}>
                {item.checked && <CheckCircleIcon className="w-5 h-5" style={{ color: PALETTE.accent }} />}
              </div>
              <p className={`font-semibold ${item.checked ? 'line-through' : ''}`} style={{ color: item.checked ? PALETTE.text_secondary : PALETTE.text_primary }}>
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LeaderboardPage: React.FC<PageProps> = ({ setCurrentPage, PALETTE }) => (
  <div>
    <PageHeader title="Preparedness Leaderboard" onBack={() => setCurrentPage(Page.HOME)} PALETTE={PALETTE} />
    <div className="space-y-3">
      {leaderboardData.map(player => (
        <div 
          key={player.rank} 
          className="flex items-center gap-4 p-3 rounded-xl"
          style={{ 
            backgroundColor: PALETTE.card, 
            boxShadow: PALETTE.button_shadow,
            border: player.isCurrentUser ? `2px solid ${PALETTE.accent}` : '2px solid transparent'
          }}>
          <p className="text-xl font-bold w-8 text-center" style={{ color: PALETTE.text_secondary }}>{player.rank}</p>
          <img src={`https://i.pravatar.cc/150?u=${player.name}`} alt={player.name} className="w-10 h-10 rounded-full" />
          <p className="font-bold flex-1" style={{ color: PALETTE.text_primary }}>{player.name}</p>
          <p className="font-bold" style={{ color: PALETTE.accent }}>{player.score} pts</p>
        </div>
      ))}
    </div>
  </div>
);


// --- CRISIS MODE PAGES ---

const CrisisHomePage: React.FC<PageProps> = ({ setCurrentPage, PALETTE }) => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <div className="w-full p-4 rounded-xl text-center" style={{ backgroundColor: PALETTE.accent }}>
            <h1 className="text-2xl font-bold" style={{ color: CRISIS_PALETTE.background }}>CRISIS ACTIVE</h1>
            <p className="text-sm" style={{ color: CRISIS_PALETTE.background }}>Stay calm and follow instructions.</p>
        </div>

        <button 
            className="w-48 h-48 rounded-full flex flex-col items-center justify-center animate-pulse"
            style={{ backgroundColor: PALETTE.accent, boxShadow: PALETTE.button_shadow }}
            onClick={() => alert('SOS Signal Sent! Authorities have been notified of your location.')}
        >
            <SOSIcon className="w-16 h-16" style={{ color: CRISIS_PALETTE.background }}/>
            <span className="text-3xl font-bold mt-2" style={{ color: CRISIS_PALETTE.background }}>SOS</span>
        </button>

        <div className="grid grid-cols-2 gap-4 w-full">
            <CrisisButton icon={ShelterIcon} text="Find Shelters" onClick={() => setCurrentPage(Page.CRISIS_MAP)} PALETTE={PALETTE} />
            <CrisisButton icon={PhoneIcon} text="Contacts" onClick={() => setCurrentPage(Page.CONTACTS)} PALETTE={PALETTE} />
        </div>
    </div>
);

const CrisisMapPage: React.FC<PageProps> = ({ PALETTE }) => (
     <div className="space-y-4">
        <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>Emergency Map</h1>
        <p style={{color: PALETTE.text_secondary}}>Your location is being shared with authorities.</p>
        <div className="relative w-full h-96 rounded-xl overflow-hidden" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
            <img src="https://i.imgur.com/3Z6gB2g.png" alt="Map of area" className="w-full h-full object-cover opacity-50" />
            {mapPoints.map(point => (
                <div key={point.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ top: point.position.top, left: point.position.left, zIndex: 20 }}>
                    <div className="p-1 text-xs bg-green-500 text-white rounded-md mb-1">{point.name}</div>
                    <ShelterIcon className="w-8 h-8 text-white bg-green-500 rounded-full p-1" />
                </div>
            ))}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 bg-blue-500 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
            </div>
        </div>
    </div>
);

const EmergencyContactsPage: React.FC<PageProps> = ({ PALETTE }) => (
    <div className="space-y-4">
        <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>Emergency Contacts</h1>
        <div className="space-y-3">
            {emergencyContacts.map(contact => (
                <div key={contact.name} className="flex items-center gap-4 p-3 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                    <contact.icon className="w-8 h-8" style={{ color: PALETTE.text_primary }} />
                    <div className="flex-1">
                        <p className="font-bold" style={{ color: PALETTE.text_primary }}>{contact.name}</p>
                        <p className="text-sm" style={{ color: PALETTE.text_secondary }}>{contact.number}</p>
                    </div>
                    <button 
                        className="p-3 rounded-full"
                        style={{ backgroundColor: PALETTE.accent, boxShadow: PALETTE.button_shadow}}
                        onClick={() => alert(`Calling ${contact.name}...`)}
                    >
                        <PhoneIcon className="w-6 h-6" style={{ color: CRISIS_PALETTE.background }}/>
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const CrisisProfilePage: React.FC<PageProps> = ({ PALETTE }) => {
    const [isSafe, setIsSafe] = useState(false);
    return (
        <div className="space-y-6 text-center">
            <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>My Safety Status</h1>
             <div className="flex flex-col items-center p-4 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mb-4" style={{ boxShadow: PALETTE.button_shadow }}/>
                <h2 className="text-xl font-bold" style={{ color: PALETTE.text_primary }}>{user.name}</h2>
                <p className="text-sm" style={{ color: PALETTE.text_secondary }}>{user.school}</p>
             </div>

             <div className="p-4 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: PALETTE.text_primary }}>Are you safe?</h3>
                <div className="flex justify-center items-center gap-4">
                    <span className="font-semibold" style={{ color: PALETTE.text_secondary }}>I need help</span>
                    <ToggleSwitch checked={isSafe} onChange={() => setIsSafe(s => !s)} PALETTE={PALETTE} />
                    <span className="font-semibold" style={{ color: PALETTE.accent }}>I am safe</span>
                </div>
             </div>
              {isSafe && (
                <div className="p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: 'rgba(46, 182, 125, 0.2)'}}>
                    <CheckCircleIcon className="w-8 h-8 text-green-500" />
                    <p className="text-sm text-left" style={{color: PALETTE.text_primary}}>Your family and teachers have been notified that you are safe.</p>
                </div>
             )}
        </div>
    );
};


// --- REUSABLE COMPONENTS ---
const ScoreRing: React.FC<{ score: number; PALETTE: Palette }> = ({ score, PALETTE }) => {
    const size = 140;
    const strokeWidth = 12;
    const radius = (size / 2) - (strokeWidth);
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div 
            className="relative flex items-center justify-center p-4 rounded-full mx-auto" 
            style={{ 
                width: size + 20, 
                height: size + 20, 
                backgroundColor: PALETTE.card, 
                boxShadow: PALETTE.button_shadow 
            }}
        >
            <div 
                className="absolute inset-2 rounded-full" 
                style={{ boxShadow: PALETTE.button_inset_shadow }}
            />
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={PALETTE.background}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={PALETTE.accent}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.35s' }}
                />
            </svg>
            <div className="absolute text-center">
                <span className="text-3xl font-bold" style={{ color: PALETTE.accent }}>{score}</span>
                <p className="text-xs font-semibold" style={{ color: PALETTE.text_secondary }}>Score</p>
            </div>
        </div>
    );
};

const Header: React.FC = () => (
  <div className="text-left">
    <h1 className="text-3xl font-bold" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>
      Hi {user.name},
    </h1>
    <p className="text-md" style={{ color: PREPAREDNESS_PALETTE.text_secondary }}>
      Stay Prepared Today!
    </p>
  </div>
);

const EducationCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Fix: Use ReturnType<typeof setTimeout> for the ref type to support both Node.js and browser environments.
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

const WeatherWidget: React.FC = () => (
  <div className="p-4 rounded-xl flex items-center justify-between" style={{ backgroundColor: PREPAREDNESS_PALETTE.card, boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
    <div>
      <p className="font-bold text-2xl" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>28°C</p>
      <p className="text-sm" style={{ color: PREPAREDNESS_PALETTE.text_secondary }}>Sunny</p>
    </div>
    <WeatherIcon className="w-10 h-10" style={{ color: PREPAREDNESS_PALETTE.accent }} />
  </div>
);

const ChecklistWidget: React.FC = () => (
  <div className="p-4 rounded-xl" style={{ backgroundColor: PREPAREDNESS_PALETTE.card, boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
    <p className="font-bold text-sm mb-2" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>Safety Checklist</p>
    <div className="w-full h-2 rounded-full" style={{ backgroundColor: PREPAREDNESS_PALETTE.background, boxShadow: PREPAREDNESS_PALETTE.button_inset_shadow }}>
      <div className="w-3/5 h-2 rounded-full" style={{ backgroundColor: PREPAREDNESS_PALETTE.accent }}></div>
    </div>
    <p className="text-xs text-right mt-1" style={{ color: PREPAREDNESS_PALETTE.text_secondary }}>3/5 items</p>
  </div>
);

const LeaderboardHighlight: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => (
  <div className="p-4 rounded-xl flex items-center justify-between" style={{ backgroundColor: PREPAREDNESS_PALETTE.card, boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
    <div className="flex items-center gap-3">
        <TrophyIcon className="w-8 h-8" style={{ color: PREPAREDNESS_PALETTE.accent }}/>
        <div>
            <p className="font-bold" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>You are Rank #{user.rank}</p>
            <p className="text-sm" style={{ color: PREPAREDNESS_PALETTE.text_secondary }}>in District Preparedness!</p>
        </div>
    </div>
    <button onClick={() => setCurrentPage(Page.LEADERBOARD)} className="text-sm font-semibold p-2 rounded-lg" style={{ color: PREPAREDNESS_PALETTE.accent }}>
      <ChevronRightIcon className="w-6 h-6" />
    </button>
  </div>
);

const TipOfTheDay: React.FC = () => (
  <div className="p-4 rounded-xl flex items-start gap-3" style={{ backgroundColor: PREPAREDNESS_PALETTE.card, boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
    <LightbulbIcon className="w-8 h-8 flex-shrink-0" style={{ color: PREPAREDNESS_PALETTE.accent }}/>
    <div>
      <p className="font-bold" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>Tip of the Day</p>
      <p className="text-sm" style={{ color: PREPAREDNESS_PALETTE.text_secondary }}>Keep a whistle in your safety kit to signal for help.</p>
    </div>
  </div>
);

const SurvivalGuides: React.FC = () => (
  <div>
    <h3 className="text-lg font-bold mb-2" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>Survival Guides</h3>
    <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
      {survivalGuides.map(guide => (
        <div key={guide.title} className="flex-shrink-0 p-4 rounded-xl w-40" style={{ backgroundColor: PREPAREDNESS_PALETTE.card, boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
          <guide.icon className="w-8 h-8 mb-2" style={{ color: PREPAREDNESS_PALETTE.accent }} />
          <h4 className="font-bold" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>{guide.title}</h4>
          <p className="text-xs" style={{ color: PREPAREDNESS_PALETTE.text_secondary }}>{guide.summary}</p>
        </div>
      ))}
    </div>
  </div>
);

const NewsUpdates: React.FC = () => {
  const categoryColor = (category: NewsUpdate['category']) => {
    switch(category) {
      case 'Alert': return '#DC586D';
      case 'Innovation': return '#8AAEE0';
      case 'Success Story': return '#28a745';
      default: return PREPAREDNESS_PALETTE.text_secondary;
    }
  }

  return (
    <div>
       <h3 className="text-lg font-bold mb-2" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>News & Updates</h3>
       <div className="space-y-3">
        {newsUpdates.map(update => (
          <div key={update.title} className="p-4 rounded-xl" style={{ backgroundColor: PREPAREDNESS_PALETTE.card, boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
            <div className="flex justify-between items-start">
              <p className="font-bold text-sm mb-1" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>{update.title}</p>
              <span className="text-xs font-semibold px-2 py-1 rounded-full text-white" style={{ backgroundColor: categoryColor(update.category) }}>{update.category}</span>
            </div>
            <p className="text-xs" style={{ color: PREPAREDNESS_PALETTE.text_secondary }}>{update.source} • {update.date}</p>
          </div>
        ))}
       </div>
    </div>
  );
};


const QuickAccessButtons: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => (
    <div className="grid grid-cols-4 gap-3 text-center">
        <QuickAccessButton icon={LearnIcon} label="Learn" onClick={() => setCurrentPage(Page.LEARN)} />
        <QuickAccessButton icon={DrillsIcon} label="Drills" onClick={() => setCurrentPage(Page.DRILLS)} />
        <QuickAccessButton icon={MapIcon} label="Map" onClick={() => setCurrentPage(Page.MAP)} />
        <QuickAccessButton icon={KitIcon} label="Safety Kit" onClick={() => setCurrentPage(Page.SAFETY_KIT)} />
    </div>
);

const QuickAccessButton: React.FC<{icon: React.ElementType; label: string; onClick: () => void}> = ({ icon: Icon, label, onClick }) => (
    <div onClick={onClick} className="flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer" style={{ backgroundColor: PREPAREDNESS_PALETTE.card, boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
        <Icon className="w-7 h-7 mb-1" style={{ color: PREPAREDNESS_PALETTE.accent }}/>
        <span className="text-xs font-semibold" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>{label}</span>
    </div>
);

const PageHeader: React.FC<{ title: string; onBack: () => void; PALETTE: Palette }> = ({ title, onBack, PALETTE }) => (
  <div className="flex items-center gap-4 mb-6">
    <button onClick={onBack} className="p-2 rounded-full" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
      <ArrowLeftIcon className="w-6 h-6" style={{ color: PALETTE.text_primary }} />
    </button>
    <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>{title}</h1>
  </div>
);


const ToggleSwitch: React.FC<{ checked: boolean, onChange: () => void, PALETTE: Palette }> = ({ checked, onChange, PALETTE }) => (
  <div 
    onClick={onChange}
    className="w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300"
    style={{ 
      backgroundColor: checked ? PALETTE.accent : PALETTE.background,
      boxShadow: PALETTE.button_inset_shadow
    }}
  >
    <div 
      className="w-4 h-4 rounded-full transition-transform duration-300"
      style={{ 
        backgroundColor: 'white',
        transform: checked ? 'translateX(24px)' : 'translateX(0px)'
      }}
    ></div>
  </div>
);

const SettingsListItem: React.FC<{icon: React.ElementType, text: string, PALETTE: Palette, action?: () => void}> = ({ icon: Icon, text, PALETTE, action }) => (
    <div onClick={action} className="flex items-center gap-4 p-3 rounded-xl hover:opacity-80 cursor-pointer">
        <Icon className="w-6 h-6" style={{ color: PALETTE.text_secondary }} />
        <span className="font-semibold" style={{ color: PALETTE.text_primary }}>{text}</span>
        <ChevronRightIcon className="w-5 h-5 ml-auto" style={{ color: PALETTE.text_secondary }} />
    </div>
);

const CrisisButton: React.FC<{icon: React.ElementType, text: string, onClick: () => void, PALETTE: Palette}> = ({ icon: Icon, text, onClick, PALETTE }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center justify-center p-4 rounded-xl"
        style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}
    >
        <Icon className="w-8 h-8 mb-2" style={{ color: PALETTE.text_primary }} />
        <span className="font-bold" style={{ color: PALETTE.text_primary }}>{text}</span>
    </button>
);


// --- NAVIGATION ---
const BottomNavBar: React.FC<{ currentPage: Page; setCurrentPage: (page: Page) => void; PALETTE: Palette, currentMode: Mode }> = ({ currentPage, setCurrentPage, PALETTE, currentMode }) => {
    
    const preparednessNavItems = [
        { page: Page.HOME, icon: HomeIcon, label: 'Home' },
        { page: Page.DRILLS, icon: DrillsIcon, label: 'Drills' },
        { page: Page.MAP, icon: MapIcon, label: 'Map' },
        { page: Page.PROFILE, icon: ProfileIcon, label: 'Profile' },
    ];
    
    const crisisNavItems = [
        { page: Page.CRISIS_HOME, icon: HomeIcon, label: 'Home' },
        { page: Page.CRISIS_MAP, icon: MapIcon, label: 'Map' },
        { page: Page.CONTACTS, icon: PhoneIcon, label: 'Contacts' },
        { page: Page.CRISIS_PROFILE, icon: ShieldIcon, label: 'Status' },
    ];

    const navItems = currentMode === Mode.PREPAREDNESS ? preparednessNavItems : crisisNavItems;

    // Determine active page, considering fallbacks
    let activePage = currentPage;
    if (currentMode === Mode.CRISIS) {
        if (![Page.CRISIS_HOME, Page.CRISIS_MAP, Page.CONTACTS, Page.CRISIS_PROFILE].includes(currentPage)) {
            activePage = Page.CRISIS_HOME;
        }
    } else {
         if (![Page.HOME, Page.DRILLS, Page.MAP, Page.PROFILE].includes(currentPage)) {
            activePage = Page.HOME;
        }
    }

    return (
        <nav className="grid grid-cols-4 gap-2 p-2" style={{ backgroundColor: PALETTE.background, boxShadow: `0 -2px 4px ${PALETTE.shadow_dark}30`}}>
        {navItems.map(({ page, icon: Icon, label }) => (
            <button
            key={label}
            onClick={() => setCurrentPage(page)}
            className="flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200"
            style={{
                backgroundColor: activePage === page ? PALETTE.accent : 'transparent',
            }}
            >
            <Icon
                className="w-6 h-6 mb-1"
                style={{
                color: activePage === page ? PALETTE.background : PALETTE.text_secondary,
                }}
            />
            <span
                className="text-xs font-semibold"
                style={{
                color: activePage === page ? PALETTE.background : PALETTE.text_secondary,
                }}
            >
                {label}
            </span>
            </button>
        ))}
        </nav>
    );
};

export default App;
