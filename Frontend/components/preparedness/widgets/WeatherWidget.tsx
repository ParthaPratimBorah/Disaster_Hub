import React from 'react';
import { WeatherIcon, PREPAREDNESS_PALETTE } from '../../../constants';

const WeatherWidget: React.FC = () => (
  <div className="p-4 rounded-xl flex items-center justify-between" style={{ backgroundColor: PREPAREDNESS_PALETTE.card, boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
    <div>
      <p className="font-bold text-2xl" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>28°C</p>
      <p className="text-sm" style={{ color: PREPAREDNESS_PALETTE.text_secondary }}>Sunny</p>
    </div>
    <WeatherIcon className="w-10 h-10" style={{ color: PREPAREDNESS_PALETTE.accent }} />
  </div>
);

export default WeatherWidget;
