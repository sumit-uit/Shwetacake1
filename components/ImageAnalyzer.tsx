
import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

type Tab = 'analyze' | 'generate';

const ImageAnalyzer: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('analyze');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [prompt, setPrompt] = useState<string>('Can you make a cake like this? What flavors would you suggest?');
    const [analysisResult, setAnalysisResult] = useState<string>('');
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const clearState = (clearImage: boolean = false) => {
        if (clearImage) {
            setImage(null);
            setImagePreview(null);
        }
        setAnalysisResult('');
        setGeneratedImages([]);
        setError('');
    };
    
    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
        if(tab === 'generate') {
            setPrompt("A magical mermaid theme cake for a girl's birthday, with pastel colors and edible glitter.");
        } else {
            setPrompt("Can you make a cake like this? What flavors would you suggest?");
        }
        clearState(true);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
            clearState();
        }
    };

    const fileToGenerativePart = async (file: File) => {
        const base64EncodedDataPromise = new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
            reader.readAsDataURL(file);
        });
        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
        };
    };

    const runAnalysis = async () => {
        if (!image || !prompt) {
            setError('Please upload an image and enter a question.');
            return;
        }
        setLoading(true);
        clearState();
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const imagePart = await fileToGenerativePart(image);
            const systemInstruction = "You are an expert baker at Soni Bake Art. Analyze the user's image and provide creative, helpful, and inspiring ideas based on their prompt. Be positive and encouraging about making their dream cake a reality.";
            
            // FIX: Corrected `contents` structure to be an array of Content objects to resolve the 500 error.
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [{ parts: [imagePart, { text: prompt }] }],
                config: { systemInstruction },
            });

            setAnalysisResult(response.text);
        } catch (e) {
            console.error(e);
            setError('An error occurred while analyzing the image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const runImageGeneration = async (variation: boolean = false) => {
        if (variation && !image) {
            setError('Please upload an image to generate variations.');
            return;
        }
        if (!variation && !prompt) {
            setError('Please enter a description for the cake you want.');
            return;
        }

        setLoading(true);
        clearState();

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            
            const parts = [];
            if (variation && image) {
                const imagePart = await fileToGenerativePart(image);
                parts.push(imagePart);
                parts.push({ text: "Generate 3 variations of this cake with different colors and slightly different designs." });
            } else {
                parts.push({ text: `Generate 3 high-quality, photorealistic images of a custom cake based on this description: ${prompt}` });
            }
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: parts },
                config: { responseModalities: [Modality.IMAGE] },
            });
            
            const images: string[] = [];
            for (const part of response.candidates?.[0]?.content?.parts ?? []) {
                if (part.inlineData) {
                    const base64ImageBytes = part.inlineData.data;
                    const imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                    images.push(imageUrl);
                }
            }
            if (images.length === 0) {
                 setError("Sorry, I couldn't generate any images this time. Please try a different description.");
            }
            setGeneratedImages(images);

        } catch (e) {
            console.error(e);
            setError('An error occurred during image generation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const onDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                 setImage(file);
                setImagePreview(URL.createObjectURL(file));
                clearState();
            }
        }
    }, []);

    const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <section id="analyzer" className="py-20 lg:py-32 scroll-mt-20">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#3a2e25] mb-4">Cake Inspiration Studio</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Analyze a photo for ideas, or describe your dream cake and let our AI generate visual concepts for you!
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
                    {/* Tabs */}
                    <div className="flex border-b mb-6">
                        <button onClick={() => handleTabChange('analyze')} className={`px-6 py-3 text-lg font-semibold border-b-4 ${activeTab === 'analyze' ? 'border-[#d4af37] text-[#854d27]' : 'border-transparent text-gray-500 hover:text-[#854d27]'}`}>
                            Analyze Existing Cake
                        </button>
                        <button onClick={() => handleTabChange('generate')} className={`px-6 py-3 text-lg font-semibold border-b-4 ${activeTab === 'generate' ? 'border-[#d4af37] text-[#854d27]' : 'border-transparent text-gray-500 hover:text-[#854d27]'}`}>
                            Generate New Ideas
                        </button>
                    </div>

                    {activeTab === 'analyze' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            <div>
                                <label onDrop={onDrop} onDragOver={onDragOver} htmlFor="image-upload" className="cursor-pointer block w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-center text-gray-500 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg p-2" />
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                            <span className="mt-2 text-center">Click to upload or drag & drop</span>
                                        </>
                                    )}
                                </label>
                                <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </div>
                            <div className="flex flex-col space-y-4">
                                <div>
                                    <label htmlFor="prompt-analyze" className="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
                                    <textarea id="prompt-analyze" rows={3} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#d4af37] focus:border-[#d4af37] transition" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                                </div>
                                <button onClick={runAnalysis} disabled={loading || !image} className="w-full bg-[#854d27] text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-[#3a2e25] transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    Get AI Description
                                </button>
                                <button onClick={() => runImageGeneration(true)} disabled={loading || !image} className="w-full bg-[#d4af37] text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-[#854d27] transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    Generate Visual Variations
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'generate' && (
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label htmlFor="prompt-generate" className="block text-lg font-medium text-gray-700 mb-2">Describe Your Dream Cake</label>
                                <textarea id="prompt-generate" rows={4} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#d4af37] focus:border-[#d4af37] transition" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g., A magical mermaid theme cake for a girl's birthday..." />
                            </div>
                            <button onClick={() => runImageGeneration(false)} disabled={loading} className="w-full bg-[#d4af37] text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-[#854d27] transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100">
                                {loading ? 'Generating...' : 'Generate Image Ideas'}
                            </button>
                        </div>
                    )}
                    
                    <div className="mt-8">
                        {loading && (
                            <div className="flex justify-center items-center flex-col p-6">
                                <svg className="animate-spin h-10 w-10 text-[#d4af37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <p className="mt-4 text-lg font-semibold text-[#854d27]">AI is working its magic...</p>
                            </div>
                        )}
                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                        {analysisResult && (
                            <div className="p-6 bg-gray-50 rounded-lg border">
                                <h3 className="text-2xl font-semibold text-[#3a2e25] mb-4">Our Suggestions</h3>
                                <p className="text-gray-700 whitespace-pre-wrap">{analysisResult}</p>
                            </div>
                        )}
                        {generatedImages.length > 0 && (
                             <div className="animate-fade-in">
                                <h3 className="text-2xl font-semibold text-[#3a2e25] mb-4 text-center">Here are some ideas!</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {generatedImages.map((src, index) => (
                                        <img key={index} src={src} alt={`Generated cake idea ${index + 1}`} className="w-full h-auto object-cover rounded-lg shadow-md" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImageAnalyzer;
