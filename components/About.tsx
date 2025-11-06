import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-white scroll-mt-20">
      <div className="container mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&h=700&auto=format&fit=crop" 
            alt="Soni, the baker, decorating a custom cake" 
            className="rounded-lg shadow-2xl w-full h-auto object-cover"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3a2e25] mb-6">
            Crafted with Passion & Precision
          </h2>
          <p className="text-lg text-gray-600 mb-4 leading-relaxed">
            Hi, I'm Soni! My journey into baking started in my grandmother's kitchen, where the scent of fresh cakes and cookies was a constant hug. That childhood passion blossomed into Soni Bake Art, a place where I combine time-honoured recipes with modern, artistic design.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            From my home-based bakery here in Waterloo, I pour my heart into every single creation. I believe that a cake is more than just a dessert; it's a centerpiece for your most cherished memories. Using only the finest ingredients, I'm dedicated to making your special moments a little bit sweeter and a whole lot more beautiful.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;