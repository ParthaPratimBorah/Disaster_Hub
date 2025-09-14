// DrillsPage.tsx
import React, { useState } from 'react';
import ScoreRing from '../../components/common/ScoreRing';
import { user, badges } from '../../constants/mockData';
import { drillContent } from '../../constants/drillStories';
import { useAppContext } from '../../contexts/AppContext';
import VisualNovel from '../../components/game/VisualNovel';

const DrillsPage: React.FC = () => {
    const { PALETTE } = useAppContext();
    const [activeDrillStory, setActiveDrillStory] = useState<any | null>(null);

    return (
        <div className="space-y-6">
            {/* ... other code */}
            
            <div className="grid grid-cols-2 gap-4">
                {drillContent.map((drill) => (
                    <div
                        key={drill.title}
                        className="p-4 rounded-xl flex flex-col items-center text-center"
                        style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}
                    >
                        <drill.icon className="w-8 h-8 mb-2" style={{ color: PALETTE.accent }} />
                        <h4 className="font-semibold text-sm" style={{ color: PALETTE.text_primary }}>{drill.title}</h4>
                        <p className="text-xs mb-3" style={{ color: PALETTE.text_secondary }}>{drill.description}</p>
                        <button 
                            className="mt-auto w-full py-1 text-xs rounded-lg font-semibold"
                            style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                            onClick={() => setActiveDrillStory(drill.story)} // <-- This is the key line
                        >
                            Start
                        </button>
                    </div>
                ))}
            </div>

            {/* ... other code */}

            {activeDrillStory && <VisualNovel story={activeDrillStory} onClose={() => setActiveDrillStory(null)} />}
        </div>
    );
};

export default DrillsPage;