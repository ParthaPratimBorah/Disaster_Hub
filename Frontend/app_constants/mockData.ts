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
  EmergencyContact,
  Simulation,
  QuizQuestion,
  VisualNovelScene,
} from '../types';
import {
    QuizIcon, SimulationIcon, BuildingIcon, FireIcon, WaterIcon, FirstAidIcon, ShelterIcon, PhoneIcon
} from './icons';

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

const floodQuizQuestions: QuizQuestion[] = [
    { id: 1, question: "What is the safest way to move during a flood?", options: ["Drive through the water quickly", "Walk or swim through the water", "Avoid moving through floodwater", "Use a small boat"], correctAnswerIndex: 2, explanation: "Never walk, swim, or drive through floodwaters. It can be deeper and faster-moving than it appears and may be contaminated." },
    { id: 2, question: "Where should you move your essential items before a flood?", options: ["To the basement", "To a higher ground", "Outside", "Keep them where they are"], correctAnswerIndex: 1, explanation: "Move essential items and valuables to a higher floor or elevated area to protect them from flood damage." },
];
const cycloneQuizQuestions: QuizQuestion[] = [
    { id: 1, question: "What should you do with loose objects outside your house before a cyclone?", options: ["Leave them be", "Bring them inside or secure them", "Hide them under a tree", "Cover them with a cloth"], correctAnswerIndex: 1, explanation: "Loose objects can become dangerous projectiles in high winds. They should be brought inside or tied down securely." },
    { id: 2, question: "During a cyclone, the safest place to be is:", options: ["Near a window to see what's happening", "In a car", "An interior room, away from windows", "On the roof"], correctAnswerIndex: 2, explanation: "Stay indoors in a small, interior room on the lowest level, away from windows, skylights, and doors." },
];
const earthquakeQuizQuestions: QuizQuestion[] = [
    { id: 1, question: "The 'Drop, Cover, and Hold On' technique means:", options: ["Drop what you're doing, cover your head, hold your breath", "Drop to the floor, take cover under something sturdy, hold on", "Drop outside, cover the car, hold the door", "Drop your phone, cover your friend, hold them tight"], correctAnswerIndex: 1, explanation: "'Drop, Cover, and Hold On' is the key safety action during an earthquake to protect yourself from falling debris." },
    { id: 2, question: "After an earthquake, if you are in a damaged building, you should:", options: ["Go back in to get your belongings", "Stay inside and wait for help", "Move outside to an open space away from buildings", "Use the elevator to get out quickly"], correctAnswerIndex: 2, explanation: "Evacuate to an open area as soon as the shaking stops. Be prepared for aftershocks and stay away from damaged structures." },
];
const fireQuizQuestions: QuizQuestion[] = [
    { id: 1, question: "How often should you test your smoke alarms?", options: ["Once a year", "Once every five years", "Once a month", "Only when the battery beeps"], correctAnswerIndex: 2, explanation: "Smoke alarms should be tested at least once a month to ensure they are working correctly." },
    { id: 2, question: "If your clothes catch fire, what should you do?", options: ["Run to find water", "Wave your arms to put it out", "Stop, Drop, and Roll", "Scream for help"], correctAnswerIndex: 2, explanation: "Stop immediately, drop to the ground, and roll over and over to smother the flames. Running will only make the fire burn faster." },
];

