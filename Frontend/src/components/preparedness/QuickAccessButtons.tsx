import React from 'react';
import QuickAccessButton from '../common/QuickAccessButton';
import { LearnIcon, DrillsIcon, MapIcon, KitIcon } from '../../constants/icons';
import { useAppContext } from '../../contexts/AppContext';

const QuickAccessButtons: React.FC = () => {
    const { setCurrentPage } = useAppContext();
    return (
        <div className="grid grid-cols-4 gap-3 text-center">
            <QuickAccessButton icon={LearnIcon} label="Learn" onClick={() => setCurrentPage('LEARN')} />
            <QuickAccessButton icon={DrillsIcon} label="Drills" onClick={() => setCurrentPage('DRILLS')} />
            <QuickAccessButton icon={MapIcon} label="Map" onClick={() => setCurrentPage('MAP')} />
            <QuickAccessButton icon={KitIcon} label="Safety Kit" onClick={() => setCurrentPage('SAFETY_KIT')} />
        </div>
    );
};

export default QuickAccessButtons;