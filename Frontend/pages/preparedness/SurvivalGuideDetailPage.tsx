import React, { useEffect } from 'react';
import { Page } from '../../types';
import { useAppContext } from '../../contexts/AppContext';
import PageHeader from '../../components/common/PageHeader';

const SurvivalGuideDetailPage: React.FC = () => {
    const { selectedGuide, setSelectedGuide, setCurrentPage, PALETTE } = useAppContext();

    useEffect(() => {
        // If no guide is selected (e.g., on page refresh), navigate back to home
        if (!selectedGuide) {
            setCurrentPage(Page.HOME);
        }
    }, [selectedGuide, setCurrentPage]);

    if (!selectedGuide) {
        return null; // Render nothing while redirecting
    }
    
    const handleBack = () => {
        setCurrentPage(Page.HOME);
        setSelectedGuide(null); // Clear selected guide when going back
    };
    
    const { icon: Icon, title, summary, content } = selectedGuide;

    return (
        <div className="space-y-4">
            <PageHeader title="Survival Guide" onBack={handleBack} />

            <div className="p-4 rounded-xl space-y-4" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_inset_shadow }}>
                        <Icon className="w-10 h-10" style={{ color: PALETTE.accent }}/>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold" style={{ color: PALETTE.text_primary }}>
                            {title}
                        </h1>
                        <p className="text-sm" style={{ color: PALETTE.text_secondary }}>
                            {summary}
                        </p>
                    </div>
                </div>

                <div className="border-t" style={{ borderColor: `${PALETTE.accent}40` }} />

                <div className="space-y-3">
                    {content.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full font-bold text-sm" style={{ backgroundColor: PALETTE.accent, color: PALETTE.background }}>
                                {index + 1}
                            </div>
                            <div>
                                <h3 className="font-bold" style={{ color: PALETTE.text_primary }}>{item.step}</h3>
                                <p className="text-sm" style={{ color: PALETTE.text_secondary }}>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SurvivalGuideDetailPage;
