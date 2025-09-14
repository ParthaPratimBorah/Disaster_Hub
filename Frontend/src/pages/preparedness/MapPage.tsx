import React, { useState } from 'react';
import ToggleSwitch from '../../components/common/ToggleSwitch';
import { mapPoints, ShelterIcon } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

const MapPage: React.FC = () => {
    const { PALETTE } = useAppContext();
    const [showShelters, setShowShelters] = useState(true);
    const [showDangerZones, setShowDangerZones] = useState(true);
    const [showRoutes, setShowRoutes] = useState(true);

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>Preparedness Map</h1>
            <div className="relative w-full h-64 rounded-xl overflow-hidden" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <img src="https://i.imgur.com/3Z6gB2g.png" alt="Map of area" className="w-full h-full object-cover" />
                {showDangerZones && <div className="absolute rounded-full" style={{ top: '50%', left: '10%', width: '30%', height: '30%', backgroundColor: 'rgba(220, 88, 109, 0.4)' }}></div>}
                {showRoutes && <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 10 }}><path d="M 80 200 Q 150 150 220 50" stroke="#628ECB" strokeWidth="4" fill="none" strokeDasharray="8, 8"/></svg>}
                {showShelters && mapPoints.filter(p => p.type === 'shelter').map(point => (
                    <div key={point.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ top: point.position.top, left: point.position.left, zIndex: 20 }}>
                        <div className="p-1 text-xs bg-green-500 text-white rounded-md mb-1">{point.name}</div>
                        <ShelterIcon className="w-8 h-8 text-white bg-green-500 rounded-full p-1" />
                    </div>
                ))}
            </div>
             <div className="p-4 rounded-xl space-y-3" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <h3 className="font-bold" style={{ color: PALETTE.text_primary }}>Map Layers</h3>
                <div className="flex justify-between items-center text-sm">
                    <label style={{ color: PALETTE.text_secondary }}>🟩 Safe Shelters</label>
                    <ToggleSwitch checked={showShelters} onChange={() => setShowShelters(s => !s)} />
                </div>
                 <div className="flex justify-between items-center text-sm">
                    <label style={{ color: PALETTE.text_secondary }}>🟥 Danger Zones</label>
                    <ToggleSwitch checked={showDangerZones} onChange={() => setShowDangerZones(s => !s)} />
                </div>
                 <div className="flex justify-between items-center text-sm">
                    <label style={{ color: PALETTE.text_secondary }}>🟦 Evacuation Routes</label>
                    <ToggleSwitch checked={showRoutes} onChange={() => setShowRoutes(s => !s)} />
                </div>
            </div>
        </div>
    );
};

export default MapPage;
