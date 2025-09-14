import React from 'react';
import type { NewsUpdate } from '../../types';
import { newsUpdates } from '../../constants/mockData';
import { PREPAREDNESS_PALETTE } from '../../constants/palettes';

const NewsUpdates: React.FC = () => {
  const categoryColor = (category: NewsUpdate['category']) => {
    switch(category) {
      case 'Alert': return PREPAREDNESS_PALETTE.category_alert;
      case 'Innovation': return PREPAREDNESS_PALETTE.category_innovation;
      case 'Success Story': return PREPAREDNESS_PALETTE.category_success;
      default: return PREPAREDNESS_PALETTE.text_secondary;
    }
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-2" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>News & Updates</h3>
      <div className="space-y-3">
        {newsUpdates.map(update => (
          <div key={update.title} className="p-4 rounded-xl" style={{ backgroundColor: PREPAREDNESS_PALETTE.card, boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
            <div className="flex justify-between items-start">
              <p className="font-bold text-sm mb-1" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>{update.title}</p>
              <span className="text-xs font-semibold px-2 py-1 rounded-full text-white" style={{ backgroundColor: categoryColor(update.category) }}>{update.category}</span>
            </div>
            <p className="text-xs" style={{ color: PREPAREDNESS_PALETTE.text_secondary }}>{update.source} • {update.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsUpdates;