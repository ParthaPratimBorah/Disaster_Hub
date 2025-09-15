import React, { useState, useRef, useEffect } from 'react';
import { Page, ChatMessage } from '../../types';
import { useAppContext } from '../../contexts/AppContext';
import PageHeader from '../../components/common/PageHeader';
import { BotIcon, SendIcon } from '../../constants';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const AIChatPage: React.FC = () => {
    const { setCurrentPage, PALETTE } = useAppContext();
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: 'Hello! I am your disaster preparedness assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the bottom of the chat container when messages change
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput || isLoading) return;

        const newUserMessage: ChatMessage = { role: 'user', text: trimmedInput };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `You are an expert assistant for disaster preparedness, focused on helping students and teachers. Keep your answers concise, clear, and easy to understand. User's question: ${trimmedInput}`,
            });
            
            const aiResponse = response.text;
            const newAiMessage: ChatMessage = { role: 'model', text: aiResponse };
            setMessages(prev => [...prev, newAiMessage]);

        } catch (error) {
            console.error("Gemini API error:", error);
            const errorMessage: ChatMessage = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col">
            <PageHeader title="AI Assistant" onBack={() => setCurrentPage(Page.HOME)} />

            {/* Chat Messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 pr-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && (
                            <div className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                                <BotIcon className="w-5 h-5" style={{ color: PALETTE.accent }} />
                            </div>
                        )}
                        <div 
                            className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                                msg.role === 'user' 
                                ? 'bg-blue-500 text-white rounded-br-none' 
                                : 'bg-gray-200 text-gray-800 rounded-bl-none'
                            }`}
                             style={{
                                backgroundColor: msg.role === 'user' ? PALETTE.accent : PALETTE.card,
                                color: msg.role === 'user' ? PALETTE.background : PALETTE.text_primary,
                            }}
                        >
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-end gap-2 justify-start">
                        <div className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center" style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}>
                            <BotIcon className="w-5 h-5" style={{ color: PALETTE.accent }} />
                        </div>
                        <div className="max-w-xs md:max-w-md p-3 rounded-2xl rounded-bl-none" style={{ backgroundColor: PALETTE.card }}>
                            <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Message Input Form */}
            <form 
                onSubmit={handleSendMessage}
                className="mt-4 flex items-center gap-2 p-2 rounded-xl"
                style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about safety tips..."
                    className="w-full bg-transparent outline-none p-2"
                    style={{ color: PALETTE.text_primary }}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-3 rounded-full disabled:opacity-50 transition-colors duration-200"
                    style={{ backgroundColor: PALETTE.accent }}
                    aria-label="Send message"
                >
                    <SendIcon className="w-5 h-5" style={{ color: PALETTE.background }} />
                </button>
            </form>
        </div>
    );
};

export default AIChatPage;