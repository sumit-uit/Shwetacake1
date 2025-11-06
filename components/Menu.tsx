
import React from 'react';
import { MENU_DATA } from '../constants';
import ProductCard from './ProductCard';
import { Category } from '../types';

const Menu: React.FC = () => {
  return (
    <section id="menu" className="py-20 lg:py-32 scroll-mt-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3a2e25] mb-4">Our Delicious Offerings</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From show-stopping cakes to delightful little treats, find the perfect dessert for any occasion.
          </p>
        </div>

        {MENU_DATA.map((category: Category) => (
          <div key={category.id} className="mb-16">
            <h3 className="text-3xl lg:text-4xl font-semibold text-[#854d27] mb-2 text-center">
              {category.name}
            </h3>
             {category.description && (
                <p className="text-center text-gray-500 max-w-2xl mx-auto mb-8">
                    {category.description}
                </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {category.products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;