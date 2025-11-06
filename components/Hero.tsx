import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center text-white">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559620192-032c4bc4674e?q=80&w=1920&auto=format&fit=crop')" }}></div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
      <div className="relative z-10 p-4">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
          Baking Dreams into Reality
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto font-light">
          Exquisite custom cakes and desserts crafted with love and artistry for your special moments.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://www.facebook.com/ShwetaCakeNCookies/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#d4af37] text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-[#854d27] transition-all duration-300 transform hover:scale-105 inline-block w-full sm:w-auto"
            >
              Request Consultation
            </a>
            <a 
              href="https://calendar.app.google/dDw8n4MjcnRVL9TU6"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-white hover:text-[#3a2e25] transition-all duration-300 transform hover:scale-105 inline-block w-full sm:w-auto"
            >
              Book an Appointment
            </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;