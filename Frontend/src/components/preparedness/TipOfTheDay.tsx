import React from 'react';
import { LightbulbIcon, PREPAREDNESS_PALETTE } from '../../constants';

const TipOfTheDay: React.FC = () => (
  <div className="p-4 rounded-xl flex items-start gap-3" style={{ backgroundColor: PREPAREDNESS_PALETTE.card, boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
    <LightbulbIcon className="w-8 h-8 flex-shrink-0" style={{ color: PREPAREDNESS_PALETTE.accent }}/>
    <div>
      <p className="font-bold" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>Tip of the Day</p>
      <p className="text-sm" style={{ color: PREPAREDNESS_PALETTE.text_secondary }}>Keep a whistle in your safety kit to signal for help.</p>
    </div>
  </div>
);

export default TipOfTheDay;
