import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface ScoreRingProps {
    score: number;
}

const ScoreRing: React.FC<ScoreRingProps> = ({ score }) => {
    const { PALETTE } = useAppContext();
    const size = 140;
    const strokeWidth = 12;
    const radius = (size / 2) - (strokeWidth);
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div 
            className="relative flex items-center justify-center p-4 rounded-full mx-auto" 
            style={{ 
                width: size + 20, 
                height: size + 20, 
                backgroundColor: PALETTE.card, 
                boxShadow: PALETTE.button_shadow 
            }}
        >
            <div 
                className="absolute inset-2 rounded-full" 
                style={{ boxShadow: PALETTE.button_inset_shadow }}
            />
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={PALETTE.background}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={PALETTE.accent}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.35s' }}
                />
            </svg>
            <div className="absolute text-center">
                <span className="text-3xl font-bold" style={{ color: PALETTE.accent }}>{score}</span>
                <p className="text-xs font-semibold" style={{ color: PALETTE.text_secondary }}>Score</p>
            </div>
        </div>
    );
};

export default ScoreRing;
