import React from 'react';
import { Page } from '../../types';
import { user, TrophyIcon, ChevronRightIcon, PREPAREDNESS_PALETTE } from '../../constants';
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
            <button onClick={() => setCurrentPage(Page.LEADERBOARD)} className="text-sm font-semibold p-2 rounded-lg" style={{ color: PREPAREDNESS_PALETTE.accent }}>
            <ChevronRightIcon className="w-6 h-6" />
            </button>
        </div>
    );
};

export default LeaderboardHighlight;
