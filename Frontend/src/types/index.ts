import React from 'react';

export type Page =
  | 'HOME'
  | 'DRILLS'
  | 'MAP'
  | 'PROFILE'
  | 'LEARN'
  | 'SAFETY_KIT'
  | 'LEADERBOARD'
  | 'CRISIS_HOME'
  | 'CRISIS_MAP'
  | 'CONTACTS'
  | 'CRISIS_PROFILE';

export type Mode = 'PREPAREDNESS' | 'CRISIS';

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
  title: string;
  disasterType: string;
  thumbnail: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

export interface DrillContent {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  story: Record<string, any>;
}

export interface Badge {
  name: string;
  icon: string;
}

export interface MapPoint {
  id: number;
  type: 'shelter' | 'danger' | 'route';
  name: string;
  position: {
    lat: number;
    lng: number;
  };
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
  title: string;
  summary: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

export interface NewsUpdate {
  title: string;
  source: string;
  date: string;
  category: 'Alert' | 'Innovation' | 'Success Story';
}

export interface EmergencyContact {
  name: string;
  number: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}