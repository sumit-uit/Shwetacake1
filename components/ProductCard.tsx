
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full group transform hover:-translate-y-2 transition-transform duration-300">
      <div className="relative h-64 w-full">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h4 className="text-2xl font-semibold text-[#3a2e25] mb-2">{product.name}</h4>
        <p className="text-lg font-bold text-[#d4af37] mb-3">{product.price}</p>
        {product.description && (
          <p className="text-gray-600 flex-grow mb-4">{product.description}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
