import {
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
  EmergencyContact
} from './types';
import React from 'react';

// --- COLOR PALETTES ---
export const PREPAREDNESS_PALETTE = {
  background: '#F0F3FA',
  card: '#eef2f9',
  text_primary: '#395886',
  text_secondary: '#628ECB',
  accent: '#8AAEE0',
  shadow_light: '#ffffff',
  shadow_dark: '#d5deef',
  button_shadow: '5px 5px 10px #d5deef, -5px -5px 10px #ffffff',
  button_inset_shadow: 'inset 5px 5px 10px #d5deef, inset -5px -5px 10px #ffffff',
};

export const CRISIS_PALETTE = {
  background: '#4C1D3D',
  card: '#5c2a4c',
  text_primary: '#FFBB94',
  text_secondary: '#FB9590',
  accent: '#DC586D',
  shadow_light: '#6c3a5c',
  shadow_dark: '#2c0a1d',
  button_shadow: '5px 5px 10px #2c0a1d, -5px -5px 10px #6c3a5c',
  button_inset_shadow: 'inset 5px 5px 10px #2c0a1d, inset -5px -5px 10px #6c3a5c',
};

// --- SVG ICONS ---
export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);
export const DrillsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
export const MapIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
export const ProfileIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
export const LearnIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5V4.5A2.5 2.5 0 0 1 6.5 2z"></path></svg>
);
export const KitIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 8h14M5 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4"></path><path d="M14 5a2 2 0 1 0-4 0 2 2 0 0 0 4 0z"></path></svg>
);
export const WeatherIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
);
export const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg>
);
export const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>
);
export const TrophyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
);
export const QuizIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 16.5V9.5"/><path d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"/><path d="M12 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg>
);
export const SimulationIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 14 4-4"/><path d="M13.4 2.6 14 2l2.6 2.6a4 4 0 0 1 0 5.6l-4.2 4.2-4.2-4.2a4 4 0 0 1 0-5.6L10 2l.6.6a2 2 0 0 1 2.8 0z"/><path d="M2 14v-1a4 4 0 0 1 4-4h1"/><path d="M22 13v1a4 4 0 0 1-4 4h-1"/><path d="M12 21a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2Z"/></svg>
);
export const LanguageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
);
export const BellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);
export const LogoutIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
);
export const FirstAidIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20.5 10.5h-17A1.5 1.5 0 0 0 2 12v3A1.5 1.5 0 0 0 3.5 16.5h17a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5Z"/><path d="M12.5 6.5h-1a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1Z"/><path d="M12.5 16.5h-1a1 1 0 0 1-1-1v-2h3v2a1 1 0 0 1-1 1Z"/></svg>
);
export const WaterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
);
export const ShelterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 2 7.5 7.5-2.1 9H6.6l-2.1-9L12 2z"/><path d="M12 22V12"/></svg>
);
export const LightbulbIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);
export const SOSIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
);
export const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);
export const ShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
export const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
export const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
export const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

// --- SVG THUMBNAILS ---
const FloodSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 60" {...props}>
    <path d="M0 60 L100 60 L100 40 C 80 55, 60 25, 40 40 C 20 55, 10 30, 0 40 Z" fill={PREPAREDNESS_PALETTE.accent} />
    <path d="M0 60 L100 60 L100 50 C 85 60, 65 40, 45 50 C 25 60, 15 45, 0 50 Z" fill={PREPAREDNESS_PALETTE.text_secondary} opacity="0.7" />
    <rect x="65" y="25" width="20" height="15" fill={PREPAREDNESS_PALETTE.text_primary} />
    <polygon points="63,25 87,25 75,18" fill={PREPAREDNESS_PALETTE.text_secondary} />
  </svg>
);
const CycloneSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 60" {...props}>
    <path d="M 50 30 C 60 10, 90 10, 90 30 C 110 30, 110 60, 90 60 C 70 80, 40 80, 40 60 C 20 60, 20 30, 40 30 C 30 15, 40 15, 50 30 Z" fill="none" stroke={PREPAREDNESS_PALETTE.accent} strokeWidth="3" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="0 50 30" to="360 50 30" dur="5s" repeatCount="indefinite" />
    </path>
    <path d="M 50 30 C 55 20, 70 20, 70 30 C 80 30, 80 45, 70 45 C 60 55, 45 55, 45 45 C 35 45, 35 30, 45 30 C 42 25, 45 25, 50 30 Z" fill="none" stroke={PREPAREDNESS_PALETTE.text_secondary} strokeWidth="2" strokeLinecap="round">
        <animateTransform attributeName="transform" type="rotate" from="360 50 30" to="0 50 30" dur="3s" repeatCount="indefinite" />
    </path>
  </svg>
);
const EarthquakeSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 100 60" {...props}>
    <path d="M0 60 L100 60 L100 50 L 80 50 L 75 55 L 60 55 L 55 50 L 40 50 L 35 55 L 20 55 L 15 50 L0 50 Z" fill={PREPAREDNESS_PALETTE.text_secondary} />
    <path d="M 20 50 L 20 30 L 40 30 L 40 50" fill={PREPAREDNESS_PALETTE.text_primary} transform="rotate(-5 30 50)" />
    <path d="M 55 50 L 55 20 L 80 20 L 80 50" fill={PREPAREDNESS_PALETTE.accent} transform="rotate(5 67.5 50)"/>
  </svg>
);
const FireSVG = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 60" {...props}>
        <path d="M 50 60 C 40 40, 20 40, 20 20 C 20 0, 50 0, 50 20 C 50 40, 60 40, 60 30 C 60 20, 80 20, 80 40 C 80 60, 50 60, 50 60 Z" fill="#DC586D" />
        <path d="M 50 60 C 45 45, 35 45, 35 30 C 35 15, 50 15, 50 30 C 50 45, 55 45, 55 37 C 55 30, 65 30, 65 45 C 65 60, 50 60, 50 60 Z" fill="#FB9590" />
    </svg>
);


// --- MOCK DATA ---
export const user: User = {
    name: 'Partha',
    avatar: 'https://i.pravatar.cc/150?u=partha',
    class: 'Class 8',
    school: 'Springdale Public School',
    preparednessScore: 72,
    rank: 4,
    badges: [
        { name: 'Flood Expert', icon: '🌊' },
        { name: 'Quick Responder', icon: '⚡' },
        { name: 'Team Player', icon: '🤝' },
        { name: 'Safety Pro', icon: '🛡️' },
    ],
};

export const educationModules: EducationModule[] = [
    { title: 'Flood Preparedness', disasterType: 'Flood', thumbnail: FloodSVG },
    { title: 'Cyclone Safety', disasterType: 'Cyclone', thumbnail: CycloneSVG },
    { title: 'Earthquake Survival', disasterType: 'Earthquake', thumbnail: EarthquakeSVG },
    { title: 'Fire Safety 101', disasterType: 'Fire', thumbnail: FireSVG },
];

export const drills: Drill[] = [
    { title: 'Quiz Drill', description: 'Test your knowledge', icon: QuizIcon, type: 'Quiz' },
    { title: 'Situation Simulation', description: 'What would you do?', icon: SimulationIcon, type: 'Simulation' },
];

export const badges: Badge[] = [
    { name: 'Flood Expert', icon: '🌊' },
    { name: 'Quick Responder', icon: '⚡' },
    { name: 'Team Player', icon: '🤝' },
    { name: 'Safety Pro', icon: '🛡️' },
    { name: 'Fire Marshal', icon: '🔥' },
    { name: 'First Aid Ready', icon: '🩹' },
];

export const mapPoints: MapPoint[] = [
    { id: 1, type: 'shelter', position: { top: '30%', left: '40%' }, name: 'Community Hall' },
    { id: 2, type: 'shelter', position: { top: '60%', left: '70%' }, name: 'Local School' },
    { id: 3, type: 'danger', position: { top: '55%', left: '20%' }, name: 'Low-lying Area' },
];

export const history: HistoryItem[] = [
    { id: 1, title: 'Flood Escape Simulation', type: 'Drill', date: 'Yesterday' },
    { id: 2, title: 'Earthquake Module', type: 'Module', date: '2 days ago' },
    { id: 3, title: 'Quiz: Fire Safety', type: 'Drill', date: '4 days ago' },
];

export const safetyKitItems: SafetyKitItem[] = [
  { id: 1, name: 'First-aid kit', checked: true },
  { id: 2, name: 'Flashlight & batteries', checked: true },
  { id: 3, name: 'Drinking water (3 days)', checked: false },
  { id: 4, name: 'Dry food items', checked: true },
  { id: 5, name: 'Emergency contacts list', checked: false },
  { id: 6, name: 'Whistle', checked: true },
];

export const leaderboardData: LeaderboardUser[] = [
  { rank: 1, name: 'Rina', score: 98, isCurrentUser: false },
  { rank: 2, name: 'Amit', score: 95, isCurrentUser: false },
  { rank: 3, name: 'Sunita', score: 89, isCurrentUser: false },
  { rank: 4, name: 'Partha', score: 72, isCurrentUser: true },
  { rank: 5, name: 'Vikram', score: 68, isCurrentUser: false },
  { rank: 6, name: 'Priya', score: 65, isCurrentUser: false },
];

export const survivalGuides: SurvivalGuide[] = [
    { title: 'Basic First Aid', summary: 'Learn essential life-saving techniques.', icon: FirstAidIcon },
    { title: 'Finding Water', summary: 'How to find and purify water.', icon: WaterIcon },
    { title: 'Building a Shelter', summary: 'Create temporary protection.', icon: ShelterIcon },
];

export const newsUpdates: NewsUpdate[] = [
    { title: 'NDMA issues cyclone alert for coastal regions.', source: 'NDMA', date: '2h ago', category: 'Alert' },
    { title: 'New earthquake-resistant building tech tested.', source: 'Science Daily', date: '1d ago', category: 'Innovation' },
    { title: 'How students in Assam handled a fire safely.', source: 'Local Times', date: '3d ago', category: 'Success Story' },
];

export const emergencyContacts: EmergencyContact[] = [
    { name: 'Police', number: '100', icon: PhoneIcon },
    { name: 'Ambulance', number: '108', icon: PhoneIcon },
    { name: 'Fire Dept.', number: '101', icon: PhoneIcon },
    { name: 'Mom', number: '98XXXXXX01', icon: PhoneIcon },
    { name: 'Teacher', number: '98XXXXXX02', icon: PhoneIcon },
];