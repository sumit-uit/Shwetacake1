import React, { useState, useEffect, useMemo } from 'react';

interface Ingredient {
    id: number;
    name: string;
    cost: string;
    unitSize: string;
    amountUsed: string;
}

const BakerCalculator: React.FC = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([
        { id: 1, name: 'Flour', cost: '5.00', unitSize: '1000', amountUsed: '500' },
        { id: 2, name: 'Sugar', cost: '4.00', unitSize: '1000', amountUsed: '300' },
    ]);
    const [hourlyRate, setHourlyRate] = useState('25');
    const [timeSpent, setTimeSpent] = useState('3');
    const [packagingCost, setPackagingCost] = useState('5');
    const [otherDirectCosts, setOtherDirectCosts] = useState('2');
    const [overheadPercentage, setOverheadPercentage] = useState('15');
    const [profitMargin, setProfitMargin] = useState('50');
    const [servings, setServings] = useState('15');

    const handleIngredientChange = (id: number, field: keyof Ingredient, value: string) => {
        setIngredients(prev => prev.map(ing => ing.id === id ? { ...ing, [field]: value } : ing));
    };

    const addIngredient = () => {
        setIngredients(prev => [...prev, { id: Date.now(), name: '', cost: '', unitSize: '', amountUsed: '' }]);
    };

    const removeIngredient = (id: number) => {
        setIngredients(prev => prev.filter(ing => ing.id !== id));
    };

    const calculations = useMemo(() => {
        const n = (val: string) => parseFloat(val) || 0;

        const totalIngredientCost = ingredients.reduce((total, ing) => {
            const cost = n(ing.cost);
            const unitSize = n(ing.unitSize);
            const amountUsed = n(ing.amountUsed);
            if (unitSize === 0) return total;
            return total + (cost / unitSize) * amountUsed;
        }, 0);

        const totalLaborCost = n(hourlyRate) * n(timeSpent);
        const totalDirectCosts = n(packagingCost) + n(otherDirectCosts);
        
        const subtotal = totalIngredientCost + totalLaborCost + totalDirectCosts;
        const totalOverheadCost = subtotal * (n(overheadPercentage) / 100);
        const totalCostToMake = subtotal + totalOverheadCost;
        const profitAmount = totalCostToMake * (n(profitMargin) / 100);
        const suggestedSellingPrice = totalCostToMake + profitAmount;
        const pricePerServing = n(servings) > 0 ? suggestedSellingPrice / n(servings) : 0;

        return {
            totalIngredientCost,
            totalLaborCost,
            totalDirectCosts,
            totalOverheadCost,
            totalCostToMake,
            profitAmount,
            suggestedSellingPrice,
            pricePerServing
        };
    }, [ingredients, hourlyRate, timeSpent, packagingCost, otherDirectCosts, overheadPercentage, profitMargin, servings]);

    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-CA', { style: 'currency', currency: 'CAD' });
    };

    return (
        <section id="baker-calculator" className="py-20 lg:py-32 bg-white scroll-mt-20">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#3a2e25] mb-4">Cake Pricing Calculator for Bakers</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        A tool to help fellow home bakers accurately price their creations. Calculate costs, add overhead, and set your profit margin.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Form Column */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Ingredients */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold text-[#854d27] mb-4 border-b pb-2">Ingredients</h3>
                            {ingredients.map((ing, index) => (
                                <div key={ing.id} className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-3 items-end">
                                    <div className="sm:col-span-2">
                                        {index === 0 && <label className="text-sm font-medium text-gray-500">Ingredient</label>}
                                        <input type="text" placeholder="e.g., Flour" value={ing.name} onChange={e => handleIngredientChange(ing.id, 'name', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                                    </div>
                                    <div>
                                        {index === 0 && <label className="text-sm font-medium text-gray-500">Cost/Unit</label>}
                                        <input type="number" placeholder="5.00" value={ing.cost} onChange={e => handleIngredientChange(ing.id, 'cost', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                                    </div>
                                    <div>
                                        {index === 0 && <label className="text-sm font-medium text-gray-500">Size (g)</label>}
                                        <input type="number" placeholder="1000" value={ing.unitSize} onChange={e => handleIngredientChange(ing.id, 'unitSize', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div>
                                            {index === 0 && <label className="text-sm font-medium text-gray-500">Used (g)</label>}
                                            <input type="number" placeholder="500" value={ing.amountUsed} onChange={e => handleIngredientChange(ing.id, 'amountUsed', e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                                        </div>
                                        <button onClick={() => removeIngredient(ing.id)} className="text-red-500 hover:text-red-700 h-10 w-10 flex-shrink-0">&times;</button>
                                    </div>
                                </div>
                            ))}
                            <button onClick={addIngredient} className="mt-4 text-sm font-bold text-[#854d27] hover:text-[#d4af37]">+ Add Ingredient</button>
                        </div>

                        {/* Labor, Expenses, Profit */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                                <h3 className="text-2xl font-semibold text-[#854d27] mb-2">Labor</h3>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Your Hourly Rate ($)</label>
                                    <input type="number" value={hourlyRate} onChange={e => setHourlyRate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Time Spent (hours)</label>
                                    <input type="number" value={timeSpent} onChange={e => setTimeSpent(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                            </div>
                             <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                                <h3 className="text-2xl font-semibold text-[#854d27] mb-2">Expenses & Profit</h3>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Packaging & Other Costs ($)</label>
                                    <div className="flex gap-2">
                                        <input type="number" value={packagingCost} onChange={e => setPackagingCost(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Packaging"/>
                                        <input type="number" value={otherDirectCosts} onChange={e => setOtherDirectCosts(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" placeholder="Other"/>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Overhead (%)</label>
                                    <input type="number" value={overheadPercentage} onChange={e => setOverheadPercentage(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                                 <div>
                                    <label className="text-sm font-medium text-gray-500">Desired Profit Margin (%)</label>
                                    <input type="number" value={profitMargin} onChange={e => setProfitMargin(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Result Column */}
                    <div className="lg:col-span-2">
                         <div className="bg-[#fefbf6] p-6 rounded-lg border-2 border-[#d4af37]/50 shadow-xl sticky top-28">
                            <h3 className="text-3xl font-bold text-center text-[#3a2e25] mb-4">Pricing Summary</h3>
                            <div className="mb-4">
                                <label className="text-lg font-medium text-center block text-gray-700">How many servings does this cake yield?</label>
                                <input type="number" value={servings} onChange={e => setServings(e.target.value)} className="w-1/2 mx-auto mt-2 p-2 text-center text-lg border border-gray-300 rounded-md block"/>
                            </div>
                            <div className="space-y-2 text-lg">
                                <div className="flex justify-between"><span>Ingredient Cost:</span> <span>{formatCurrency(calculations.totalIngredientCost)}</span></div>
                                <div className="flex justify-between"><span>Labor Cost:</span> <span>{formatCurrency(calculations.totalLaborCost)}</span></div>
                                <div className="flex justify-between"><span>Direct Costs:</span> <span>{formatCurrency(calculations.totalDirectCosts)}</span></div>
                                <div className="flex justify-between border-b pb-2"><span>Overhead:</span> <span>{formatCurrency(calculations.totalOverheadCost)}</span></div>
                                <div className="flex justify-between font-bold pt-2"><span>Total Cost to Make:</span> <span>{formatCurrency(calculations.totalCostToMake)}</span></div>
                                <div className="flex justify-between"><span>Profit:</span> <span>{formatCurrency(calculations.profitAmount)}</span></div>
                            </div>
                            <div className="mt-6 text-center">
                                <p className="text-lg text-[#854d27] font-medium">Suggested Selling Price</p>
                                <p className="text-5xl font-bold text-[#3a2e25] my-1">{formatCurrency(calculations.suggestedSellingPrice)}</p>
                                <p className="text-xl font-semibold text-gray-600">{formatCurrency(calculations.pricePerServing)} / serving</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-6 italic text-center">*This calculator is a guide. Always consider your local market, skill level, and brand positioning when setting final prices.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BakerCalculator;
