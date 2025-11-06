
import React, { useState, useMemo } from 'react';
import { GALLERY_IMAGES } from '../galleryConstants';

const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = useMemo(() => {
    const uniqueCategories = ['All', ...new Set(GALLERY_IMAGES.map(img => img.category))];
    return uniqueCategories;
  }, []);

  const filteredImages = useMemo(() => {
    if (activeFilter === 'All') {
      return GALLERY_IMAGES;
    }
    return GALLERY_IMAGES.filter(image => image.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-white scroll-mt-20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3a2e25] mb-4">Our Creations</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A glimpse into the delicious and beautiful custom work we've done.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-semibold text-sm md:text-base transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4af37] ${
                activeFilter === category
                  ? 'bg-[#854d27] text-white'
                  : 'bg-transparent text-[#854d27] border border-[#854d27] hover:bg-[#854d27] hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map(image => (
            <div key={image.id} className="group relative block w-full aspect-square overflow-hidden rounded-lg shadow-md">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">{image.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;