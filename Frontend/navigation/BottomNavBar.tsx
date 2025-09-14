import React from 'react';
import { Page, Mode } from '../types';
import { HomeIcon, DrillsIcon, MapIcon, ProfileIcon, PhoneIcon, ShieldIcon } from '../constants';
import { useAppContext } from '../contexts/AppContext';

const BottomNavBar: React.FC = () => {
    const { currentPage, setCurrentPage, PALETTE, currentMode } = useAppContext();
    
    const preparednessNavItems = [
        { page: Page.HOME, icon: HomeIcon, label: 'Home' },
        { page: Page.DRILLS, icon: DrillsIcon, label: 'Drills' },
        { page: Page.MAP, icon: MapIcon, label: 'Map' },
        { page: Page.PROFILE, icon: ProfileIcon, label: 'Profile' },
    ];
    
    const crisisNavItems = [
        { page: Page.CRISIS_HOME, icon: HomeIcon, label: 'Home' },
        { page: Page.CRISIS_MAP, icon: MapIcon, label: 'Map' },
        { page: Page.CONTACTS, icon: PhoneIcon, label: 'Contacts' },
        { page: Page.CRISIS_PROFILE, icon: ShieldIcon, label: 'Status' },
    ];

    const navItems = currentMode === Mode.PREPAREDNESS ? preparednessNavItems : crisisNavItems;

    let activePage = currentPage;
    if (currentMode === Mode.CRISIS) {
        if (![Page.CRISIS_HOME, Page.CRISIS_MAP, Page.CONTACTS, Page.CRISIS_PROFILE].includes(currentPage)) {
            activePage = Page.CRISIS_HOME;
        }
    } else {
         if (![Page.HOME, Page.DRILLS, Page.MAP, Page.PROFILE].includes(currentPage)) {
            activePage = Page.HOME;
        }
    }

    return (
        <nav className="grid grid-cols-4 gap-2 p-2" style={{ backgroundColor: PALETTE.background, boxShadow: `0 -2px 4px ${PALETTE.shadow_dark}30`}}>
        {navItems.map(({ page, icon: Icon, label }) => (
            <button
            key={label}
            onClick={() => setCurrentPage(page)}
            className="flex flex-col items-center justify-center p-2 rounded-lg transition-colors duration-200"
            style={{
                backgroundColor: activePage === page ? PALETTE.accent : 'transparent',
            }}
            >
            <Icon
                className="w-6 h-6 mb-1"
                style={{
                color: activePage === page ? PALETTE.background : PALETTE.text_secondary,
                }}
            />
            <span
                className="text-xs font-semibold"
                style={{
                color: activePage === page ? PALETTE.background : PALETTE.text_secondary,
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
