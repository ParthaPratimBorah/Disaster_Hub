import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import { educationModules, ChevronRightIcon } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

const LearnPage: React.FC = () => {
    const { setCurrentPage, PALETTE } = useAppContext();

    const handleModuleClick = (moduleTitle: string) => {
        // You can add logic here to navigate to a specific module page
        // For now, we'll just log the title.
        console.log(`Clicked on module: ${moduleTitle}`);
    };

    return (
        <div>
            <PageHeader title="Education Modules" onBack={() => setCurrentPage('HOME')} />
            <div className="space-y-4">
                {educationModules.map(module => (
                    <button
                        key={module.title}
                        className="flex items-center gap-4 p-3 rounded-xl w-full text-left"
                        onClick={() => handleModuleClick(module.title)}
                        style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}
                    >
                        <div className="w-20 h-20 rounded-lg flex items-center justify-center" style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_inset_shadow }}>
                            <module.thumbnail className="w-16 h-16" />
                        </div>
                        <div>
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