import React from 'react';
import { emergencyContacts, PhoneIcon, CRISIS_PALETTE } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

const EmergencyContactsPage: React.FC = () => {
    const { PALETTE } = useAppContext();
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>Emergency Contacts</h1>
            <div className="space-y-3">
                {emergencyContacts.map(contact => (
                    <div key={contact.name} className="flex items-center gap-4 p-3 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                        <contact.icon className="w-8 h-8" style={{ color: PALETTE.text_primary }} />
                        <div className="flex-1">
                            <p className="font-bold" style={{ color: PALETTE.text_primary }}>{contact.name}</p>
                            <p className="text-sm" style={{ color: PALETTE.text_secondary }}>{contact.number}</p>
                        </div>
                        <button 
                            className="p-3 rounded-full"
                            style={{ backgroundColor: PALETTE.accent, boxShadow: PALETTE.button_shadow}}
                            onClick={() => alert(`Calling ${contact.name}...`)}
                        >
                            <PhoneIcon className="w-6 h-6" style={{ color: CRISIS_PALETTE.background }}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmergencyContactsPage;
