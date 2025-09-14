import React from 'react';
import { mapPoints, ShelterIcon } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

const CrisisMapPage: React.FC = () => {
    const { PALETTE } = useAppContext();
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>Emergency Map</h1>
            <p style={{color: PALETTE.text_secondary}}>Your location is being shared with authorities.</p>
            <div className="relative w-full h-96 rounded-xl overflow-hidden" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <img src="https://i.imgur.com/3Z6gB2g.png" alt="Map of area" className="w-full h-full object-cover opacity-50" />
                {mapPoints.map(point => (
                    <div key={point.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ top: point.position.top, left: point.position.left, zIndex: 20 }}>
                        <div className="p-1 text-xs bg-green-500 text-white rounded-md mb-1">{point.name}</div>
                        <ShelterIcon className="w-8 h-8 text-white bg-green-500 rounded-full p-1" />
                    </div>
                ))}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                </div>
            </div>
        </div>
    );
};

export default CrisisMapPage;
