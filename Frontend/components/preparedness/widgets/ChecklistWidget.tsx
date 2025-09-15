import React from 'react';
import { PREPAREDNESS_PALETTE } from '../../../constants';

const ChecklistWidget: React.FC = () => (
  <div className="p-4 rounded-xl" style={{ backgroundColor: PREPAREDNESS_PALETTE.card, boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
    <p className="font-bold text-sm mb-2" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>Safety Checklist</p>
    <div className="w-full h-2 rounded-full" style={{ backgroundColor: PREPAREDNESS_PALETTE.background, boxShadow: PREPAREDNESS_PALETTE.button_inset_shadow }}>
      <div className="w-3/5 h-2 rounded-full" style={{ backgroundColor: PREPAREDNESS_PALETTE.accent }}></div>
    </div>
    <p className="text-xs text-right mt-1" style={{ color: PREPAREDNESS_PALETTE.text_secondary }}>3/5 items</p>
  </div>
);

export default ChecklistWidget;
