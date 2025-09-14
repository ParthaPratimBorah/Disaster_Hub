import React, { useState } from 'react';
import ToggleSwitch from '../../components/common/ToggleSwitch';
import { user, CheckCircleIcon } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

const CrisisProfilePage: React.FC = () => {
    const { PALETTE } = useAppContext();
    const [isSafe, setIsSafe] = useState(false);
    return (
        <div className="space-y-6 text-center">
            <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>My Safety Status</h1>
             <div className="flex flex-col items-center p-4 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mb-4" style={{ boxShadow: PALETTE.button_shadow }}/>
                <h2 className="text-xl font-bold" style={{ color: PALETTE.text_primary }}>{user.name}</h2>
                <p className="text-sm" style={{ color: PALETTE.text_secondary }}>{user.school}</p>
             </div>

             <div className="p-4 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: PALETTE.text_primary }}>Are you safe?</h3>
                <div className="flex justify-center items-center gap-4">
                    <span className="font-semibold" style={{ color: PALETTE.text_secondary }}>I need help</span>
                    <ToggleSwitch checked={isSafe} onChange={() => setIsSafe(s => !s)} />
                    <span className="font-semibold" style={{ color: PALETTE.accent }}>I am safe</span>
                </div>
             </div>
              {isSafe && (
                <div className="p-4 rounded-xl flex items-center gap-3" style={{ backgroundColor: 'rgba(46, 182, 125, 0.2)'}}>
                    <CheckCircleIcon className="w-8 h-8 text-green-500" />
                    <p className="text-sm text-left" style={{color: PALETTE.text_primary}}>Your family and teachers have been notified that you are safe.</p>
                </div>
             )}
        </div>
    );
};

export default CrisisProfilePage;
