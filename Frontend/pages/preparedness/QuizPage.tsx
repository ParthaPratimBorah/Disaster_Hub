import React, { useState, useEffect } from 'react';
import { Page } from '../../types';
import { useAppContext } from '../../contexts/AppContext';
import PageHeader from '../../components/common/PageHeader';
import { CheckCircleIcon, XCircleIcon } from '../../constants';

const QuizPage: React.FC = () => {
    const { setCurrentPage, PALETTE, activeQuizQuestions, quizSourcePage } = useAppContext();
    const quizQuestions = activeQuizQuestions || [];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    
    useEffect(() => {
        if (!activeQuizQuestions || activeQuizQuestions.length === 0) {
            setCurrentPage(quizSourcePage || Page.DRILLS);
        }
    }, [activeQuizQuestions, setCurrentPage, quizSourcePage]);

    if (!activeQuizQuestions || activeQuizQuestions.length === 0) {
        return null;
    }

    const quizFinished = currentQuestionIndex >= quizQuestions.length;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    const handleAnswerSelect = (index: number) => {
        if (!showResult) {
            setSelectedAnswer(index);
        }
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;
        
        if(selectedAnswer === currentQuestion.correctAnswerIndex) {
            setScore(prev => prev + 1);
        }
        setShowResult(true);
    };
    
    const handleNext = () => {
        setShowResult(false);
        setSelectedAnswer(null);
        setCurrentQuestionIndex(prev => prev + 1);
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
    };

    const getButtonStyles = (index: number) => {
        if (showResult) {
            if (index === currentQuestion.correctAnswerIndex) {
                return { backgroundColor: '#28a745', color: 'white', boxShadow: PALETTE.button_shadow }; // Correct answer
            }
            if (index === selectedAnswer) {
                return { backgroundColor: '#dc3545', color: 'white', boxShadow: PALETTE.button_shadow }; // Incorrectly selected
            }
        }
        if (selectedAnswer === index) {
            return { backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_inset_shadow }; // Selected
        }
        return { backgroundColor: PALETTE.card, color: PALETTE.text_primary, boxShadow: PALETTE.button_shadow }; // Default
    };
    
    const handleBack = () => {
        setCurrentPage(quizSourcePage);
    };

    if (quizFinished) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <PageHeader title="Quiz Complete!" onBack={handleBack} />
                <div className="p-6 rounded-xl w-full" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                    <h2 className="text-2xl font-bold" style={{ color: PALETTE.text_primary }}>Your Score</h2>
                    <p className="text-5xl font-bold my-4" style={{ color: PALETTE.accent }}>{score} / {quizQuestions.length}</p>
                    <p className="mb-6" style={{ color: PALETTE.text_secondary }}>
                        {score === quizQuestions.length ? "Excellent work! You're a preparedness expert!" : "Good job! Keep learning to improve your score."}
                    </p>
                    <button 
                        onClick={handleRestart}
                        className="w-full py-3 rounded-lg font-semibold"
                        style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <PageHeader title="Knowledge Quiz" onBack={handleBack} />
            <div className="space-y-4">
                {/* Progress Bar */}
                <div className="p-4 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                    <p className="text-sm font-bold text-right mb-1" style={{ color: PALETTE.text_secondary }}>Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_inset_shadow }}>
                        <div className="h-2 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`, backgroundColor: PALETTE.accent }}></div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="p-4 rounded-xl" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                    <h2 className="text-lg font-semibold" style={{ color: PALETTE.text_primary }}>{currentQuestion.question}</h2>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                         <button 
                            key={index} 
                            onClick={() => handleAnswerSelect(index)}
                            className="w-full text-left p-4 rounded-xl font-semibold transition-all duration-200"
                            style={getButtonStyles(index)}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {/* Result and Explanation */}
                {showResult && (
                    <div className="p-4 rounded-xl flex items-start gap-3" style={{ backgroundColor: selectedAnswer === currentQuestion.correctAnswerIndex ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)' }}>
                        {selectedAnswer === currentQuestion.correctAnswerIndex ? 
                            <CheckCircleIcon className="w-8 h-8 flex-shrink-0" style={{ color: '#28a745' }} /> : 
                            <XCircleIcon className="w-8 h-8 flex-shrink-0" style={{ color: '#dc3545' }} />}
                        <div>
                            <p className="font-bold" style={{ color: PALETTE.text_primary }}>
                                {selectedAnswer === currentQuestion.correctAnswerIndex ? 'Correct!' : 'Not Quite'}
                            </p>
                            <p className="text-sm" style={{ color: PALETTE.text_secondary }}>{currentQuestion.explanation}</p>
                        </div>
                    </div>
                )}


                {/* Action Button */}
                <div className="pt-4">
                    {showResult ? (
                         <button 
                            onClick={handleNext}
                            className="w-full py-3 rounded-lg font-semibold"
                            style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                        >
                            Next Question
                        </button>
                    ) : (
                        <button 
                            onClick={handleSubmit}
                            disabled={selectedAnswer === null}
                            className="w-full py-3 rounded-lg font-semibold disabled:opacity-50"
                            style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                        >
                            Submit Answer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizPage;