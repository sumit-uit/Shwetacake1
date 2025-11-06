import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const PriceEstimator: React.FC = () => {
    const [servings, setServings] = useState('10-15 (6" round)');
    const [flavor, setFlavor] = useState('Vanilla');
    const [filling, setFilling] = useState('Vanilla Buttercream');
    const [complexity, setComplexity] = useState('Simple');
    const [estimate, setEstimate] = useState('');
    const [explanation, setExplanation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getEstimate = async () => {
        setLoading(true);
        setError('');
        setEstimate('');
        setExplanation('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

            const systemInstruction = `You are the AI price estimator for Soni Bake Art, a premium home bakery in Waterloo/Ottawa, Canada.
Your task is to provide a realistic price estimate range exclusively in Canadian Dollars (CAD). Do not mention any other currencies like EUR or USD, or phrases like "local currency equivalent".
The estimate should reflect Soni Bake Art's high-quality standards.
Base prices start around $7-$9 CAD per serving for simple designs. Prices increase with complexity, premium flavors, and fillings.
- 'Simple' designs have basic buttercream.
- 'Detailed' designs involve intricate piping, multiple colors, or small fondant details.
- 'Complex' designs involve 3D sculptures, hand-painting, or elaborate themes and command a significant premium.
- Premium flavors like Rasmalai or Gulab Jamun cost more than standard Vanilla or Chocolate.
- Premium fillings also add to the cost.

Your response MUST follow this format strictly:
1.  First line: The price range ONLY. Example: "$150 - $180 CAD"
2.  All subsequent lines: A friendly, brief explanation of the pricing factors from the perspective of Soni Bake Art. Do not use generic phrases like "in a custom bakery setting".

Do not add any text before the price range on the first line.`;

            const userPrompt = `Please provide a price estimate for a custom cake with the following specifications:
- Servings: ${servings}
- Flavor: ${flavor}
- Filling: ${filling}
- Design Complexity: ${complexity}`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userPrompt,
                config: { systemInstruction },
            });

            const responseText = response.text;
            const lines = responseText.split('\n');
            const priceEstimate = lines[0];
            const priceExplanation = lines.slice(1).join('\n');

            setEstimate(priceEstimate);
            setExplanation(priceExplanation);

        } catch (e) {
            console.error(e);
            setError('Sorry, I couldn\'t generate an estimate right now. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="estimator" className="py-20 lg:py-32 scroll-mt-20">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#3a2e25] mb-4">Cake Price Estimator</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Get an instant idea of the cost for your dream custom cake. Final price depends on the final design.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Form Column */}
                    <div className="space-y-6 flex flex-col">
                        <div>
                            <label htmlFor="servings" className="block text-lg font-medium text-[#3a2e25] mb-2">How many servings?</label>
                            <select id="servings" value={servings} onChange={e => setServings(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#d4af37] focus:border-[#d4af37]">
                                <option>10-15 (6" round)</option>
                                <option>20-25 (8" round)</option>
                                <option>30-40 (2-tier, e.g., 6"+8")</option>
                                <option>50-60 (2-tier, e.g., 8"+10")</option>
                                <option>70+ (3-tier)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="flavor" className="block text-lg font-medium text-[#3a2e25] mb-2">Choose a Flavor</label>
                             <select id="flavor" value={flavor} onChange={e => setFlavor(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#d4af37] focus:border-[#d4af37]">
                                <option>Vanilla</option>
                                <option>Chocolate</option>
                                <option>Marble</option>
                                <option>Caramel</option>
                                <option>Butterscotch</option>
                                <option>Rasmalai (Premium)</option>
                                <option>Gulab Jamun (Premium)</option>
                                <option>Paan (Premium)</option>
                                <option>Mango (Premium)</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="filling" className="block text-lg font-medium text-[#3a2e25] mb-2">Choose a Filling</label>
                            <select id="filling" value={filling} onChange={e => setFilling(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-[#d4af37] focus:border-[#d4af37]">
                                <option>Vanilla Buttercream</option>
                                <option>Chocolate Fudge</option>
                                <option>Salted Caramel</option>
                                <option>Cream Cheese</option>
                                <option>Fruit Compote (Premium)</option>
                                <option>Pistachio Cream (Premium)</option>
                            </select>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-[#3a2e25] mb-2">Design Complexity</h3>
                            <div className="space-y-2">
                                {['Simple', 'Detailed', 'Complex'].map(level => (
                                    <label key={level} className="flex items-center p-3 border rounded-md has-[:checked]:bg-[#fefbf6] has-[:checked]:border-[#d4af37] transition-colors cursor-pointer">
                                        <input type="radio" name="complexity" value={level} checked={complexity === level} onChange={e => setComplexity(e.target.value)} className="h-4 w-4 text-[#854d27] focus:ring-[#d4af37]"/>
                                        <span className="ml-3 text-gray-700">{level}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                         <button
                            onClick={getEstimate}
                            disabled={loading}
                            className="w-full mt-auto pt-3 pb-3 bg-[#d4af37] text-white font-bold px-6 rounded-full text-lg hover:bg-[#854d27] transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            {loading ? 'Calculating...' : 'Get My Estimate'}
                        </button>
                    </div>

                    {/* Result Column */}
                    <div className="flex flex-col items-center justify-center bg-[#fefbf6] p-6 rounded-lg text-center border border-[#d4af37]/50 min-h-[400px]">
                        {loading ? (
                            <div className="flex flex-col items-center">
                                <svg className="animate-spin h-10 w-10 text-[#d4af37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <p className="mt-4 text-lg font-semibold text-[#854d27]">Calculating your estimate...</p>
                            </div>
                        ) : error ? (
                            <p className="text-red-500 px-4">{error}</p>
                        ) : estimate ? (
                            <div className="w-full animate-fade-in">
                                <h3 className="text-2xl font-bold text-[#854d27]" style={{ fontFamily: "'Playfair Display', serif" }}>
                                  Your Soni Bake Art Estimate
                                </h3>
                                <p className="text-4xl lg:text-5xl font-bold text-[#3a2e25] my-3">{estimate}</p>
                                <div className="text-left text-sm text-gray-600 mt-4 whitespace-pre-wrap border-t pt-4">
                                    {explanation}
                                </div>
                                <p className="text-xs text-gray-500 mt-6 italic">*This is an estimate. The final price will be based on the agreed-upon design.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <h3 className="text-2xl font-semibold text-[#3a2e25] mb-2">Your Custom Quote</h3>
                                <p className="text-gray-600">Your personalized cake estimate will appear here!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PriceEstimator;