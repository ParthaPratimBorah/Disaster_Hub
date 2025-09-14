import React from 'react';
import { ArrowLeftIcon } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

interface PageHeaderProps {
    title: string;
    onBack: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack }) => {
    const { PALETTE } = useAppContext();
    return (
        <div className="flex items-center gap-4 mb-6">
            <button onClick={onBack} className="p-2 rounded-full" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
            <ArrowLeftIcon className="w-6 h-6" style={{ color: PALETTE.text_primary }} />
            </button>
            <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>{title}</h1>
        </div>
    );
};

export default PageHeader;