const floodVisualNovelGame: VisualNovelScene[] = [
    { id: 0, background: 'https://images.unsplash.com/photo-1567482566718-d4b5a9a4e69b?q=80&w=2970&auto=format&fit=crop', character: 'Radio Announcer', text: '"Weather alert! Heavy rains are expected, and a flood warning has been issued for our area. Please take necessary precautions."', nextSceneId: 1 },
    { id: 1, background: 'https://images.unsplash.com/photo-1567482566718-d4b5a9a4e69b?q=80&w=2970&auto=format&fit=crop', character: 'You', text: 'The water level outside is rising slowly. I should do something. What\'s the first step?', choices: [{ text: 'Check my family\'s safety kit.', nextSceneId: 2 }, { text: 'Wait and see if it gets worse.', nextSceneId: 3 }] },
    { id: 2, background: 'https://images.unsplash.com/photo-1615796151283-32497675dd20?q=80&w=2970&auto=format&fit=crop', character: 'Narrator', text: 'Good choice! You check the kit. It has a flashlight, first-aid supplies, and some dry food. The water is now near your doorstep.', nextSceneId: 4 },
    { id: 3, background: 'https://images.unsplash.com/photo-1567482566718-d4b5a9a4e69b?q=80&w=2970&auto=format&fit=crop', character: 'Narrator', text: 'You wait for 30 minutes. The water is now inside the house. You\'ve lost valuable time.', nextSceneId: 4 },
    { id: 4, background: 'https://images.unsplash.com/photo-1583391742915-0b04bb43405a?q=80&w=2970&auto=format&fit=crop', character: 'You', text: 'We need to move. Where should we go?', choices: [{ text: 'Move to the second floor of our house.', nextSceneId: 5 }, { text: 'Try to walk to the neighbor\'s house.', nextSceneId: 6 }] },
    { id: 5, background: 'https://images.unsplash.com/photo-1583391742915-0b04bb43405a?q=80&w=2970&auto=format&fit=crop', character: 'Narrator', text: 'You made the right choice.', isEndScene: true, endMessage: 'You move to the second floor. It\'s the correct decision to seek higher ground within your own home if it\'s sturdy. You wait safely until help arrives. Well done!' },
    { id: 6, background: 'https://images.unsplash.com/photo-1583391742915-0b04bb43405a?q=80&w=2970&auto=format&fit=crop', character: 'Narrator', text: 'A dangerous mistake...', isEndScene: true, endMessage: 'You step outside. The current is stronger than you thought and sweeps you off your feet. This is very dangerous. Always avoid walking through floodwaters. A better choice would have been to seek higher ground.' },
];


export const educationModules: EducationModule[] = [
    { 
        id: 1,
        title: 'Flood Preparedness', 
        disasterType: 'Flood', 
        thumbnail: '/public/module_thumbnail_flood.png',
        image: '/public/module_thumbnail_flood.png',
        content: [
            { heading: 'Before a Flood', text: 'Create a family emergency plan and assemble a safety kit. Know your evacuation routes. Secure your home by moving essential items to higher ground.' },
            { heading: 'During a Flood', text: 'Evacuate immediately if advised. Never walk, swim, or drive through floodwaters. Stay informed through official channels.' },
            { heading: 'After a Flood', text: 'Return home only when authorities say it is safe. Avoid floodwaters as they may be contaminated. Check for damage to your home before entering.' },
        ],
        quiz: floodQuizQuestions,
        visualNovelGame: floodVisualNovelGame,
    },
    { 
        id: 2,
        title: 'Cyclone Safety', 
        disasterType: 'Cyclone', 
        thumbnail: '/public/module_thumbnail_cyclone.png',
        image: '/public/module_thumbnail_cyclone.png',
        content: [
            { heading: 'Before a Cyclone', text: 'Board up windows and secure loose objects outside. Have a full safety kit ready. Know the location of the nearest official shelter.' },
            { heading: 'During a Cyclone', text: 'Stay indoors, away from windows. Listen to the radio for updates. If the eye of the storm passes, be aware that the winds will return from the opposite direction.' },
            { heading: 'After a Cyclone', text: 'Beware of downed power lines, damaged roads, and flooding. Do not enter damaged buildings until they have been inspected.' },
        ],
        quiz: cycloneQuizQuestions,
        visualNovelGame: [],
    },
    { 
        id: 3,
        title: 'Earthquake Survival', 
        disasterType: 'Earthquake', 
        thumbnail: '/public/module_thumbnail_earthquake.png',
        image: '/public/module_thumbnail_earthquake.png',
        content: [
            { heading: 'Before an Earthquake', text: 'Secure heavy furniture to walls. Identify safe spots in each room (under a sturdy table, against an interior wall). Practice "Drop, Cover, and Hold On."' },
            { heading: 'During an Earthquake', text: 'Drop, Cover, and Hold On. Stay away from windows and anything that could fall. If outdoors, stay in an open area away from buildings and power lines.' },
            { heading: 'After an Earthquake', text: 'Check yourself and others for injuries. Be prepared for aftershocks. If you smell gas, open a window and leave immediately.' },
        ],
        quiz: earthquakeQuizQuestions,
        visualNovelGame: [],
    },
    { 
        id: 4,
        title: 'Fire Safety 101', 
        disasterType: 'Fire', 
        thumbnail: '/public/module_thumbnail_fire.png',
        image: '/public/module_thumbnail_fire.png',
        content: [
            { heading: 'Fire Prevention', text: 'Install smoke alarms and test them monthly. Be careful with candles and cooking equipment. Have a fire extinguisher and know how to use it.' },
            { heading: 'During a Fire', text: 'If a fire starts, get out and stay out. Follow your family escape plan. Feel doors for heat before opening. Crawl low under smoke.' },
            { heading: 'After a Fire', text: 'Do not re-enter a fire-damaged building until the fire department says it is safe. Contact your family and let them know you are okay.' },
        ],
        quiz: fireQuizQuestions,
        visualNovelGame: [],
    },
];

