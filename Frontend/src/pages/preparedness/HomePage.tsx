import React from 'react';
import Header from '../../components/preparedness/Header';
import EducationCarousel from '../../components/preparedness/EducationCarousel';
import WeatherWidget from '../../components/preparedness/widgets/WeatherWidget';
import ChecklistWidget from '../../components/preparedness/widgets/ChecklistWidget';
import LeaderboardHighlight from '../../components/preparedness/LeaderboardHighlight';
import TipOfTheDay from '../../components/preparedness/TipOfTheDay';
import SurvivalGuides from '../../components/preparedness/SurvivalGuides';
import NewsUpdates from '../../components/preparedness/NewsUpdates';
import QuickAccessButtons from '../../components/preparedness/QuickAccessButtons';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Header />
      <EducationCarousel />
      <div className="grid grid-cols-2 gap-4">
        <WeatherWidget />
        <ChecklistWidget />
      </div>
      <LeaderboardHighlight />
      <TipOfTheDay />
      <SurvivalGuides />
      <NewsUpdates />
      <QuickAccessButtons />
    </div>
  );
};

export default HomePage;
