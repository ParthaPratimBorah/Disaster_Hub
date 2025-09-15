import React from 'react';
import { survivalGuides } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';
import { Page, SurvivalGuide } from '../../types';

const SurvivalGuides: React.FC = () => {
  const { setCurrentPage, setSelectedGuide, PALETTE } = useAppContext();

  const handleGuideClick = (guide: SurvivalGuide) => {
    setSelectedGuide(guide);
    setCurrentPage(Page.SURVIVAL_GUIDE_DETAIL);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2" style={{ color: PALETTE.text_primary }}>Survival Guides</h3>
      <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
        {survivalGuides.map(guide => (
          <button 
            key={guide.id}
            onClick={() => handleGuideClick(guide)}
            className="flex-shrink-0 p-4 rounded-xl w-40 text-left" 
            style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}
          >
            <guide.icon className="w-8 h-8 mb-2" style={{ color: PALETTE.accent }} />
            <h4 className="font-bold" style={{ color: PALETTE.text_primary }}>{guide.title}</h4>
            <p className="text-xs" style={{ color: PALETTE.text_secondary }}>{guide.summary}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SurvivalGuides;