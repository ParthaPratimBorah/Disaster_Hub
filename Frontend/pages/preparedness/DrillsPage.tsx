import React from 'react';
import ScoreRing from '../../components/common/ScoreRing';
import { user, drills, badges, quizQuestions } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';
import { Page } from '../../types';

const DrillsPage: React.FC = () => {
    const { PALETTE, setCurrentPage, setActiveQuizQuestions, setQuizSourcePage } = useAppContext();
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>Drills & Training</h1>
            <ScoreRing score={user.preparednessScore} />
            <div 
                className="p-4 rounded-xl"
                style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}
            >
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold" style={{ color: PALETTE.text_primary }}>Today's Drill</h3>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ backgroundColor: PALETTE.accent, color: PALETTE.background }}>LIVE</span>
                </div>
                <p className="text-sm mb-4" style={{ color: PALETTE.text_secondary }}>Flood Escape Simulation</p>
                <button 
                    className="w-full py-2 rounded-lg font-semibold transition-all duration-200"
                    style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                    onClick={() => alert("Starting Flood Escape Simulation!")}
                >
                    Start Now
                </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                {drills.map((drill) => (
                    <div key={drill.title} className="p-4 rounded-xl flex flex-col items-center text-center" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                        <drill.icon className="w-8 h-8 mb-2" style={{ color: PALETTE.accent }} />
                        <h4 className="font-semibold text-sm" style={{ color: PALETTE.text_primary }}>{drill.title}</h4>
                        <p className="text-xs mb-3" style={{ color: PALETTE.text_secondary }}>{drill.description}</p>
                        <button 
                            className="mt-auto w-full py-1 text-xs rounded-lg font-semibold"
                             style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                            onClick={() => {
                                if (drill.type === 'Simulation') {
                                    setCurrentPage(Page.SIMULATION_LIST);
                                } else if (drill.type === 'Quiz') {
                                    setActiveQuizQuestions(quizQuestions);
                                    setQuizSourcePage(Page.DRILLS);
                                    setCurrentPage(Page.QUIZ);
                                } else {
                                    alert(`Starting ${drill.title}!`);
                                }
                            }}
                        >
                            Start
                        </button>
                    </div>
                ))}
            </div>

            <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: PALETTE.text_primary }}>Badges Earned</h3>
                <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                    {badges.map(badge => (
                        <div key={badge.name} className="flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-xl w-24 h-24" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                            <span className="text-3xl">{badge.icon}</span>
                            <p className="text-xs font-semibold text-center mt-1" style={{ color: PALETTE.text_secondary }}>{badge.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DrillsPage;