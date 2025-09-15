import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Page } from '../../types';
import { ArrowLeftIcon } from '../../constants';

const EarthquakeVisualNovelPage: React.FC = () => {
    const { setCurrentPage, PALETTE } = useAppContext();

    return (
        <div className="w-full h-full flex flex-col">
            <header 
                className="p-4 flex items-center gap-4 flex-shrink-0"
                style={{ backgroundColor: PALETTE.background, boxShadow: `0 2px 4px ${PALETTE.shadow_dark}30` }}
            >
                <button onClick={() => setCurrentPage(Page.SIMULATION_LIST)} className="p-2 rounded-full" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                    <ArrowLeftIcon className="w-6 h-6" style={{ color: PALETTE.text_primary }} />
                </button>
                <h1 className="text-xl font-bold" style={{ color: PALETTE.text_primary }}>Earthquake Simulation</h1>
            </header>
            <main className="flex-1">
                <iframe 
                    src="/visualnovel.html" 
                    title="Earthquake Survival Visual Novel"
                    className="w-full h-full border-none"
                />
            </main>
        </div>
    );
};

export default EarthquakeVisualNovelPage;
