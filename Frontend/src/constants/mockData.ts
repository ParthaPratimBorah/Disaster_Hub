import type { User, EducationModule, Badge, MapPoint, HistoryItem, SafetyKitItem, LeaderboardUser, SurvivalGuide, NewsUpdate, EmergencyContact } from '../types';
import { FirstAidIcon, WaterIcon, ShelterIcon, PhoneIcon } from './icons';
import { FloodSVG, CycloneSVG, EarthquakeSVG, FireSVG } from './icons'; // <-- Correct Import Statement

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

export const educationModules: EducationModule[] = [ // <-- Explicit Type
    { title: 'Flood Preparedness', disasterType: 'Flood', thumbnail: FloodSVG },
    { title: 'Cyclone Safety', disasterType: 'Cyclone', thumbnail: CycloneSVG },
    { title: 'Earthquake Survival', disasterType: 'Earthquake', thumbnail: EarthquakeSVG },
    { title: 'Fire Safety 101', disasterType: 'Fire', thumbnail: FireSVG },
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