import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu on click
    if (isOpen) {
        setIsOpen(false);
    }
  };

  const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} onClick={handleLinkClick} className="block lg:inline-block mt-4 lg:mt-0 text-[#854d27] hover:text-[#d4af37] transition-colors duration-300">
      {children}
    </a>
  );

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#fefbf6f2] shadow-md backdrop-blur-md' : 'bg-transparent'}`}>
      <nav className="flex items-center justify-between flex-wrap p-4 container mx-auto">
        <div className="flex items-center flex-shrink-0 text-[#3a2e25] mr-6">
          <a href="#home" onClick={handleLinkClick} className="font-bold text-2xl tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Soni Bake Art
          </a>
        </div>
        <div className="block lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 border rounded text-[#854d27] border-[#d4af37] hover:text-[#3a2e25] hover:border-[#854d27]">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <div className={`w-full ${isOpen ? 'block' : 'hidden'} flex-grow lg:flex lg:items-center lg:w-auto lg:space-x-8 text-lg font-medium`}>
          <div className="lg:flex-grow text-center lg:text-right">
            <NavLink href="#about">About</NavLink>
            <span className="hidden lg:inline lg:mx-4"></span>
            <NavLink href="#menu">Menu</NavLink>
            <span className="hidden lg:inline lg:mx-4"></span>
            <NavLink href="#estimator">Estimator</NavLink>
            <span className="hidden lg:inline lg:mx-4"></span>
            <NavLink href="#gallery">Gallery</NavLink>
            <span className="hidden lg:inline lg:mx-4"></span>
            <NavLink href="#analyzer">Inspiration</NavLink>
            <span className="hidden lg:inline lg:mx-4"></span>
            <NavLink href="#baker-calculator">For Bakers</NavLink>
            <span className="hidden lg:inline lg:mx-4"></span>
            <NavLink href="#contact">Contact</NavLink>
          </div>
          <div>
            <a href="#contact" onClick={handleLinkClick} className="inline-block text-sm px-6 py-3 leading-none border rounded-full text-white bg-[#d4af37] border-[#d4af37] hover:bg-[#854d27] hover:border-[#854d27] mt-4 lg:mt-0 transition-all duration-300 transform hover:scale-105 w-full text-center lg:w-auto">
              Order Now
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;