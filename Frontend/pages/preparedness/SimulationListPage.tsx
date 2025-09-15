import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import { Page } from '../../types';
import { simulations } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

const SimulationListPage: React.FC = () => {
    const { setCurrentPage, PALETTE } = useAppContext();

    const getDifficultyColor = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
        switch (difficulty) {
            case 'Easy':
                return '#28a745'; // Green
            case 'Medium':
                return '#ffc107'; // Yellow/Orange
            case 'Hard':
                return '#dc3545'; // Red
        }
    };

    return (
        <div>
            <PageHeader title="Situation Simulations" onBack={() => setCurrentPage(Page.DRILLS)} />
            <div className="space-y-4">
                {simulations.map(sim => (
                    <div key={sim.id} className="p-4 rounded-xl space-y-3" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                        <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_inset_shadow }}>
                                <sim.icon className="w-8 h-8" style={{ color: PALETTE.accent }}/>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold" style={{ color: PALETTE.text_primary }}>{sim.title}</h3>
                                <div className="flex items-center gap-4 text-xs mt-1" style={{ color: PALETTE.text_secondary }}>
                                    <span>
                                        Difficulty: <span style={{ color: getDifficultyColor(sim.difficulty), fontWeight: 'bold' }}>{sim.difficulty}</span>
                                    </span>
                                    <span>|</span>
                                    <span>Time: <strong>{sim.time}</strong></span>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm" style={{ color: PALETTE.text_secondary }}>{sim.description}</p>
                        <button 
                            className="w-full py-2 mt-2 rounded-lg font-semibold transition-all duration-200"
                            style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                            onClick={() => {
                                if (sim.id === 1) { // Specifically for the earthquake sim
                                    setCurrentPage(Page.VISUAL_NOVEL_EARTHQUAKE);
                                } else {
                                    alert(`Starting simulation: ${sim.title}!`);
                                }
                            }}
                        >
                            Start Simulation
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimulationListPage;