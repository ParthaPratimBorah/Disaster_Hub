import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Page, Mode, NewsUpdate, SurvivalGuide, EducationModule, QuizQuestion, VisualNovelScene } from '../types';
import { PREPAREDNESS_PALETTE, CRISIS_PALETTE } from '../constants';

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
  selectedNews: NewsUpdate | null;
  setSelectedNews: (news: NewsUpdate | null) => void;
  selectedGuide: SurvivalGuide | null;
  setSelectedGuide: (guide: SurvivalGuide | null) => void;
  selectedModule: EducationModule | null;
  setSelectedModule: (module: EducationModule | null) => void;
  activeQuizQuestions: QuizQuestion[] | null;
  setActiveQuizQuestions: (questions: QuizQuestion[] | null) => void;
  quizSourcePage: Page;
  setQuizSourcePage: (page: Page) => void;
  activeVisualNovel: VisualNovelScene[] | null;
  setActiveVisualNovel: (game: VisualNovelScene[] | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [currentMode, setCurrentMode] = useState<Mode>(Mode.PREPAREDNESS);
  const [selectedNews, setSelectedNews] = useState<NewsUpdate | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<SurvivalGuide | null>(null);
  const [selectedModule, setSelectedModule] = useState<EducationModule | null>(null);
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<QuizQuestion[] | null>(null);
  const [quizSourcePage, setQuizSourcePage] = useState<Page>(Page.DRILLS);
  const [activeVisualNovel, setActiveVisualNovel] = useState<VisualNovelScene[] | null>(null);


  const PALETTE = currentMode === Mode.PREPAREDNESS ? PREPAREDNESS_PALETTE : CRISIS_PALETTE;

  const toggleMode = () => {
    setCurrentMode(prev => {
      const newMode = prev === Mode.PREPAREDNESS ? Mode.CRISIS : Mode.PREPAREDNESS;
      setCurrentPage(newMode === Mode.CRISIS ? Page.CRISIS_HOME : Page.HOME);
      document.body.style.backgroundColor = newMode === Mode.PREPAREDNESS ? PREPAREDNESS_PALETTE.background : CRISIS_PALETTE.background;
      return newMode;
    });
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentMode(Mode.PREPAREDNESS);
    setCurrentPage(Page.HOME);
    document.body.style.backgroundColor = PREPAREDNESS_PALETTE.background;
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
    selectedNews,
    setSelectedNews,
    selectedGuide,
    setSelectedGuide,
    selectedModule,
    setSelectedModule,
    activeQuizQuestions,
    setActiveQuizQuestions,
    quizSourcePage,
    setQuizSourcePage,
    activeVisualNovel,
    setActiveVisualNovel,
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