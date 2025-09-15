import React from 'react';
import { Page } from '../../types';
import QuickAccessButton from '../common/QuickAccessButton';
import { LearnIcon, MegaphoneIcon, BotIcon, KitIcon } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

const QuickAccessButtons: React.FC = () => {
    const { setCurrentPage } = useAppContext();
    return (
        <div className="grid grid-cols-4 gap-3 text-center">
            <QuickAccessButton icon={LearnIcon} label="Learn" onClick={() => setCurrentPage(Page.LEARN)} />
            <QuickAccessButton icon={MegaphoneIcon} label="Report" onClick={() => setCurrentPage(Page.REPORT)} />
            <QuickAccessButton icon={BotIcon} label="AI Chat" onClick={() => setCurrentPage(Page.AI_CHAT)} />
            <QuickAccessButton icon={KitIcon} label="Safety Kit" onClick={() => setCurrentPage(Page.SAFETY_KIT)} />
        </div>
    );
};

export default QuickAccessButtons;