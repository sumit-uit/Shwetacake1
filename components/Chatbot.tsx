
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'bot', text: "Hello! How can I help you with your order or any questions about Soni Bake Art today?" }
    ]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async () => {
        if (!userInput.trim()) return;

        const userMessage: Message = { sender: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            if (!chatRef.current) {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const systemInstruction = "You are a friendly, cheerful, and helpful AI assistant for Soni Bake Art, a custom bakery. Your goal is to answer customer questions about products, ordering, and customization. You should be warm and inviting. Use the website's content as your primary source of information. You can discuss cake flavors, cupcake options, custom designs, and pricing details mentioned on the site. Guide users to the contact section to place an order, as you cannot take orders yourself. Keep your answers concise and easy to read.";
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: { systemInstruction },
                });
            }
            
            setMessages(prev => [...prev, { sender: 'bot', text: '' }]);
            
            const stream = await chatRef.current.sendMessageStream({ message: userInput });
            
            for await (const chunk of stream) {
                const chunkText = chunk.text;
                setMessages(prev => {
                    const lastMessage = prev[prev.length - 1];
                    const updatedLastMessage = { ...lastMessage, text: lastMessage.text + chunkText };
                    return [...prev.slice(0, -1), updatedLastMessage];
                });
            }
        } catch (error) {
            console.error('Gemini API error:', error);
            setMessages(prev => [...prev, { sender: 'bot', text: "I'm having a little trouble connecting right now. Please try again in a moment." }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 bg-[#d4af37] text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300 z-50"
                aria-label="Toggle chat"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                )}
            </button>

            <div className={`fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <header className="bg-[#3a2e25] text-white p-4 rounded-t-lg">
                    <h3 className="font-bold text-lg text-center" style={{ fontFamily: "'Playfair Display', serif" }}>Soni's AI Assistant</h3>
                </header>
                <div className="flex-1 p-4 overflow-y-auto bg-[#FEFBF6]">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`py-2 px-4 rounded-2xl max-w-xs lg:max-w-md ${msg.sender === 'user' ? 'bg-[#d4af37] text-white rounded-br-none' : 'bg-gray-200 text-[#3a2e25] rounded-bl-none'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && <div className="flex justify-start"><div className="py-2 px-4 rounded-2xl bg-gray-200 text-[#3a2e25] rounded-bl-none">Typing...</div></div>}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t bg-white rounded-b-lg">
                    <div className="flex">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                            placeholder="Ask a question..."
                            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} disabled={isLoading} className="bg-[#854d27] text-white px-4 rounded-r-md hover:bg-[#3a2e25] transition-colors disabled:bg-gray-400">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
