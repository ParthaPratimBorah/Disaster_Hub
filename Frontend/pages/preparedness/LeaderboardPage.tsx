import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import { Page } from '../../types';
import { leaderboardData } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

const LeaderboardPage: React.FC = () => {
    const { setCurrentPage, PALETTE } = useAppContext();

    return (
        <div>
            <PageHeader title="Preparedness Leaderboard" onBack={() => setCurrentPage(Page.HOME)} />
            <div className="space-y-3">
            {leaderboardData.map(player => (
                <div 
                key={player.rank} 
                className="flex items-center gap-4 p-3 rounded-xl"
                style={{ 
                    backgroundColor: PALETTE.card, 
                    boxShadow: PALETTE.button_shadow,
                    border: player.isCurrentUser ? `2px solid ${PALETTE.accent}` : '2px solid transparent'
                }}>
                <p className="text-xl font-bold w-8 text-center" style={{ color: PALETTE.text_secondary }}>{player.rank}</p>
                <img src={`https://i.pravatar.cc/150?u=${player.name}`} alt={player.name} className="w-10 h-10 rounded-full" />
                <p className="font-bold flex-1" style={{ color: PALETTE.text_primary }}>{player.name}</p>
                <p className="font-bold" style={{ color: PALETTE.accent }}>{player.score} pts</p>
                </div>
            ))}
            </div>
        </div>
    );
};

export default LeaderboardPage;
