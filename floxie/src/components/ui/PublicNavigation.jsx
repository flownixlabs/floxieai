import React, { useState, useEffect } from 'react';
import AppImage from '../AppImage';
import Button from './Button';
import Icon from '../AppIcon';


const PublicNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
  ];

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    setIsMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in learning more about Floxie AI assistant.");
    const whatsappUrl = `https://wa.me/1234567890?text=${message}`;
    
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.open(whatsappUrl, '_blank');
    } else {
      window.open(`https://web.whatsapp.com/send?phone=1234567890&text=${message}`, '_blank');
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-surface/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <nav className="container-fluid">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="flex items-center space-x-3 group">
              <AppImage
                src="/assets/images/floxie_AI_assistant-1751908626629.png"
                alt="Floxie AI Assistant"
                className="w-10 h-10 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-200"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-heading font-semibold text-text-primary">
                  Floxie
                </h1>
                <p className="text-xs text-text-secondary font-medium">AI Assistant</p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors duration-150 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="primary"
              size="md"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={handleWhatsAppClick}
              className="hidden sm:flex hover-lift"
            >
              Try WhatsApp Bot
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-text-secondary hover:text-primary hover:bg-surface-hover transition-colors duration-150 focus-ring"
              aria-label="Toggle menu"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 visible' :'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="py-4 space-y-2 border-t border-border bg-surface/95 backdrop-blur-sm rounded-b-lg">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="block px-4 py-3 text-base font-medium text-text-secondary hover:text-primary hover:bg-surface-hover transition-colors duration-150 rounded-md"
              >
                {item.label}
              </a>
            ))}
            <div className="px-4 pt-4">
              <Button
                variant="primary"
                size="md"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={handleWhatsAppClick}
                fullWidth
              >
                Try WhatsApp Bot
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default PublicNavigation;