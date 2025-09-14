import React from 'react';
import CrisisButton from '../../components/common/CrisisButton';
import { SOSIcon, ShelterIcon, PhoneIcon } from '../../constants/icons';
import { useAppContext } from '../../contexts/AppContext';

const CrisisHomePage: React.FC = () => {
    const { setCurrentPage, PALETTE } = useAppContext();
    return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-full p-4 rounded-xl text-center" style={{ backgroundColor: PALETTE.accent }}>
                <h1 className="text-2xl font-bold" style={{ color: PALETTE.background }}>CRISIS ACTIVE</h1>
                <p className="text-sm" style={{ color: PALETTE.background }}>Stay calm and follow instructions.</p>
            </div>

            <button 
                className="w-48 h-48 rounded-full flex flex-col items-center justify-center animate-pulse"
                style={{ backgroundColor: PALETTE.accent, boxShadow: PALETTE.button_shadow }}
                onClick={() => alert('SOS Signal Sent! Authorities have been notified of your location.')}
            >
                <SOSIcon className="w-16 h-16" style={{ color: PALETTE.background }}/>
                <span className="text-3xl font-bold mt-2" style={{ color: PALETTE.background }}>SOS</span>
            </button>

            <div className="grid grid-cols-2 gap-4 w-full">
                {/* Correcting the onClick handler to set the page to 'MAP' */}
                <CrisisButton icon={ShelterIcon} text="Find Shelters" onClick={() => setCurrentPage('MAP')} />
                <CrisisButton icon={PhoneIcon} text="Contacts" onClick={() => setCurrentPage('CONTACTS')} />
            </div>
        </div>
    );
};

export default CrisisHomePage;