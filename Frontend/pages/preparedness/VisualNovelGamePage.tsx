import React, { useState, useEffect } from 'react';
import { Page } from '../../types';
import { useAppContext } from '../../contexts/AppContext';
import PageHeader from '../../components/common/PageHeader';

const VisualNovelGamePage: React.FC = () => {
    const { 
        setCurrentPage, 
        PALETTE, 
        activeVisualNovel, 
        setActiveVisualNovel, 
        setSelectedModule
    } = useAppContext();

    const [currentSceneId, setCurrentSceneId] = useState<number>(0);

    useEffect(() => {
        if (!activeVisualNovel || activeVisualNovel.length === 0) {
            setCurrentPage(Page.MODULE_DETAIL);
        }
    }, [activeVisualNovel, setCurrentPage]);

    if (!activeVisualNovel || activeVisualNovel.length === 0) {
        return null;
    }

    const currentScene = activeVisualNovel.find(scene => scene.id === currentSceneId);

    if (!currentScene) {
        // Fallback if a scene ID is invalid
        console.error("Scene not found!", currentSceneId);
        setCurrentPage(Page.MODULE_DETAIL);
        return null;
    }

    const handleBack = () => {
        setCurrentPage(Page.MODULE_DETAIL);
        // Reset game state when leaving
        setActiveVisualNovel(null);
    };
    
    const handleChoice = (nextSceneId: number) => {
        setCurrentSceneId(nextSceneId);
    };
    
    const handleNext = () => {
        if (currentScene.nextSceneId !== undefined) {
            setCurrentSceneId(currentScene.nextSceneId);
        }
    };
    
    const handleRestart = () => {
        setCurrentSceneId(0);
    }

    return (
        <div className="h-full flex flex-col">
            <PageHeader title="Disaster Simulation" onBack={handleBack} />
            <div 
                className="flex-1 rounded-xl flex flex-col justify-end p-4 text-white relative overflow-hidden" 
                style={{ 
                    backgroundColor: PALETTE.card, 
                    boxShadow: PALETTE.button_shadow,
                    backgroundImage: `url(${currentScene.background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                <div className="relative z-10 space-y-4">
                    {/* Dialogue Box */}
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                        {currentScene.character && <p className="font-bold text-lg" style={{ color: PALETTE.accent }}>{currentScene.character}</p>}
                        <p className="text-white">{currentScene.text}</p>
                    </div>

                    {/* Choices/Actions */}
                    <div className="space-y-3">
                        {currentScene.isEndScene ? (
                            <>
                                <p className="p-4 rounded-lg font-semibold text-center" style={{ backgroundColor: PALETTE.accent, color: PALETTE.background }}>
                                    {currentScene.endMessage}
                                </p>
                                <button 
                                    onClick={handleRestart}
                                    className="w-full p-3 rounded-lg font-semibold"
                                    style={{ backgroundColor: PALETTE.card, color: PALETTE.text_primary, boxShadow: PALETTE.button_shadow }}
                                >
                                    Try Again
                                </button>
                                <button 
                                    onClick={handleBack}
                                    className="w-full p-3 rounded-lg font-semibold"
                                    style={{ backgroundColor: 'transparent', border: `2px solid ${PALETTE.card}`, color: PALETTE.card }}
                                >
                                    Back to Module
                                </button>
                            </>
                        ) : currentScene.choices ? (
                            currentScene.choices.map((choice, index) => (
                                <button 
                                    key={index} 
                                    onClick={() => handleChoice(choice.nextSceneId)}
                                    className="w-full text-left p-3 rounded-lg font-semibold transition-colors duration-200"
                                    style={{ backgroundColor: PALETTE.card, color: PALETTE.text_primary, boxShadow: PALETTE.button_shadow }}
                                >
                                    {choice.text}
                                </button>
                            ))
                        ) : (
                             <button 
                                onClick={handleNext}
                                className="w-full p-3 rounded-lg font-semibold"
                                style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisualNovelGamePage;