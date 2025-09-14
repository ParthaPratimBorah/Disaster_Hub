import React from 'react';
import { user } from '../../constants/mockData';
import { TrophyIcon, ChevronRightIcon } from '../../constants/icons';
import { PREPAREDNESS_PALETTE } from '../../constants/palettes';
import { useAppContext } from '../../contexts/AppContext';

const LeaderboardHighlight: React.FC = () => {
    const { setCurrentPage } = useAppContext();
    return (
        <div className="p-4 rounded-xl flex items-center justify-between" style={{ backgroundColor: PREPAREDNESS_PALETTE.card, boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
            <div className="flex items-center gap-3">
                <TrophyIcon className="w-8 h-8" style={{ color: PREPAREDNESS_PALETTE.accent }}/>
                <div>
                    <p className="font-bold" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>You are Rank #{user.rank}</p>
                    <p className="text-sm" style={{ color: PREPAREDNESS_PALETTE.text_secondary }}>in District Preparedness!</p>
                </div>
            </div>
            <button 
                onClick={() => setCurrentPage('LEADERBOARD')}
                className="text-sm font-semibold p-2 rounded-lg"
                style={{ color: PREPAREDNESS_PALETTE.accent }}
            >
                <ChevronRightIcon className="w-6 h-6" />
            </button>
        </div>
    );
};

export default LeaderboardHighlight;