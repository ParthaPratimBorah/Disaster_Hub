import React from 'react';
import { survivalGuides, PREPAREDNESS_PALETTE } from '../../constants';

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

export default SurvivalGuides;
