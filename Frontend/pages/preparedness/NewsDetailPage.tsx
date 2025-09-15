import React, { useEffect } from 'react';
import { Page } from '../../types';
import { useAppContext } from '../../contexts/AppContext';
import PageHeader from '../../components/common/PageHeader';

const NewsDetailPage: React.FC = () => {
    const { selectedNews, setSelectedNews, setCurrentPage, PALETTE } = useAppContext();

    useEffect(() => {
        // If no news is selected (e.g., on page refresh), navigate back to home
        if (!selectedNews) {
            setCurrentPage(Page.HOME);
        }
    }, [selectedNews, setCurrentPage]);

    if (!selectedNews) {
        return null; // Render nothing while redirecting
    }
    
    const handleBack = () => {
        setCurrentPage(Page.HOME);
        setSelectedNews(null); // Clear selected news when going back
    };

    const categoryColor = (category: 'Alert' | 'Innovation' | 'Success Story') => {
        switch(category) {
          case 'Alert': return '#DC586D';
          case 'Innovation': return '#8AAEE0';
          case 'Success Story': return '#28a745';
          default: return PALETTE.text_secondary;
        }
    };

    return (
        <div className="space-y-4">
            <PageHeader title="News Detail" onBack={handleBack} />

            <div className="p-4 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                
                <span 
                    className="text-xs font-semibold px-2 py-1 rounded-full text-white mb-2 inline-block" 
                    style={{ backgroundColor: categoryColor(selectedNews.category) }}
                >
                    {selectedNews.category}
                </span>

                <h1 className="text-xl font-bold mb-2" style={{ color: PALETTE.text_primary }}>
                    {selectedNews.title}
                </h1>
                
                <p className="text-xs mb-4" style={{ color: PALETTE.text_secondary }}>
                    {selectedNews.source} • {selectedNews.date}
                </p>

                <p className="text-sm leading-relaxed" style={{ color: PALETTE.text_primary }}>
                    {selectedNews.content}
                </p>
            </div>
        </div>
    );
};

export default NewsDetailPage;