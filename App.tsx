import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import PriceEstimator from './components/PriceEstimator';
import Gallery from './components/Gallery';
import ImageAnalyzer from './components/ImageAnalyzer';
import BakerCalculator from './components/BakerCalculator';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  return (
    <div className="bg-[#FEFBF6] text-[#3a2e25]">
      <Header />
      <main>
        <Hero />
        <About />
        <Menu />
        <PriceEstimator />
        <Gallery />
        <ImageAnalyzer />
        <BakerCalculator />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;