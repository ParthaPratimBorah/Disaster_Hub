import React from 'react';
import type { Page } from '../types';
import { HomeIcon, DrillsIcon, MapIcon, ProfileIcon, PhoneIcon, ShieldIcon } from '../constants/icons';
import { useAppContext } from '../contexts/AppContext';

const BottomNavBar: React.FC = () => {
    const { currentPage, setCurrentPage, PALETTE, currentMode } = useAppContext();
    
    const preparednessNavItems = [
        { page: 'HOME' as Page, icon: HomeIcon, label: 'Home' },
        { page: 'DRILLS' as Page, icon: DrillsIcon, label: 'Drills' },
        { page: 'MAP' as Page, icon: MapIcon, label: 'Map' },
        { page: 'PROFILE' as Page, icon: ProfileIcon, label: 'Profile' },
    ];
    
    const crisisNavItems = [
        { page: 'CRISIS_HOME' as Page, icon: HomeIcon, label: 'Home' },
        { page: 'CRISIS_MAP' as Page, icon: MapIcon, label: 'Map' },
        { page: 'CONTACTS' as Page, icon: PhoneIcon, label: 'Contacts' },
        { page: 'CRISIS_PROFILE' as Page, icon: ShieldIcon, label: 'Status' },
    ];

    const navItems = currentMode === 'PREPAREDNESS' ? preparednessNavItems : crisisNavItems;

    return (
        <nav className="grid grid-cols-4 gap-2 p-2" style={{ backgroundColor: PALETTE.background, boxShadow: `0 -2px 4px ${PALETTE.shadow_dark}30`}}>
        {navItems.map(({ page, icon: Icon, label }) => (
            <button
            key={label}
            onClick={() => setCurrentPage(page)}
            className="flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200"
            style={{
                backgroundColor: currentPage === page ? PALETTE.accent : 'transparent',
            }}
            >
            <Icon
                className="w-6 h-6 mb-1"
                style={{
                color: currentPage === page ? PALETTE.background : PALETTE.text_secondary,
                }}
            />
            <span
                className="text-xs font-semibold"
                style={{
                color: currentPage === page ? PALETTE.background : PALETTE.text_secondary,
                }}
            >
                {label}
            </span>
            </button>
        ))}
        </nav>
    );
};

export default BottomNavBar;