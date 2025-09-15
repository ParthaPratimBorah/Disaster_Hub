import React from 'react';

export enum Page {
  HOME,
  DRILLS,
  MAP,
  PROFILE,
  LEARN,
  SAFETY_KIT,
  LEADERBOARD,
  SIMULATION_LIST,
  QUIZ,
  NEWS_DETAIL,
  SURVIVAL_GUIDE_DETAIL,
  MODULE_DETAIL,
  VISUAL_NOVEL_GAME,
  REPORT,
  AI_CHAT,
  VISUAL_NOVEL_EARTHQUAKE,
  CRISIS_HOME,
  CRISIS_MAP,
  CONTACTS,
  CRISIS_PROFILE,
}

export enum Mode {
  PREPAREDNESS,
  CRISIS,
}

export interface User {
  name: string;
  avatar: string;
  class: string;
  school: string;
  preparednessScore: number;
  rank: number;
  badges: Badge[];
}

export interface EducationModule {
  id: number;
  title: string;
  disasterType: string;
  thumbnail: string;
  image: string;
  content: { heading: string; text: string; }[];
  quiz: QuizQuestion[];
  visualNovelGame: VisualNovelScene[];
}

export interface Drill {
  title: string;
  description: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  type: 'Quiz' | 'Simulation' | 'AR/VR';
}

export interface Simulation {
    id: number;
    title: string;
    description: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    time: string;
    thumbnail: string;
}

export interface Badge {
    name: string;
    icon: string;
}

export interface MapPoint {
    id: number;
    type: 'shelter' | 'danger';
    position: { lat: number; lng: number; };
    name: string;
    radius?: number;
}

export interface HistoryItem {
    id: number;
    title: string;
    type: 'Drill' | 'Module';
    date: string;
}

export interface SafetyKitItem {
    id: number;
    name: string;
    checked: boolean;
}

export interface LeaderboardUser {
    rank: number;
    name: string;
    score: number;
    isCurrentUser: boolean;
}

export interface SurvivalGuide {
    id: number;
    title: string;
    summary: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
    content: { step: string; description: string; }[];
}

export interface NewsUpdate {
    id: number;
    title: string;
    source: string;
    date: string;
    category: 'Alert' | 'Innovation' | 'Success Story';
    image: string;
    content: string;
}

export interface EmergencyContact {
    name: string;
    number: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

export interface VisualNovelScene {
    id: number;
    background: string;
    character?: string;
    text: string;
    choices?: { text: string; nextSceneId: number; }[];
    nextSceneId?: number;
    isEndScene?: boolean;
    endMessage?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}