export const drills: Drill[] = [
    { title: 'Quiz Drill', description: 'Test your knowledge', icon: QuizIcon, type: 'Quiz' },
    { title: 'Situation Simulation', description: 'What would you do?', icon: SimulationIcon, type: 'Simulation' },
];

export const simulations: Simulation[] = [
    {
        id: 1,
        title: 'Earthquake: Drop, Cover, Hold On',
        description: 'Practice the correct safety procedure during an earthquake in a virtual classroom.',
        icon: BuildingIcon,
        difficulty: 'Easy',
        time: '5 min',
        thumbnail: '/public/game_thumbnail_earthquake.png',
    },
    {
        id: 2,
        title: 'Fire Evacuation Drill',
        description: 'Navigate through a smoke-filled building to find the nearest safe exit.',
        icon: FireIcon,
        difficulty: 'Medium',
        time: '10 min',
        thumbnail: '/public/game_thumbnail_fire.png',
    },
    {
        id: 3,
        title: 'Flood Response: High Ground',
        description: 'Make critical decisions to protect yourself and your belongings as floodwaters rise.',
        icon: WaterIcon,
        difficulty: 'Hard',
        time: '15 min',
        thumbnail: '/public/game_thumbnail_flood.png',
    }
];

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: "What is the first thing you should do during an earthquake?",
        options: ["Run outside immediately", "Stand in a doorway", "Drop, Cover, and Hold On", "Call for help"],
        correctAnswerIndex: 2,
        explanation: "Drop to the ground, take cover under a sturdy table, and hold on until the shaking stops. This protects you from falling objects."
    },
    {
        id: 2,
        question: "Which of these items is NOT essential for a basic emergency kit?",
        options: ["Water", "First-aid supplies", "Video games", "Flashlight"],
        correctAnswerIndex: 2,
        explanation: "While entertainment is nice, it's not essential for survival. Water, first-aid, and a light source are critical."
    },
    {
        id: 3,
        question: "If you smell gas after an earthquake, what should you do?",
        options: ["Turn on the lights to see better", "Open a window and leave immediately", "Light a match to find the leak", "Ignore it, it's probably nothing"],
        correctAnswerIndex: 1,
        explanation: "If it's safe to do so, open a window and then evacuate the building immediately. Do not use any electronics or create sparks."
    },
    {
        id: 4,
        question: "What does 'evacuation' mean?",
        options: ["Staying in your home", "Moving to a designated safe location", "Going to a friend's house", "Hiding in the basement"],
        correctAnswerIndex: 1,
        explanation: "Evacuation is the process of moving from a place of danger to a safer location, often following instructions from authorities."
    },
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
    { id: 1, type: 'shelter', position: { lat: 22.5830, lng: 88.3433 }, name: 'Howrah Station' },
    { id: 2, type: 'shelter', position: { lat: 22.5683, lng: 88.3719 }, name: 'Sealdah Station' },
    { id: 3, type: 'danger', position: { lat: 22.5600, lng: 88.3400 }, name: 'Low-lying Area', radius: 500 },
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
    { 
        id: 1,
        title: 'Basic First Aid', 
        summary: 'Learn essential life-saving techniques.', 
        icon: FirstAidIcon,
        content: [
            { step: "Check for Danger", description: "Before approaching an injured person, ensure the area is safe for you and them. Look for traffic, fire, or other hazards." },
            { step: "Check for Response", description: "Gently tap their shoulders and ask loudly, 'Are you okay?'. If they respond, they are conscious." },
            { step: "Call for Help", description: "If there's no response or the person is badly injured, call your local emergency number (e.g., 108 in India) immediately or ask someone else to do it." },
            { step: "Control Bleeding", description: "If there is bleeding, apply firm pressure to the wound with a clean cloth or bandage until help arrives." },
            { step: "Treat for Shock", description: "Help the person lie down, keep them warm, and elevate their legs if possible. Do not give them anything to eat or drink." }
        ]
    },
    { 
        id: 2,
        title: 'Finding Water', 
        summary: 'How to find and purify water.', 
        icon: WaterIcon,
        content: [
            { step: "Look for Green Vegetation", description: "Lush green plants are a strong indicator that water is nearby, either on the surface or just below the ground." },
            { step: "Collect Morning Dew", description: "Tie clean rags around your ankles and walk through tall grass at dawn. Wring the collected dew into a container." },
            { step: "Follow Animal Trails", description: "Animals need water to survive. Trails, especially those leading downhill, can often lead to a water source." },
            { step: "Purify Before Drinking", description: "Always purify water from natural sources. The best method is to boil it for at least one minute. If you can't, use water purification tablets." }
        ]
    },
    { 
        id: 3,
        title: 'Building a Shelter', 
        summary: 'Create temporary protection.', 
        icon: ShelterIcon,
        content: [
            { step: "Find a Good Location", description: "Choose a dry, flat spot. Avoid low areas that could flood and the bases of unstable hills. Look for natural protection like rock overhangs." },
            { step: "Build a Lean-To Frame", description: "Find a large, sturdy branch and lean it against a tree or between two trees. This will be your main support ridge." },
            { step: "Add Ribs and Insulation", description: "Place smaller branches along the sides of the main ridge to create a 'rib cage'. Then, pile leaves, pine needles, and other debris on top. The thicker, the better for insulation." },
            { step: "Create a Bed", description: "Make a thick pile of dry leaves or pine needles on the floor of your shelter to insulate you from the cold ground." }
        ]
    },
];

