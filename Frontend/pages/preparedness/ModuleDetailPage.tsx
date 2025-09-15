import React, { useEffect } from 'react';
import { Page } from '../../types';
import { useAppContext } from '../../contexts/AppContext';
import PageHeader from '../../components/common/PageHeader';
import { QuizIcon, GameControllerIcon } from '../../constants';

const ModuleDetailPage: React.FC = () => {
    const { 
        selectedModule, 
        setSelectedModule, 
        setCurrentPage, 
        PALETTE,
        setActiveQuizQuestions,
        setQuizSourcePage,
        setActiveVisualNovel,
    } = useAppContext();

    useEffect(() => {
        // If no module is selected (e.g., on page refresh), navigate back to the learn page
        if (!selectedModule) {
            setCurrentPage(Page.LEARN);
        }
    }, [selectedModule, setCurrentPage]);

    if (!selectedModule) {
        return null; // Render nothing while redirecting
    }
    
    const handleBack = () => {
        setCurrentPage(Page.LEARN);
        setSelectedModule(null); // Clear selected module when going back
    };

    const handleTakeQuiz = () => {
        if (selectedModule.quiz.length > 0) {
            setActiveQuizQuestions(selectedModule.quiz);
            setQuizSourcePage(Page.MODULE_DETAIL);
            setCurrentPage(Page.QUIZ);
        } else {
            alert("No quiz available for this module yet.");
        }
    };

    const handlePlayGame = () => {
        if (selectedModule.visualNovelGame.length > 0) {
            setActiveVisualNovel(selectedModule.visualNovelGame);
            setCurrentPage(Page.VISUAL_NOVEL_GAME);
        } else {
            alert("No game available for this module yet.");
        }
    };
    
    const { title, disasterType, image, content } = selectedModule;

    return (
        <div className="space-y-4">
            <PageHeader title="Learning Module" onBack={handleBack} />

            <div className="p-4 rounded-xl space-y-4" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg mb-2" />
                
                <h1 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>
                    {title}
                </h1>
                <p className="text-sm font-semibold -mt-3" style={{ color: PALETTE.accent }}>
                    {disasterType}
                </p>

                <div className="border-t" style={{ borderColor: `${PALETTE.accent}40` }} />

                <div className="space-y-4">
                    {content.map((item, index) => (
                        <div key={index}>
                            <h3 className="font-bold text-lg mb-1" style={{ color: PALETTE.text_primary }}>{item.heading}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: PALETTE.text_secondary }}>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="p-4 rounded-xl space-y-3" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                <h2 className="text-lg font-bold text-center" style={{ color: PALETTE.text_primary }}>Test Your Knowledge</h2>
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={handleTakeQuiz}
                        className="flex flex-col items-center justify-center p-3 rounded-xl"
                        style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                    >
                        <QuizIcon className="w-8 h-8 mb-2" style={{ color: PALETTE.accent }}/>
                        <span className="font-semibold" style={{ color: PALETTE.text_primary}}>Take Quiz</span>
                    </button>
                    <button 
                        onClick={handlePlayGame}
                        disabled={selectedModule.visualNovelGame.length === 0}
                        className="flex flex-col items-center justify-center p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                    >
                        <GameControllerIcon className="w-8 h-8 mb-2" style={{ color: PALETTE.accent }}/>
                        <span className="font-semibold" style={{ color: PALETTE.text_primary}}>Play Game</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModuleDetailPage;