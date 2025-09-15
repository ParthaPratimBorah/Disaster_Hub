import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import { Page, EducationModule } from '../../types';
import { educationModules, ChevronRightIcon } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

const LearnPage: React.FC = () => {
    const { setCurrentPage, PALETTE, setSelectedModule } = useAppContext();

    const handleModuleClick = (module: EducationModule) => {
        setSelectedModule(module);
        setCurrentPage(Page.MODULE_DETAIL);
    };

    return (
        <div>
            <PageHeader title="Education Modules" onBack={() => setCurrentPage(Page.HOME)} />
            <div className="space-y-4">
            {educationModules.map(module => (
                <button 
                    key={module.id}
                    onClick={() => handleModuleClick(module)}
                    className="w-full flex items-center gap-4 p-3 rounded-xl text-left" 
                    style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}
                >
                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden" style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_inset_shadow }}>
                        <img src={module.thumbnail} alt={module.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold" style={{ color: PALETTE.text_primary }}>{module.title}</p>
                        <p className="text-sm" style={{ color: PALETTE.text_secondary }}>{module.disasterType}</p>
                    </div>
                    <ChevronRightIcon className="w-6 h-6 ml-auto" style={{ color: PALETTE.accent }} />
                </button>
            ))}
            </div>
        </div>
    );
};

export default LearnPage;