export const newsUpdates: NewsUpdate[] = [
    { 
        id: 1, 
        title: 'NDMA issues cyclone alert for coastal regions.', 
        source: 'NDMA', 
        date: '2h ago', 
        category: 'Alert',
        image: '/public/alert.png',
        content: 'The National Disaster Management Authority has issued a high alert for all coastal regions in the east, predicting a severe cyclone in the next 48 hours. Fishermen are advised not to venture into the sea. Evacuation procedures have been initiated in low-lying areas. Please tune in to local news for regular updates and follow all safety advisories.'
    },
    { 
        id: 2, 
        title: 'New earthquake-resistant building tech tested.', 
        source: 'Science Daily', 
        date: '1d ago', 
        category: 'Innovation',
        image: '/public/inovation.png',
        content: 'Researchers at the National Institute of Technology have successfully tested a new base-isolation technology for buildings that can withstand earthquakes up to magnitude 8.5. This innovative approach uses flexible bearings to separate the building structure from the ground, absorbing seismic waves and preventing collapse. This could revolutionize construction in earthquake-prone zones.'
    },
    { 
        id: 3, 
        title: 'How students in Assam handled a fire safely.', 
        source: 'Local Times', 
        date: '3d ago', 
        category: 'Success Story',
        image: '/public/success.png',
        content: 'Quick thinking and regular fire drill practice saved the day at a school in Assam last week. When a small fire broke out in the science lab, students calmly alerted their teacher, activated the fire alarm, and evacuated the building in an orderly fashion. Firefighters praised the school\'s preparedness, highlighting it as a model for others.'
    },
];

export const emergencyContacts: EmergencyContact[] = [
    { name: 'Police', number: '100', icon: PhoneIcon },
    { name: 'Ambulance', number: '108', icon: PhoneIcon },
    { name: 'Fire Dept.', number: '101', icon: PhoneIcon },
    { name: 'Mom', number: '98XXXXXX01', icon: PhoneIcon },
    { name: 'Teacher', number: '98XXXXXX02', icon: PhoneIcon },
];