import React from 'react';
import { NewsUpdate, Page } from '../../types';
import { newsUpdates, PREPAREDNESS_PALETTE } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

const NewsUpdates: React.FC = () => {
  const { setCurrentPage, setSelectedNews } = useAppContext();

  const categoryColor = (category: NewsUpdate['category']) => {
    switch(category) {
      case 'Alert': return '#DC586D';
      case 'Innovation': return '#8AAEE0';
      case 'Success Story': return '#28a745';
      default: return PREPAREDNESS_PALETTE.text_secondary;
    }
  }

  const handleNewsClick = (newsItem: NewsUpdate) => {
    setSelectedNews(newsItem);
    setCurrentPage(Page.NEWS_DETAIL);
  };

  return (
    <div>
       <h3 className="text-lg font-bold mb-2" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>News & Updates</h3>
       <div className="space-y-3">
        {newsUpdates.map(update => (
          <button 
            key={update.id} 
            onClick={() => handleNewsClick(update)}
            className="w-full text-left p-4 rounded-xl" 
            style={{ backgroundColor: PREPAREDNESS_PALETTE.card, boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
            <div className="flex justify-between items-start">
              <p className="font-bold text-sm mb-1 pr-2" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>{update.title}</p>
              <span className="flex-shrink-0 text-xs font-semibold px-2 py-1 rounded-full text-white" style={{ backgroundColor: categoryColor(update.category) }}>{update.category}</span>
            </div>
            <p className="text-xs" style={{ color: PREPAREDNESS_PALETTE.text_secondary }}>{update.source} • {update.date}</p>
          </button>
        ))}
       </div>
    </div>
  );
};

export default NewsUpdates;