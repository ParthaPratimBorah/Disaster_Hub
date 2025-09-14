import React from 'react';
import SettingsListItem from '../../components/common/SettingsListItem';
import { user, badges, history, LanguageIcon, BellIcon, LogoutIcon } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

const ProfilePage: React.FC = () => {
    const { PALETTE, logout } = useAppContext();
    return (
        <div className="space-y-6">
             <div className="flex flex-col items-center text-center p-4 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mb-4" style={{ boxShadow: PALETTE.button_shadow }}/>
                <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>{user.name}</h1>
                <p className="text-sm" style={{ color: PALETTE.text_secondary }}>{user.class} | {user.school}</p>
             </div>

            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <h3 className="text-lg font-bold" style={{ color: PALETTE.text_primary }}>Preparedness Score</h3>
                <p className="text-4xl font-bold my-2" style={{ color: PALETTE.accent }}>{user.preparednessScore} <span className="text-lg">/ 100</span></p>
                <p className="text-sm font-semibold" style={{ color: PALETTE.text_secondary }}>🌟 Disaster Ready: Level 3</p>
            </div>
            
            <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: PALETTE.text_primary }}>Badges Collection</h3>
                <div className="grid grid-cols-3 gap-4">
                    {badges.map(badge => (
                        <div key={badge.name} className="flex flex-col items-center p-3 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                             <span className="text-3xl">{badge.icon}</span>
                            <p className="text-xs font-semibold text-center mt-1" style={{ color: PALETTE.text_secondary }}>{badge.name}</p>
                        </div>
                    ))}
                </div>
            </div>

             <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: PALETTE.text_primary }}>Participation History</h3>
                <div className="space-y-3">
                    {history.map(item => (
                        <div key={item.id} className="flex justify-between items-center p-3 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                            <div>
                                <p className="font-semibold text-sm" style={{ color: PALETTE.text_primary }}>{item.title}</p>
                                <p className="text-xs" style={{ color: PALETTE.text_secondary }}>{item.type}</p>
                            </div>
                            <p className="text-xs" style={{ color: PALETTE.text_secondary }}>{item.date}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-2 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <SettingsListItem icon={LanguageIcon} text="Language" />
                <SettingsListItem icon={BellIcon} text="Notifications" />
                <SettingsListItem icon={LogoutIcon} text="Logout" action={logout}/>
            </div>
        </div>
    );
};

export default ProfilePage;
